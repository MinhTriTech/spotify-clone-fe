import React from 'react';
import { GridItemList } from '../../../../components/Lists/list';
import { getAlbumDescription } from '../../../../utils/getDescription';
import { useTranslation } from 'react-i18next';

export const NewReleases = () => {
  const { t } = useTranslation(['home']);

  // ✅ Mock data
  const newReleases = [
    {
      id: '1',
      type: 'album',
      name: 'Mock Album 1',
      release_date: '2023-12-01',
      album_type: 'album',
      images: [{ url: 'https://via.placeholder.com/300' }],
      artists: [{ name: 'Mock Artist 1' }]
    },
    {
      id: '2',
      type: 'album',
      name: 'Mock Album 2',
      release_date: '2024-01-10',
      album_type: 'single',
      images: [{ url: 'https://via.placeholder.com/300' }],
      artists: [{ name: 'Mock Artist 2' }]
    }
  ];

  if (!newReleases || newReleases.length === 0) return null;

  return (
    <div className="home">
      <GridItemList
        title={t('New releases')}
        items={newReleases}
        getDescription={getAlbumDescription}
      />
    </div>
  );
};
