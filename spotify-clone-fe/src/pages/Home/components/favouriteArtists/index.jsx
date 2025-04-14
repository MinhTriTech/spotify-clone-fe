import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';

import { GridItemList } from '../../../../components/Lists/list';

export const FavouriteArtists = memo(() => {
  const { t } = useTranslation(['home']);
  const artists = useAppSelector((state) => state.yourLibrary.myArtists);

  const items = useMemo(() => {
    return artists.slice(0, 12);
  }, [artists]);

  if (!artists || artists.length === 0) return null;

  return (
    <div className="home">
      <GridItemList items={items} title={t('Your favourite artists')} />
    </div>
  );
});
