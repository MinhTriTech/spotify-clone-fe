import { useAppSelector } from '../../../../store/store';
import { memo, useMemo } from 'react';

import { GridItemList } from '../../../../components/Lists/list';

export const YourPlaylists = memo(() => {
  const user = useAppSelector((state) => state.auth.user?.id);
  const playlists = useAppSelector((state) => state.yourLibrary.myPlaylists);

  const items = useMemo(() => {
    return playlists.filter((p) => p.owner?.id === user).slice(0, 12);
  }, [playlists, user]);

  if (!items || !items.length) return null;

  return (
    <div className='home'>
      <GridItemList items={items} title="Playlist của bạn" />
    </div>
  );
});
