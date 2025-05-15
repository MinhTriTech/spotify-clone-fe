import { memo } from 'react';
import { useAudio } from '../../contexts/AudioContext';
import ArtistActionsWrapper from '../Actions/ArtistActions';
import { Link } from 'react-router-dom';

const AlbumSongDetails = memo(() => {
  const { currentTrack } = useAudio();

  if (!currentTrack) return <></>;

  return (
    <div className="flex flex-row items-center">
      <img
        alt="Bìa album"
        className="album-cover"
        src={currentTrack?.image}
      />
      <div id="song-and-artist-name">
        <p
          className="text-white font-bold song-title"
          title={currentTrack?.title}
        >
          {currentTrack?.title}
        </p>
        <p
          className="text-gray-200 song-artist"
          title={currentTrack?.artists
            ?.slice(0, 3)
            .map((a) => a.name)
            .join(', ')}
        >
          {currentTrack?.artists?.slice(0, 3).map((a, i) => (
            <span key={a.artist_id}>
              <ArtistActionsWrapper artist={a} trigger={['contextMenu']}>
                <Link target="_blank" to={`/artist/${a.artist_id}`}>
                  {a.name}
                </Link>
              </ArtistActionsWrapper>
              {i < currentTrack.artists.slice(0, 3).length - 1 && ', '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
});

AlbumSongDetails.displayName = 'FullScreenAlbumSongDetails';

export default AlbumSongDetails;
