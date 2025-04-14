import React, { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';
import { GridItemList } from '../../../../components/Lists/list';

export const YourPlaylists = memo(() => {
  const { t } = useTranslation(['home']);
  const user = useAppSelector((state) => state.auth.user?.id);
  const playlists = useAppSelector((state) => state.yourLibrary.myPlaylists);

  const items = useMemo(() => {
    return playlists.filter((p) => p.owner?.id === user).slice(0, 12);
  }, [playlists, user]);

  if (!items || items.length === 0) return null;

  return (
    <div className="home">
      <GridItemList items={items} title={t('Your playlists')} />
    </div>
  );
});
