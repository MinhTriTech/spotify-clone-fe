import React, { useMemo } from 'react';
import { GridItemList } from '../../../../components/Lists/list';
import { getPlaylistDescription } from '../../../../utils/getDescription';
import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';
import { useTranslation } from 'react-i18next';

export const MadeForYou = () => {
  const { t } = useTranslation(['home']);

  // ✅ Mock dữ liệu thay vì useAppSelector
  const user = { display_name: 'Mock User' };
  const madeForYou = [
    {
      id: 'mf1',
      name: 'Chill Vibes',
      type: 'playlist',
      description: 'Relaxing tracks for your mood.',
      uri: 'spotify:playlist:mf1',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
    },
    {
      id: 'mf2',
      name: 'Study Mix',
      type: 'playlist',
      description: 'Focus-enhancing music.',
      uri: 'spotify:playlist:mf2',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
    },
    {
      id: 'mf3',
      name: 'Daily Boost',
      type: 'playlist',
      description: 'Your daily dose of energy.',
      uri: 'spotify:playlist:mf3',
      images: [{ url: 'https://via.placeholder.com/300' }],
      owner: { display_name: 'Spotify' },
    },
  ];

  const items = useMemo(() => {
    const items = madeForYou.filter((p) => !p.name.toLowerCase().includes('mix'));
    const otherItems = madeForYou.filter((p) => p.name.toLowerCase().includes('mix')).reverse();
    return [...items, ...otherItems].slice(0, 12);
  }, [madeForYou]);

  if (!items || !items.length) return null;

  return (
    <div className="home">
      <GridItemList
        items={items}
        moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
        getDescription={getPlaylistDescription}
        title={`${t('Made for')} ${user?.display_name || t('you')}`}
      />
    </div>
  );
};
