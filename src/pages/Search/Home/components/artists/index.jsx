import { memo } from 'react';

import { GridItemList } from '../../../../../components/Lists/list';

import { useAppSelector } from '../../../../../store/store';

export const ArtistsSearchSection = memo(() => {
  const artists = useAppSelector((state) => state.search.artists);

  if (!artists || !artists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          items={artists}
          title="Nghệ sĩ"
        />
      </div>
    </div>
  );
});
