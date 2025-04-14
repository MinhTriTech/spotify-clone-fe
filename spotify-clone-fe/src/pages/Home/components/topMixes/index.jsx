import React, { useMemo } from 'react';
import { GridItemList } from '../../../../components/Lists/list';

import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';
import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';

export const TopMixes = () => {
  const { t } = useTranslation(['home']);
  const madeForYou = useAppSelector((state) => state.home.madeForYou);

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
