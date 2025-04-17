import { NowPlayingLayout } from '../layout';
import { useAppSelector } from '../../../../../store/store';

import QueueSongDetailsProps from './SongDetails';

const NowPlaying = () => {
  const song = useAppSelector(
    (state) => state.spotify.state?.track_window.current_track,
    (a, b) => a?.id === b?.id
  );

  if (!song) return null;

  return (
    <div>
      <p className='playing-section-title'>Đang phát</p>
      <div style={{ margin: 5 }}>
        <QueueSongDetailsProps song={song} isPlaying={true} />
      </div>
    </div>
  );
};

const Queueing = () => {
  const queue = useAppSelector((state) => state.queue.queue);

  if (!queue || !queue.length) return null;

  return (
    <div style={{ marginTop: 30 }}>
      <p className='playing-section-title'>Tiếp theo</p>

      <div style={{ margin: 5 }}>
        {queue.map((q, index) => (
          <QueueSongDetailsProps key={index} song={q} />
        ))}
      </div>
    </div>
  );
};

export const Queue = () => {
  return (
    <NowPlayingLayout title="Hàng đợi">
      <div style={{ marginTop: 20 }}>
        <NowPlaying />
        <Queueing />
      </div>
    </NowPlayingLayout>
  );
};
