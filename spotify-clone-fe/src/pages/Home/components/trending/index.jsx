import React, { memo } from 'react';
import { GridItemList } from '../../../../components/Lists/list';

import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';
import { TRENDING_URI } from '../../../../constants/spotify';

export const Trending = memo(() => {
  const { t } = useTranslation(['home']);
  const user = useAppSelector((state) => !!state.auth.user);
  const trending = useAppSelector((state) => state.home.trending);

  if (user || !trending || trending.length === 0) return null;

  return (
    <div className="home">
      <GridItemList
        items={trending}
        title={t('Trending')}
        moreUrl={`/genre/${TRENDING_URI}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
});
