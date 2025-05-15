import { memo } from 'react';

import { GridItemList } from '../../../../../components/Lists/list';

import { useAppSelector } from '../../../../../store/store';

const PlaylistsSearchSection = memo(() => {
  const playlists = useAppSelector((state) => state.search.playlists);

  if (!playlists || !playlists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          multipleRows
          items={playlists}
        />
      </div>
    </div>
  );
});

export default PlaylistsSearchSection;
