import { memo } from 'react';

import { GridItemList } from '../../../../components/Lists/list';

import { useAppSelector } from '../../../../store/store';

export const OtherArtists = memo(() => {
  const artists = useAppSelector((state) => state.artist.otherArtists);

  return (
    <div>
      <GridItemList items={artists} title="Người nghe cũng quan tâm" />
    </div>
  );
});
