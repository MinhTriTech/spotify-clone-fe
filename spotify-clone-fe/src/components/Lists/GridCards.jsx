import { PlayCircle } from './PlayCircle';
import TrackActionsWrapper from '../Actions/TrackActions';
import AlbumActionsWrapper from '../Actions/AlbumActions';
import ArtistActionsWrapper from '../Actions/ArtistActions';
import PlayistActionsWrapper from '../Actions/PlaylistActions';

import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';

const t = (x) => x;

const Card = ({
  uri,
  title,
  image,
  rounded,
  description,
  onClick,
  context,
}) => {
  const paused = false;
  const contextUri = 'spotify:mock';
  const isCurrent = contextUri === uri;

  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className="playlist-card relative rounded-lg overflow-hidden hover:bg-spotify-gray-lightest transition"
    >
      <div style={{ position: 'relative' }} className="aspect-square p-4">
        <img
          src={image}
          alt={title}
          className={rounded ? 'rounded' : ''}
          style={{ borderRadius: 5, width: '100%' }}
        />
        <div
          className={`circle-play-div transition translate-y-1/4 ${
            isCurrent && !paused ? 'active' : ''
          }`}
        >
          <PlayCircle image={image} isCurrent={isCurrent} context={context} />
        </div>
      </div>
      <div className="playlist-card-info">
        <h3 className="text-md font-semibold text-white">{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const ArtistCard = ({ item, onClick, getDescription }) => {
  const navigate = useNavigate();

  const title = item?.name || 'Unknown Artist';
  const description = getDescription ? getDescription(item) : t('Artist');

  return (
    <ArtistActionsWrapper artist={item} trigger={['contextMenu']}>
      <div onClick={onClick}>
        <Card
          rounded
          title={title}
          uri={item?.uri}
          description={description}
          image={item?.images?.[0]?.url || PLAYLIST_DEFAULT_IMAGE}
          context={{ context_uri: item?.uri }}
          onClick={() => navigate(`/artist/${item?.id}`)}
        />
      </div>
    </ArtistActionsWrapper>
  );
};

export const AlbumCard = ({ item, onClick, getDescription }) => {
  const navigate = useNavigate();

  const onNavigate = useCallback(() => {
    console.log('Mock navigate to album');
    navigate(`/album/${item?.id}`);
  }, [navigate, item?.id]);

  const title = item?.name || 'Unknown Album';

  const description = getDescription
    ? getDescription(item)
    : Array.isArray(item?.artists)
    ? item.artists.slice(0, 3).map((a) => a.name).join(', ')
    : 'Unknown Artist';

  return (
    <AlbumActionsWrapper album={item} trigger={['contextMenu']}>
      <div onClick={onClick}>
        <Card
          title={title}
          uri={item?.uri}
          onClick={onNavigate}
          description={description}
          image={item?.images?.[0]?.url || PLAYLIST_DEFAULT_IMAGE}
          context={{ context_uri: item?.uri }}
        />
      </div>
    </AlbumActionsWrapper>
  );
};

export const PlaylistCard = ({ item, onClick, getDescription }) => {
  const title = item?.name || 'Unknown Playlist';

  const description = getDescription
    ? getDescription(item)
    : `${item?.tracks?.total || 0} ${t(item?.tracks?.total === 1 ? 'song' : 'songs')}`;

  return (
    <PlayistActionsWrapper playlist={item} trigger={['contextMenu']}>
      <div onClick={onClick}>
        <Card
          title={title}
          uri={item?.uri}
          description={description}
          context={{ context_uri: item?.uri }}
          onClick={() => console.log('Clicked playlist:', item?.id)}
          image={item?.images?.[0]?.url || PLAYLIST_DEFAULT_IMAGE}
        />
      </div>
    </PlayistActionsWrapper>
  );
};

export const TrackCard = ({ item, getDescription, onClick }) => {
  const navigate = useNavigate();
  const description = getDescription
    ? getDescription(item)
    : item?.album?.name || 'Unknown Album';

  return (
    <TrackActionsWrapper track={item} trigger={['contextMenu']}>
      <div onClick={onClick}>
        <Card
          uri={item?.uri}
          title={item?.name || 'Unknown Track'}
          description={description}
          context={{ uris: [item?.uri] }}
          image={item?.album?.images?.[0]?.url || PLAYLIST_DEFAULT_IMAGE}
          onClick={() => navigate(`/album/${item?.album?.id}`)}
        />
      </div>
    </TrackActionsWrapper>
  );
};
