import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridItemList } from '../../../../components/Lists/list';

export const YourPlaylists = memo(() => {
  const { t } = useTranslation(['home']);

  // ✅ Mock user ID
  const userId = 'mock-user-id';

  // ✅ Mock danh sách playlist
  const playlists = [
    {
      id: '1',
      uri: 'spotify:playlist:1',
      type: 'playlist',
      name: 'My Chill Vibes',
      description: 'Relaxing and calm',
      owner: { id: 'mock-user-id' },
      images: [{ url: 'https://via.placeholder.com/300' }]
    },
    {
      id: '2',
      uri: 'spotify:playlist:2',
      type: 'playlist',
      name: 'Workout Beats',
      description: 'Pump it up',
      owner: { id: 'mock-user-id' },
      images: [{ url: 'https://via.placeholder.com/300' }]
    }
  ];

  const items = useMemo(() => {
    return playlists.filter((p) => p.owner?.id === userId).slice(0, 12);
  }, [playlists, userId]);

  if (!items || items.length === 0) return null;

  return (
    <div className="home">
      <GridItemList items={items} title={t('Your playlists')} />
    </div>
  );
});
