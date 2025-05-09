import { memo } from 'react';

import { GridItemList } from '../../../../../components/Lists/list';

import { useAppDispatch, useAppSelector } from '../../../../../store/store';

const ArtistsSearchSection = memo(() => {
  const artists = useAppSelector((state) => state.search.artists);

  if (!artists || !artists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          multipleRows
          items={artists}
        />
      </div>
    </div>
  );
});

export default ArtistsSearchSection;
