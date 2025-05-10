import { memo } from 'react';

import { GridItemList } from '../../../../../components/Lists/list';

import { useAppSelector } from '../../../../../store/store';

export const AlbumsSearchSection = memo(() => {
  const albums = useAppSelector((state) => state.search.albums);

  if (!albums || !albums.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          items={albums}
          title="Albums"
        />
      </div>
    </div>
  );
});
