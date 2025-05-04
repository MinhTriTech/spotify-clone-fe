import { memo } from 'react';

import { GridItemList } from '../../../../components/Lists/list';

import { useAppSelector } from '../../../../store/store';

export const AppearsOn = memo(() => {
  const tracks = useAppSelector((state) => state.artist.appearsOn);

  return (
    <div>
      <GridItemList items={tracks} title="Xuất hiện trong" />
    </div>
  );
});
