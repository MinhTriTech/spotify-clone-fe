import { Divider } from 'antd';
import SongView from './Song';
import { PlaylistTableHeader } from './header';
import { PlaylistControls } from '../controls';

import { useAppDispatch, useAppSelector } from '../../../store/store';

import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';

// React
import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export const LikedSongsList = memo(({ color }) => {
  const dispatch = useAppDispatch();
  const total = useAppSelector((state) => state.likedSongs.items);
  const tracks = useAppSelector((state) => state.likedSongs.items);

  return (
    <div
      className='playlist-list'
      style={{
        maxHeight: 323,
        background: `linear-gradient(${color} -50%, ${DEFAULT_PAGE_COLOR} 90%)`,
      }}
    >
      <PlaylistControls />
      {!!total.length ? (
        <div className='playlist-table'>
          <PlaylistTableHeader />
        </div>
      ) : (
        <Divider>Không có bài hát nào</Divider>
      )}

      <InfiniteScroll
        loader={null}
        scrollThreshold={0.5}
        dataLength={tracks.length}
      >
        {!!total ? (
          <div style={{ paddingBottom: 30 }}>
            {tracks.map((song, index) => (
              <SongView song={song} key={`${song.song_id}`} index={index} />
            ))}
          </div>
        ) : null}
      </InfiniteScroll>
    </div>
  );
});
