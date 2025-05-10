import { memo, useCallback, useMemo } from 'react';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  DeleteIcon,
  AddToPlaylist,
} from '../Icons';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { playlistActions } from '../../store/slices/playlist';
import { yourLibraryActions, fetchMyPlaylists, getUserPlaylists } from '../../store/slices/yourLibrary';
import { uiActions } from '../../store/slices/ui';

import { playlistService } from '../../services/playlists';

const TrackActionsWrapper = memo((props) => {
  const { children, track, canEdit, trigger } = props;

  const playlistCurrent = useAppSelector((state) => state.playlist.playlist);
  
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const myPlaylists = useAppSelector(getUserPlaylists);
  
  const userId = useAppSelector((state) => state.auth.user?.user_info.id);
  
  const handleUserValidation = useCallback((button = false) => {
    if (!userId) {
      dispatch(button ? uiActions.openLoginButton() : uiActions.openLoginTooltip());
      return false;
    }
    return true;
  }, [dispatch, userId]);

  const playlistOptions = useMemo(() => {
    return myPlaylists
      .filter((p) => p.playlist_id !== playlistCurrent?.playlist_id)
      .map((p) => ({
        key: p.playlist_id,
        label: p.title,
        onClick: async () => {
          if (!handleUserValidation()) return;
            await playlistService.addPlaylistItems(p.playlist_id, track.song_id).then(() => {
            dispatch(playlistActions.fetchPlaylist(p.playlist_id));
            navigate(`/playlist/${p.playlist_id}`);
          });
        },
      }));
  }, [ myPlaylists, playlistCurrent, handleUserValidation, track.song_id, dispatch]);  

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
    
    if (canEdit) {
      items.push({
        label: 'Xóa khỏi playlist này',
        key: 'remove-from-playlist',
        icon: <DeleteIcon />,
        onClick: () => {
          if (!handleUserValidation()) return;
          playlistService.removePlaylistItems(playlistCurrent.playlist_id, track.song_id).then(() => {
            dispatch(playlistActions.refreshPlaylist(playlistCurrent.playlist_id));
            dispatch(playlistActions.removeTrack({ id: track.song_id }));
            dispatch(yourLibraryActions.fetchMyPlaylists());
          });
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
