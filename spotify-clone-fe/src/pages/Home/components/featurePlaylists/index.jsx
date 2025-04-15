import React from 'react';
import { useTranslation } from 'react-i18next';

import { GridItemList } from '../../../../components/Lists/list';
import { getPlaylistDescription } from '../../../../utils/getDescription';

export const FeaturePlaylists = () => {
  const { t } = useTranslation(['home']);

  // ✅ MOCK dữ liệu
  const featurePlaylists = [
    {
      id: '1',
      type: 'playlist',
      name: 'Summer Chill',
      description: 'Feel the breeze with these relaxed tunes.',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
      uri: 'spotify:playlist:1'
    },
    {
      id: '2',
      type: 'playlist',
      name: 'Focus Flow',
      description: 'Stay productive with smooth instrumental beats.',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
      uri: 'spotify:playlist:2'
    }
  ];

  return (
    <div className="home">
      <GridItemList
        items={featurePlaylists}
        title={t('Featured playlists')}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
