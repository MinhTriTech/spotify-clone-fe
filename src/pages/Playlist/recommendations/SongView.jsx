import { useMemo } from 'react';
import { AddRecommendation } from './add';
import SongView, { SongViewComponents } from '../../../components/SongsTable/songView';

// Redux
import { useAppSelector } from '../../../store/store';

export const Song = ({ song }) => {
  const recommendations = useAppSelector((state) => state.playlist.recommedations);

  const uris = useMemo(() => {
    const index = recommendations.findIndex((r) => r.uri === song.uri);
    return recommendations.slice(index).map((r) => r.uri);
  }, [recommendations, song.uri]);

  return (
    <SongView
      view='LIST'
      song={song}
      size='small'
      context={{ uris }}
      fields={[
        SongViewComponents.Title,
        SongViewComponents.Album,
        () => (
          <div className='text-right' style={{ flex: 3, marginRight: 15 }}>
            <AddRecommendation song={song} />
          </div>
        ),
      ]}
    />
  );
};

export default Song;
