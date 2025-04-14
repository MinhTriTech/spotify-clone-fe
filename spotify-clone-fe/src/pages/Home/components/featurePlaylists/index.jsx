import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../../store/store';

import { GridItemList } from '../../../../components/Lists/list';
import { getPlaylistDescription } from '../../../../utils/getDescription';

export const FeaturePlaylists = () => {
  const { t } = useTranslation(['home']);
  const featurePlaylists = useAppSelector((state) => state.home.featurePlaylists);

  if (!featurePlaylists || featurePlaylists.length === 0) return null;

  return (
    <div className="home">
      <GridItemList
        items={featurePlaylists}
        title={t('Featured playlists')}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
