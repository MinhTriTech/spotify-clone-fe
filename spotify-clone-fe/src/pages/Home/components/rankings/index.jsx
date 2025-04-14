import React from 'react';
import { GridItemList } from '../../../../components/Lists/list';

import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';
import { RANKING_URI } from '../../../../constants/spotify';

export const Rankings = () => {
  const { t } = useTranslation(['home']);
  const rankings = useAppSelector((state) => state.home.rankings);

  if (!rankings || rankings.length === 0) return null;

  return (
    <div className="home">
      <GridItemList
        items={rankings}
        title={t('Featured Charts')}
        moreUrl={`/genre/${RANKING_URI}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
