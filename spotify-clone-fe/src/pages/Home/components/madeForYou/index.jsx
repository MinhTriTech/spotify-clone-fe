import React, { useMemo } from 'react';
import { GridItemList } from '../../../../components/Lists/list';

import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';
import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';

export const MadeForYou = () => {
  const { t } = useTranslation(['home']);

  const user = useAppSelector((state) => state.auth.user);
  const madeForYou = useAppSelector((state) => state.home.madeForYou);

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
