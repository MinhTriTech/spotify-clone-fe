import { memo, useCallback, useMemo } from 'react';
import { Dropdown, message } from 'antd';
import { AddToQueueIcon, AddedToLibrary, AddToLibrary, AddToPlaylist } from '../Icons';

// ❌ Đã xoá useTranslation từ react-i18next

const AlbumActionsWrapper = memo((props) => {
  const { children, album } = props;

  // ✅ MOCK DATA
  const user = 'mock-user-id';
  const myAlbums = [{ id: '1' }, { id: album.id }];
  const myPlaylists = [
    { id: '101', name: 'Chill Mix', snapshot_id: 'abc123' },
    { id: '102', name: 'Workout', snapshot_id: 'xyz789' },
  ];

  const inLibrary = useMemo(() => {
    return myAlbums.some((p) => p.id === album.id);
  }, [myAlbums, album.id]);

  const handleUserValidation = useCallback(
    (button) => {
      if (!user) {
        console.warn('Mock: Không có token – mở login UI nếu cần');
      }
      return true;
    },
    [user]
  );

  const options = useMemo(() => {
    const items = myPlaylists.map((p) => ({
      key: p.id,
      label: p.name,
      onClick: async () => {
        if (!handleUserValidation()) return;
        console.log(`Mock: add album ${album.id} to playlist ${p.id}`);
        message.success('Đã thêm vào playlist');
      },
    }));

    if (myPlaylists.length) items.unshift({ type: 'divider' });

    items.unshift({
      label: 'Playlist mới',
      key: 'new',
      onClick: async () => {
        if (!handleUserValidation()) return;
        console.log(`Mock: create playlist from album ${album.id}`);
        message.success('Đã thêm vào playlist');
      },
    });

    return items;
  }, [album.id, myPlaylists, handleUserValidation]);

  const items = useMemo(() => {
    const items = [];

    if (inLibrary) {
      items.push({
        label: 'Xoá khỏi Thư viện của bạn',
        key: 9,
        icon: <AddedToLibrary style={{ height: 16, width: 16, marginInlineEnd: 0 }} />,
        onClick: () => {
          if (!handleUserValidation(true)) return;
          console.log(`Mock: removed album ${album.id} from library`);
          message.success('Đã xoá khỏi Thư viện');
        },
      });
    } else {
      items.push({
        label: 'Thêm vào Thư viện của bạn',
        key: 8,
        icon: <AddToLibrary style={{ height: 16, width: 16, marginInlineEnd: 0 }} />,
        onClick: () => {
          if (!handleUserValidation(true)) return;
          console.log(`Mock: added album ${album.id} to library`);
          message.success('Đã lưu vào Thư viện');
        },
      });
    }

    items.push(
      {
        label: 'Thêm vào hàng chờ',
        key: '3',
        disabled: true,
        icon: <AddToQueueIcon />,
        onClick: () => {
          if (!handleUserValidation()) return;
          console.log(`Mock: added album ${album.uri} to queue`);
          message.success('Đã thêm vào hàng chờ');
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
  }, [album.id, album.uri, inLibrary, handleUserValidation, options]);

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});

export default AlbumActionsWrapper;
