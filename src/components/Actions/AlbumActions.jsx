import React, { memo, useCallback, useMemo } from 'react';
import { Dropdown, message } from 'antd';
import { AddToQueueIcon, AddedToLibrary, AddToLibrary, AddToPlaylist } from '../Icons';

import { playerService } from '../../services/player';
import { albumsService } from '../../services/albums';
import { playlistService } from '../../services/playlists';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { fetchMyPlaylists, yourLibraryActions } from '../../store/slices/yourLibrary';
import { uiActions } from '../../store/slices/ui';

const AlbumActionsWrapper = memo((props) => {
  const { children, album } = props;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user?.id);
  const myAlbums = useAppSelector((state) => state.yourLibrary.myAlbums);
  const myPlaylists = useAppSelector((state) => state.yourLibrary.myPlaylists);

  const inLibrary = useMemo(() => {
    return myAlbums.some((p) => p.id === album.id);
  }, [myAlbums, album.id]);

  const handleUserValidation = useCallback(
    (button) => {
      if (!user) {
        dispatch(button ? uiActions.openLoginButton() : uiActions.openLoginTooltip());
        return false;
      }
      return true;
    },
    [dispatch, user]
  );

  const options = useMemo(() => {
    const items = myPlaylists.map((p) => {
      return {
        key: p.id,
        label: p.name,
        onClick: async () => {
          if (!handleUserValidation()) return;
          const {
            data: { items: tracks },
          } = await albumsService.fetchAlbumTracks(album.id);
          const uris = tracks.map((t) => t.uri);
          playlistService.addPlaylistItems(p.id, uris, p.snapshot_id).then(() => {
            message.open({
              type: 'success',
              content: 'Đã thêm vào playlist',
            });
          });
        },
      };
    });

    if (myPlaylists.length) {
      items.unshift({ type: 'divider' });
    }

    items.unshift({
      label: 'Playlist mới',
      key: 'new',
      onClick: async () => {
        if (!handleUserValidation()) return;
        const {
          data: { items: tracks },
        } = await albumsService.fetchAlbumTracks(album.id);
        const uris = tracks.map((t) => t.uri);
        return playlistService.createPlaylist(user, { name: album.name }).then((response) => {
          const playlist = response.data;
          playlistService.addPlaylistItems(playlist.id, uris, playlist.snapshot_id).then(() => {
            dispatch(fetchMyPlaylists());
            message.success('Đã thêm vào playlist');
          });
        });
      },
    });

    return items;
  }, [myPlaylists, handleUserValidation, album.id, album.name, user, dispatch]);

  const items = useMemo(() => {
    const items = [];

    if (inLibrary) {
      items.push({
        label: 'Xóa khỏi thư viện của bạn',
        key: 9,
        icon: <AddedToLibrary style={{ height: 16, width: 16, marginInlineEnd: 0 }} />,
        onClick: () => {
          if (!handleUserValidation(true)) return;
          albumsService.deleteAlbums([album.id]).then(() => {
            dispatch(yourLibraryActions.fetchMyAlbums());
            message.open({
              type: 'success',
              content: 'Đã xóa khỏi thư viện',
            });
          });
        },
      });
    } else {
      items.push({
        label: 'Thêm vào thư viện của bạn',
        key: 8,
        icon: <AddToLibrary style={{ height: 16, width: 16, marginInlineEnd: 0 }} />,
        onClick: () => {
          if (!handleUserValidation(true)) return;
          albumsService.saveAlbums([album.id]).then(() => {
            dispatch(yourLibraryActions.fetchMyAlbums());
            message.open({
              type: 'success',
              content: 'Đã lưu vào thư viện',
            });
          });
        },
      });
    }

    items.push(
      {
        label: 'Thêm vào hàng đợi',
        key: '3',
        disabled: true,
        icon: <AddToQueueIcon />,
        onClick: () => {
          if (!handleUserValidation()) return;
          playerService.addToQueue(album.uri).then(() => {
            message.open({
              type: 'success',
              content: 'Đã thêm vào hàng đợi',
            });
          });
        },
      },
      { type: 'divider' },
      {
        label: 'Thêm vào playlist',
        icon: <AddToPlaylist />,
        key: '1',
        children: options,
      }
    );

    return items;
  }, [album.id, album.uri, dispatch, handleUserValidation, inLibrary, options]);

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});

export default AlbumActionsWrapper;
