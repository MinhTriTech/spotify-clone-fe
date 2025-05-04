import { memo, useCallback, useMemo } from 'react';
import { Dropdown, message } from 'antd';
import { useNavigate } from 'react-router-dom';

import {
  AlbumIcon,
  ArtistIcon,
  DeleteIcon,
  AddToPlaylist,
  AddToQueueIcon,
  AddToLibrary,
  AddedToLibrary,
} from '../Icons';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { playlistActions } from '../../store/slices/playlist';
import fetchLikeSongs from '../../store/slices/likedSongs';
import { yourLibraryActions, fetchMyPlaylists, getUserPlaylists } from '../../store/slices/yourLibrary';
import { spotifyActions } from '../../store/slices/spotify';
import { albumActions } from '../../store/slices/album';
import { artistActions } from '../../store/slices/artist';
import { uiActions } from '../../store/slices/ui';
import { fetchQueue } from '../../store/slices/queue';

import { playerService } from '../../services/player';
import { playlistService } from '../../services/playlists';
import { userService } from '../../services/users';

const TrackActionsWrapper = memo((props) => {
  const { children, artist, track, playlist, canEdit, album, saved, onSavedToggle, trigger } = props;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const myPlaylists = useAppSelector(getUserPlaylists);
  const userId = useAppSelector((state) => state.auth.user?.id);
  const currentSongId = useAppSelector((state) => state.spotify.state?.track_window?.current_track?.id);

  const handleUserValidation = useCallback((button = false) => {
    if (!userId) {
      dispatch(button ? uiActions.openLoginButton() : uiActions.openLoginTooltip());
      return false;
    }
    return true;
  }, [dispatch, userId]);

  const playlistOptions = useMemo(() => {
    return myPlaylists
      .filter((p) => p.id !== playlist?.id)
      .map((p) => ({
        key: p.id,
        label: p.name,
        onClick: () => {
          if (!handleUserValidation()) return;
          playlistService.addPlaylistItems(p.id, [track.uri], p.snapshot_id).then(() => {
            dispatch(playlistActions.refreshTracks(p.id));
            message.success('Đã thêm vào playlist!');
          });
        },
      }));
  }, [myPlaylists, playlist, handleUserValidation, track.uri, dispatch]);

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
              playlistService.createPlaylist(userId, { name: track.name }).then((res) => {
                const newPlaylist = res.data;
                playlistService.addPlaylistItems(newPlaylist.id, [track.uri], newPlaylist.snapshot_id).then(() => {
                  dispatch(fetchMyPlaylists());
                  message.success('Đã thêm vào playlist!');
                });
              });
            },
          },
          { type: 'divider' },
          ...playlistOptions,
        ],
      },
    ];

    if (typeof saved !== 'undefined') {
      items.push({
        label: saved ? 'Xóa khỏi Bài hát đã thích' : 'Lưu vào Bài hát đã thích',
        key: 'like-song',
        icon: saved ? (
          <AddedToLibrary style={{ height: 18, width: 18, marginInlineEnd: 0 }} />
        ) : (
          <AddToLibrary style={{ height: 18, width: 18, marginInlineEnd: 0 }} />
        ),
        onClick: () => {
          if (!handleUserValidation(true)) return;
          if (saved) {
            userService.deleteTracks([track.id]).then(() => {
              dispatch(albumActions.updateTrackLikeState({ id: track.id, saved: false }));
              dispatch(artistActions.setTopSongLikeState({ id: track.id, saved: false }));
              dispatch(playlistActions.setTrackLikeState({ id: track.id, saved: false }));
              if (currentSongId === track.id) {
                dispatch(spotifyActions.setLiked({ liked: false }));
              }
              if (onSavedToggle) onSavedToggle();
              message.success('Đã xóa khỏi Bài hát đã thích');
            });
          } else {
            userService.saveTracks([track.id]).then(() => {
              dispatch(fetchLikeSongs());
              dispatch(albumActions.updateTrackLikeState({ id: track.id, saved: true }));
              dispatch(artistActions.setTopSongLikeState({ id: track.id, saved: true }));
              dispatch(playlistActions.setTrackLikeState({ id: track.id, saved: true }));
              if (currentSongId === track.id) {
                dispatch(spotifyActions.setLiked({ liked: true }));
              }
              if (onSavedToggle) onSavedToggle();
              message.success('Đã lưu vào Bài hát đã thích');
            });
          }
        },
      });
    }

    if (canEdit && playlist) {
      items.push({
        label: 'Xóa khỏi playlist này',
        key: 'remove-from-playlist',
        icon: <DeleteIcon />,
        onClick: () => {
          if (!handleUserValidation()) return;
          playlistService.removePlaylistItems(playlist.id, [track.uri], playlist.snapshot_id).then(() => {
            dispatch(playlistActions.refreshPlaylist(playlist.id));
            dispatch(playlistActions.removeTrack({ id: track.uri }));
            dispatch(yourLibraryActions.fetchMyPlaylists());
            message.success('Đã xóa khỏi playlist');
          });
        },
      });
    }

    items.push(
      {
        label: 'Thêm vào hàng chờ',
        key: 'add-to-queue',
        icon: <AddToQueueIcon />,
        onClick: () => {
          if (!handleUserValidation(true)) return;
          playerService.addToQueue(track.uri).then(() => {
            dispatch(fetchQueue());
            message.success('Đã thêm vào hàng chờ');
          });
        },
      },
      { type: 'divider' }
    );

    if (!artist && track.artists?.length > 0) {
      items.push({
        label: 'Đi tới nghệ sĩ',
        key: 'go-to-artist',
        icon: <ArtistIcon />,
        onClick: () => {
          const artistId = track.artists[0]?.id || (track.artists[0]?.uri?.split(':').reverse()[0]);
          if (artistId) navigate(`/artist/${artistId}`);
        },
      });
    }

    if (!album && track.album) {
      items.push({
        label: 'Đi tới album',
        key: 'go-to-album',
        icon: <AlbumIcon />,
        onClick: () => {
          if (!userId) {
            return dispatch(uiActions.openLoginModal(track.album?.images?.[0]?.url));
          }
          const albumId = track.album?.id || (track.album?.uri?.split(':').reverse()[0]);
          if (albumId) navigate(`/album/${albumId}`);
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
