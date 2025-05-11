import { useAppSelector } from '../../../../store/store';

import { memo, useMemo } from 'react';

import { GridItemList } from '../../../../components/Lists/list';

export const FavouriteArtists = memo(() => {
  const artists = useAppSelector((state) => state.home.artists);

  const items = useMemo(() => {
    return artists.slice(0, 12);
  }, [artists]);

  if (!artists || !artists.length) return null;

  return (
    <div className="home">
      <GridItemList items={items} title="Nghệ sĩ bạn yêu thích" />
    </div>
  );
});
