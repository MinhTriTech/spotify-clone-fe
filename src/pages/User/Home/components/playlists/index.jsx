import { memo } from 'react';
import { useAppSelector } from '../../../../../store/store';
import { GridItemList } from '../../../../../components/Lists/list';

export const MyPlaylistsSection = memo(() => {
  const user = useAppSelector((state) => state.profile.user);
  const playlists = useAppSelector((state) => state.profile.playlists);

  if (!playlists || !playlists.length) {
    return null;
  }

  return (
    <div style={{ marginTop: 10 }}>
      <GridItemList
        items={playlists}
        title="Playlist"
        moreUrl={playlists.length > 6 ? `/users/${user.id}/playlists` : undefined}
      />
    </div>
  );
});
