import { memo } from 'react';

import { GridItemList } from '../../../../../components/Lists/list';

import { useAppSelector } from '../../../../../store/store';

export const PlaylistsSearchSection = memo(() => {
  const playlists = useAppSelector((state) => state.search.playlists);

  if (!playlists || !playlists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          items={playlists}
          title="Danh sách phát"
        />
      </div>
    </div>
  );
});
