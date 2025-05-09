import { memo } from 'react';

import SearchTracksTable from '../table';

import { useAppSelector } from '../../../../../store/store';

const SongsSearchSection = memo((props) => {
  const tracks = useAppSelector((state) => state.search.songs);
  if (!tracks || !tracks.length) {
    return null;
  }
  return <SearchTracksTable {...props} />;
});

export default SongsSearchSection;
