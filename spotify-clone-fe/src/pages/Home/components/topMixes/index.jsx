import React, { useMemo } from 'react';
import { GridItemList } from '../../../../components/Lists/list';
import { getPlaylistDescription } from '../../../../utils/getDescription';
import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';
import { useTranslation } from 'react-i18next';

export const TopMixes = () => {
  const { t } = useTranslation(['home']);

  // ✅ Dữ liệu mock thay vì useAppSelector
  const madeForYou = [
    {
      id: 'mix1',
      name: 'Focus Mix',
      description: 'Stay in the zone with curated tracks.',
      type: 'playlist',
      uri: 'spotify:playlist:focusmix',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
    },
    {
      id: 'mix2',
      name: 'Workout Mix',
      description: 'High-intensity music for your gym session.',
      type: 'playlist',
      uri: 'spotify:playlist:workoutmix',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
    },
    {
      id: 'mix3',
      name: 'Chill Mix',
      description: 'Easy-going songs to relax.',
      type: 'playlist',
      uri: 'spotify:playlist:chillmix',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
    },
  ];

  const items = useMemo(() => {
    return madeForYou
      .filter((p) => p.name.toLowerCase().includes('mix'))
      .slice(0, 12);
  }, [madeForYou]);

  if (!items || items.length === 0) return null;

  return (
    <div className="home">
      <GridItemList
        items={items}
        title={t('Your top mixes')}
        moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
