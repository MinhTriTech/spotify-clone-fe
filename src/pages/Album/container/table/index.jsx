import SongView from './Song';
import { AlbumTableHeader } from './header';
import { AlbumIcon } from '../../../../components/Icons';
import { AlbumControls } from '../../components/controls';

import { groupBy } from 'lodash';

import { useAppSelector } from '../../../../store/store';

import { memo, useMemo } from 'react';

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
          <div key={diskIndex}>
            {disks.length > 1 ? (
              <div className='disk-section'>
                <AlbumIcon /> Disk {diskIndex + 1}
              </div>
            ) : null}
            {disk.map((song, index) => (
              <SongView song={song} key={song.song_id} index={index} />
            ))}
          </div>
        ))}
      </div>

      <div style={{ paddingBottom: 30 }}>
      </div>
    </div>
  );
});
