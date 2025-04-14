import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';

import { GridItemList } from '../../../../components/Lists/list';
import { getItemDescription } from '../../../../utils/getDescription';

export const RecentlyPlayed = memo(() => {
  const { t } = useTranslation(['home']);
  const recentlyPlayed = useAppSelector((state) => state.home.recentlyPlayed);

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
