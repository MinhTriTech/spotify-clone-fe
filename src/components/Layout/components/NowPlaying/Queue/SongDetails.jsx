// Cleaned QueueSongDetails component without Redux or service dependencies
import { memo, useMemo, useState } from 'react';
import { Pause, Play } from '../../../../Icons';
import useIsMobile from '../../../../../utils/isMobile';

const QueueSongDetails = memo(({ song, isPlayingInitial = false }) => {
  const isMobile = useIsMobile();
  const [isPlaying, setIsPlaying] = useState(isPlayingInitial);
  const [isPaused, setIsPaused] = useState(false);

  const onClick = async () => {
    if (!isPaused && isPlaying) {
      setIsPaused(true);
      setIsPlaying(false);
    } else if (isPlaying) {
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      setIsPaused(false);
      setIsPlaying(true);
    }
  };

  const image = useMemo(() => {
    if (song.type === 'track') return song.album.images[0].url;
    if (song.type === 'episode') return song.images[0].url;
    return '';
  }, [song]);

  const artists = useMemo(() => {
    if (song.type === 'track') {
      return song.artists.slice(0, 3).map((a) => a.name).join(', ');
    }
    if (song.type === 'episode') {
      return song.show.publisher;
    }
    return '';
  }, [song]);

  return (
    <div
      className='queue-song'
      onClick={isMobile ? onClick : undefined}
      onDoubleClick={!isMobile ? onClick : undefined}
    >
      <div className='flex flex-row items-center'>
        <div className='queue-song-image-container'>
          {!isMobile ? (
            <div className='queue-song-overlay' onClick={onClick}>
              {!isPaused && isPlaying ? <Pause /> : <Play />}
            </div>
          ) : null}

          <img alt='Album Cover' className='album-cover' src={image} />
        </div>
        <div id='song-and-artist-name'>
          <p
            title={song.name}
            className={`text-white font-bold song-title ${isPlaying ? 'active' : ''}`}
          >
            {song.name}
          </p>
          <p className='text-gray-200 song-artist' title={artists}>
            {artists}
          </p>
        </div>
      </div>
    </div>
  );
});

export default QueueSongDetails;