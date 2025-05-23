import { Divider } from 'antd';
import SongView from './Song';
import { PlaylistTableHeader } from './header';
import PlaylistControls from '../controls';
import ReactDragListView from 'react-drag-listview';

import { useAppSelector } from '../../../store/store';

import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';

import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export const PlaylistList = memo(({ color }) => {
  const tracks = useAppSelector((state) => state.playlist.tracks);
  const canEdit = useAppSelector((state) => state.playlist.canEdit);
  
  const hasTracks = !!tracks?.length;
  
  return (
    <div
      className='playlist-list'
      style={{
        maxHeight: 323,
        background: `linear-gradient(${color} -50%, ${DEFAULT_PAGE_COLOR} 90%)`,
      }}
    >
      <PlaylistControls />
      {hasTracks ? (
        <div className='playlist-table'>
          <PlaylistTableHeader />
        </div>
      ) : (
        <Divider />
      )}

      <InfiniteScroll
        loader={null}
        scrollThreshold={0.5}
        dataLength={tracks.length}
      >
        {hasTracks ? (
          <div style={{ paddingBottom: 30 }}>
            {canEdit ? (
              <div>
                <ReactDragListView
                  nodeSelector='button'
                  lineClassName='drag-line'
                >
                  {tracks.map((song, index) => (
                    <SongView song={song} key={`${song.song_id}`} index={index} />
                  ))}
                </ReactDragListView>
              </div>
            ) : (
              <div>
                {tracks.map((song, index) => (
                  <SongView song={song} key={`${song.song_id}`} index={index} />
                ))}
              </div>
            )}
          </div>
        ) : null}
      </InfiniteScroll>
    </div>
  );
});
