import { memo } from 'react';
import SongView from './SongView';

import { useAppSelector } from '../../../store/store';

export const PlaylistRecommendations = memo(() => {
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const recommendations = useAppSelector((state) => state.playlist.recommedations);

  if (!playlist || !recommendations.length) return null;

  return (
    <div className='playlist-recommendations'>
      <h1 className='playlist-header'>Gợi ý từ danh sách phát</h1>
      <span>
        {playlist.tracks?.total
          ? 'Dựa trên những bài hát trong danh sách này'
          : 'Dựa trên thói quen nghe nhạc của bạn'}
      </span>

      <div style={{ margin: 5, marginTop: 10 }}>
        {recommendations.slice(0, 10).map((track) => (
          <SongView key={track.id} song={track} />
        ))}
      </div>
    </div>
  );
});
