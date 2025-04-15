import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GridItemList } from '../../../../components/Lists/list';

export const FavouriteArtists = memo(() => {
  const { t } = useTranslation(['home']);

  // ✅ Dữ liệu mock
  const artists = [
    {
      id: 'artist1',
      type: 'artist',
      name: 'Mock Artist 1',
      uri: 'spotify:artist:1',
      images: [{ url: 'https://via.placeholder.com/300' }]
    },
    {
      id: 'artist2',
      type: 'artist',
      name: 'Mock Artist 2',
      uri: 'spotify:artist:2',
      images: [{ url: 'https://via.placeholder.com/300' }]
    },
    {
      id: 'artist3',
      type: 'artist',
      name: 'Mock Artist 3',
      uri: 'spotify:artist:3',
      images: [{ url: 'https://via.placeholder.com/300' }]
    }
  ];

  const items = useMemo(() => {
    return artists.slice(0, 12);
  }, [artists]);

  if (!items || items.length === 0) return null;

  return (
    <div className="home">
      <GridItemList items={items} title={t('Your favourite artists')} />
    </div>
  );
});
