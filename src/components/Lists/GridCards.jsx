import { PlayCircle } from './PlayCircle';
import TrackActionsWrapper from '../Actions/TrackActions';
import { useNavigate } from 'react-router-dom';
import { useAudio } from '../../contexts/AudioContext';
import ArtistActionsWrapper from '../Actions/ArtistActions';

const Card = ({ title, image, rounded, description, onClick, context }) => {
  const { isPlaying, currentTrack, playlist, currentIndex } = useAudio();
  
  let isCurrent = false;
  
  if (context && context.type === 'playlist' && context.id) {
    const isPlayingThisPlaylist = playlist.length > 0 && 
                                 currentIndex >= 0 && 
                                 currentTrack?.playlistId === context.id;
    
    isCurrent = isPlayingThisPlaylist;
  } 
  else if (context && context.song_id) {
    isCurrent = currentTrack?.id === context.song_id;
  }
  
  const paused = !isPlaying;

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
          <PlayCircle 
            image={image} 
            isCurrent={isCurrent} 
            context={context} 
          />
        </div>
      </div>
      <div className='playlist-card-info'>
        <h3 className='text-md font-semibold text-white'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const ArtistCard = ({ item, onClick }) => {
  
  const navigate = useNavigate();

  const title = item.name;

  return (
    <ArtistActionsWrapper artist={item} trigger={['contextMenu']}>
      <div onClick={onClick}>
        <Card
          rounded
          title={title}
          image={item.image}
          context={{ 
            id: item.artist_id,
            image: item.image,
            type: "artists",
            title: title
          }}
          onClick={() => navigate(`/artist/${item.artist_id}`)}
        />
      </div>
    </ArtistActionsWrapper>
  );
};

export const TrackCard = ({ item, onClick }) => {
  const navigate = useNavigate();

  return (
    <TrackActionsWrapper track={item} trigger={['contextMenu']}>
      <div onClick={onClick}>
        <Card
          title={item.title}
          context={{ 
            id: item.playlist_id,
            image: item.image,
            type: "playlist",
            title: item.title
          }}
          image={item.image}
          onClick={() => navigate(`/album/${item.playlist_id}`)}
        />
      </div>
    </TrackActionsWrapper>
  );
};
