import { memo, useMemo } from 'react';
import {
  AlbumIcon,
  ArtistIcon,
  DeleteIcon,
  AddToPlaylist,
  AddToQueueIcon,
  AddToLibrary,
  AddedToLibrary,
} from '../Icons';
import { Dropdown, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const TrackActionsWrapper = memo((props) => {
  const { children, artist, track, canEdit, album, saved, onSavedToggle } = props;

  const { t } = useTranslation(['playlist']);
  const navigate = useNavigate();

  // ✅ Mock dữ liệu thay Redux
  const userId = 'mock-user';
  const currentSong = 'mock-current-song';
  const myPlaylists = [
    { id: 'p1', name: 'Mock Playlist 1' },
    { id: 'p2', name: 'Mock Playlist 2' },
  ];

  const handleUserValidation = (button) => {
    if (!userId) {
      console.log('Mock: Open login tooltip or modal');
      return false;
    }
    return true;
  };

  const options = useMemo(() => {
    return myPlaylists.map((p) => ({
      key: p.id,
      label: p.name,
      onClick: () => {
        console.log(`Mock: Add ${track?.uri} to playlist ${p.name}`);
        message.success(t('Added to playlist'));
      },
    }));
  }, [track?.uri, t]);

  const getItems = () => {
    const items = [
      {
        label: t('Add to playlist'),
        icon: <AddToPlaylist />,
        key: '1',
        children: [
          {
            label: t('New playlist'),
            key: 'new',
            onClick: () => {
              console.log(`Mock: Create new playlist for ${track?.name}`);
              message.success(t('Added to playlist'));
            },
          },
          { type: 'divider' },
          ...options,
        ],
      },
    ];

    if (saved !== undefined) {
      items.push({
        label: saved ? t('Remove from Liked Songs') : t('Save to Liked Songs'),
        key: '4',
        icon: saved ? (
          <AddedToLibrary style={{ height: 18, width: 18, marginInlineEnd: 0 }} />
        ) : (
          <AddToLibrary style={{ height: 18, width: 18, marginInlineEnd: 0 }} />
        ),
        onClick: () => {
          console.log(`Mock: Toggle like for ${track?.name}`);
          if (onSavedToggle) onSavedToggle();
          message.success(
            saved ? t('Removed from Liked Songs') : t('Saved to Liked Songs')
          );
        },
      });
    }

    if (canEdit) {
      items.push({
        label: t('Remove from this playlist'),
        key: '2',
        icon: <DeleteIcon />,
        onClick: () => {
          console.log(`Mock: Remove ${track?.uri} from current playlist`);
          message.success(t('Removed from playlist'));
        },
      });
    }

    items.push(
      {
        label: t('Add to queue'),
        key: '3',
        icon: <AddToQueueIcon />,
        onClick: () => {
          console.log(`Mock: Add ${track?.uri} to queue`);
          message.success(t('Added to queue'));
        },
      },
      { type: 'divider' }
    );

    if (!artist) {
      items.push({
        label: t('Go to artist'),
        key: '5',
        icon: <ArtistIcon />,
        onClick: () => {
          navigate(`/artist/${track?.artists?.[0]?.id || 'mock-artist'}`);
        },
      });
    }

    if (!album) {
      items.push({
        label: t('Go to album'),
        key: '6',
        icon: <AlbumIcon />,
        onClick: () => {
          navigate(`/album/${track?.album?.id || 'mock-album'}`);
        },
      });
    }

    return items;
  };

  const items = getItems();

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});

export default TrackActionsWrapper;
