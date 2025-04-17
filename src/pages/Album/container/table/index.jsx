// Components
import SongView from './Song';
import { AlbumTableHeader } from './header';
import { AlbumIcon } from '../../../../components/Icons';
import { AlbumControls } from '../../components/controls';
import { OtherAlbums } from '../../components/otherAlbums';

import { memo, useMemo } from 'react';

// Utils
import { groupBy } from 'lodash';

// Redux
import { useAppSelector } from '../../../../store/store';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../../../constants/spotify';

export const AlbumList = memo(({ color }) => {
  const tracks = useAppSelector((state) => state.album.tracks);

  const disks = useMemo(() => {
    return Object.values(groupBy(tracks, 'disc_number'));
  }, [tracks]);

  return (
    <div
      className='playlist-list'
      style={{
        maxHeight: 323,
        background: `linear-gradient(${color} -50%, ${DEFAULT_PAGE_COLOR} 90%)`,
      }}
    >
      <AlbumControls />

      <div className='playlist-table'>
        <AlbumTableHeader />
      </div>

      <div style={{ paddingBottom: 30 }}>
        {disks.map((disk, diskIndex) => (
          <div key={`disk-${diskIndex}`}>
            {disks.length > 1 ? (
              <div className='disk-section'>
                <AlbumIcon /> Đĩa {diskIndex + 1}
              </div>
            ) : null}
            {disk.map((song, index) => (
              <SongView song={song} key={song.id} index={index} />
            ))}
          </div>
        ))}
      </div>

      <div style={{ paddingBottom: 30 }}>
        <OtherAlbums />
      </div>
    </div>
  );
});
