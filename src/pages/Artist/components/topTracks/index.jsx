import { memo, useMemo, useState } from 'react';

import TopSong from './song';
import { Col, Row } from 'antd';

import { useAppSelector } from '../../../../store/store';

export const ArtistTopTracks = memo(() => {
  const [showAll, setShowAll] = useState(false);
  const topSongs = useAppSelector((state) => state.artist.topTracks);

  const items = useMemo(() => {
    if (showAll) {
      return topSongs;
    }
    return topSongs.slice(0, 5);
  }, [showAll, topSongs]);

  if (!topSongs.length) {
    return null;
  }

  return (
    <div style={{ margin: 10 }}>
      <h1 className='playlist-header'>Bài hát nổi bật</h1>
      <Row>
        <Col span={24}>
          <div>
            {items.map((song, index) => (
              <TopSong key={song.song_id} song={song} index={index} />
            ))}
          </div>
        </Col>
      </Row>
      <button className='showMore' onClick={() => setShowAll((s) => !s)}>
        <span>{showAll ? 'Ẩn bớt' : 'Xem thêm'}</span>
      </button>
    </div>
  );
});
