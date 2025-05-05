import { memo, useMemo } from 'react';

// Components
import { GridItemList } from '../../../../components/Lists/list';

// Redux
import { useAppSelector } from '../../../../store/store';

export const OtherAlbums = memo(() => {
  const artist = useAppSelector((state) => state.album.artist);
  const current = useAppSelector((state) => state.album.album);
  const otherAlbums = useAppSelector((state) => state.album.otherAlbums);

  const items = useMemo(() => {
    if (current) {
      return otherAlbums.filter((album) => album.id !== current.id);
    }
    return otherAlbums;
  }, [current, otherAlbums]);

  return (
    <GridItemList
      title={`More by ${artist?.name || ''}`}
      items={items}
    />
  );
});
