import { PlayCircle } from './PlayCircle';
import TrackActionsWrapper from '../Actions/TrackActions';

import { useNavigate } from 'react-router-dom';

// Redux
import { useAppSelector } from '../../store/store';

const Card = ({ uri, title, image, rounded, description, onClick, context }) => {
  const paused = useAppSelector((state) => state.spotify.state?.paused);
  const contextUri = useAppSelector((state) => state.spotify.state?.context.uri);
  const isCurrent = contextUri === uri;

  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className='playlist-card relative rounded-lg overflow-hidden hover:bg-spotify-gray-lightest transition'
    >
      <div
        style={{ position: 'relative' }}
        className='aspect-square md:aspect-w-1 md:aspect-h-1/2 lg:aspect-w-1 lg:aspect-h-3/4 xl:aspect-w-1 xl:aspect-h-4/5 p-4'
      >
        <img
          src={image}
          alt={title}
          className={rounded ? 'rounded' : ''}
          style={{ borderRadius: 5, width: '100%' }}
        />
        <div
          className={`circle-play-div transition translate-y-1/4 ${isCurrent && !paused ? 'active' : ''}`}
        >
          <PlayCircle image={image} isCurrent={isCurrent} context={context} />
        </div>
      </div>
      <div className='playlist-card-info'>
        <h3 className='text-md font-semibold text-white'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const TrackCard = ({ item, onClick }) => {
  const navigate = useNavigate();
  const description = "Chi tiết"; // Thêm sau

  return (
    <TrackActionsWrapper track={item} trigger={['contextMenu']}>
      <div onClick={onClick}>
        <Card
          title={item.title}
          description={description}
          context={{ id: item.playlist_id,
                    type: "playlist", }}
          image={item.image}
          onClick={() => navigate(`/album/${item.album.id}`)}
        />
      </div>
    </TrackActionsWrapper>
  );
};
