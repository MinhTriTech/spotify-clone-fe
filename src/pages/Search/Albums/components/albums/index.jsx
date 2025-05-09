import { memo } from 'react';

import { GridItemList } from '../../../../../components/Lists/list';

import { useAppSelector } from '../../../../../store/store';

const AlbumsSearchSection = memo(() => {
  const albums = useAppSelector((state) => state.search.albums);

  if (!albums || !albums.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          multipleRows
          items={albums}
        />
      </div>
    </div>
  );
});

export default AlbumsSearchSection;
