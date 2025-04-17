import React from 'react';
import { GridItemList } from '../../../../components/Lists/list';

import { useAppSelector } from '../../../../store/store';
import { getPlaylistDescription } from '../../../../utils/getDescription';
import { RANKING_URI } from '../../../../constants/spotify';

export const Rankings = () => {
  const rankings = useAppSelector((state) => state.home.rankings);

  if (!rankings || rankings.length === 0) return null;

  return (
    <div className="home">
      <GridItemList
        items={rankings}
        title="Bảng xếp hạng nổi bật"
        moreUrl={`/genre/${RANKING_URI}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
