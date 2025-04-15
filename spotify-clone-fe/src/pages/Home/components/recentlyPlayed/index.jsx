import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { GridItemList } from '../../../../components/Lists/list';
import { getItemDescription } from '../../../../utils/getDescription';

export const RecentlyPlayed = memo(() => {
  const { t } = useTranslation(['home']);

  // ✅ Dữ liệu mock
  const recentlyPlayed = [
    {
      id: 'rp1',
      type: 'playlist',
      name: 'Morning Chill',
      description: 'Calm music to start your day.',
      uri: 'spotify:playlist:rp1',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
    },
    {
      id: 'rp2',
      type: 'album',
      name: 'Lo-fi Beats',
      description: 'Relax and study with these tracks.',
      uri: 'spotify:album:rp2',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
    },
    {
      id: 'rp3',
      type: 'playlist',
      name: 'Afternoon Vibes',
      description: 'Groove through your midday.',
      uri: 'spotify:playlist:rp3',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
    },
  ];

  if (!recentlyPlayed || recentlyPlayed.length === 0) return null;

  return (
    <div className="home">
      <GridItemList
        title={t('Recently played')}
        items={recentlyPlayed.slice(0, 10)}
        getDescription={getItemDescription}
      />
    </div>
  );
});
