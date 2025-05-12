import { memo, useCallback, useState, useEffect } from 'react';
import { Dropdown } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  DeleteIcon,
  AddToPlaylist,
} from '../Icons';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { playlistActions } from '../../store/slices/playlist';
import { yourLibraryActions, getUserPlaylists } from '../../store/slices/yourLibrary';
import { uiActions } from '../../store/slices/ui';

import { playlistService } from '../../services/playlists';
import { userService } from '../../services/users';
import { likedSongsActions } from '../../store/slices/likedSongs';

const TrackActionsWrapper = memo((props) => {
  const { children, track, canEdit, trigger } = props;
  const location = useLocation();

  const playlistCurrent = useAppSelector((state) => state.playlist?.playlist);
  const likedSongs = location.pathname === '/collection/tracks';
  
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const myPlaylists = useAppSelector(getUserPlaylists);
  
  const userId = useAppSelector((state) => state.auth.user?.user_info.id);
  const [playlistOptions, setPlaylistOptions] = useState([]);
  const [isTrackInLikeSongs, setIsTrackInLikeSongs] = useState(false);
  
  const handleUserValidation = useCallback((button = false) => {
    if (!userId) {
      dispatch(button ? uiActions.openLoginButton() : uiActions.openLoginTooltip());
      return false;
    }
    return true;
  }, [dispatch, userId]);

  useEffect(() => {
    const loadFilteredPlaylists = async () => {
      if (!track?.song_id || !myPlaylists) return;

      const likeSongsResponse = await userService.getSavedTracks();
      const isTrackInLikeSongs = likeSongsResponse.data.some(song => song.song_id === track.song_id);

      setIsTrackInLikeSongs(isTrackInLikeSongs);

      const filtered = await Promise.all(
        myPlaylists
          .filter(p => p.playlist_id !== playlistCurrent?.playlist_id)
          .map(async (p) => {
            const response = await playlistService.getPlaylist(p.playlist_id);
            const containsTrack = response.data.songs.some(song => song.song_id === track.song_id);
            
            return !containsTrack ? p : null;
          })
      );

      const validPlaylists = filtered.filter(Boolean);

      const options = validPlaylists.map((p) => ({
        key: p.playlist_id,
        label: p.title,
        onClick: async () => {
          if (!handleUserValidation()) return;
          await playlistService.addPlaylistItems(p.playlist_id, track.song_id);
          dispatch(playlistActions.fetchPlaylist(p.playlist_id));
          navigate(`/playlist/${p.playlist_id}`);
        },
      }));

      let finalOptions = options;

      if (!isTrackInLikeSongs) {
        const customOption = {
          key: "likedSongs",
          label: "Danh sách yêu thích",
          onClick: async () => {
            if (!handleUserValidation()) return;
            await userService.saveTracks(track.song_id);
            dispatch(likedSongsActions.fetchLikeSongs());
            navigate(`/collection/tracks`);
          },
        };
        finalOptions = [customOption, ...options]; 
      }
      setPlaylistOptions(finalOptions);
    };

    loadFilteredPlaylists();
  }, [myPlaylists, playlistCurrent, track.song_id, handleUserValidation, dispatch, navigate]);

  const getItems = () => {
    const items = [
      {
        label: 'Thêm vào playlist',
        icon: <AddToPlaylist />,
        key: 'add-to-playlist',
        children: [
          {
            label: 'Tạo playlist mới',
            key: 'new',
            onClick: () => {
              if (!handleUserValidation()) return;
              playlistService.createPlaylist("Danh sách phát của tôi").then((res) => {
                const newPlaylist = res;
                playlistService.addPlaylistItems(newPlaylist.playlist_id, track.song_id).then(() => {
                  dispatch(yourLibraryActions.fetchMyPlaylists());
                });
              });
            },
          },
          { type: 'divider' },
          ...playlistOptions,
        ],
      },
    ];
    
    if (canEdit || isTrackInLikeSongs) {
      items.push({
        label: 'Xóa khỏi playlist này',
        key: 'remove-from-playlist',
        icon: <DeleteIcon />,
        onClick: () => {
          if (!handleUserValidation()) return;

          if (likedSongs) {
            userService.deleteTracks(track.song_id).then(() => {
              dispatch(likedSongsActions.fetchLikeSongs());
            });
          } else {
            playlistService.removePlaylistItems(playlistCurrent.playlist_id, track.song_id).then(() => {
              dispatch(playlistActions.refreshPlaylist(playlistCurrent.playlist_id));
              dispatch(playlistActions.removeTrack({ id: track.song_id }));
              dispatch(yourLibraryActions.fetchMyPlaylists());
            });
          }
        },
      });
    }

    return items;
  };

  const items = getItems();

  return (
    <Dropdown menu={{ items }} trigger={trigger}>
      {children}
    </Dropdown>
  );
});

export default TrackActionsWrapper;
