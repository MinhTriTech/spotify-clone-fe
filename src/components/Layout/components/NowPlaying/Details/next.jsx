// Cleaned NextInQueue component without Redux, services, or i18n
import { memo, useCallback, useState } from 'react';
import { DetailsCard } from './card';
import { Play } from '../../../../Icons';

export const NextInQueue = memo(() => {
  // Mock queue item
  const [item] = useState({
    id: 'mock-track',
    name: 'Mock Track',
    album: {
      name: 'Mock Album',
      images: [{ url: 'https://via.placeholder.com/150' }],
    },
    artists: [{ name: 'Mock Artist' }],
  });

  const onClick = useCallback(() => {
    console.log('Mock next track');
  }, []);

  if (!item) return null;

  return (
    <DetailsCard
      title={'Next in queue'}
      extra={
        <button onClick={() => console.log('Open Queue')} className='link-button'>
          {'Open Queue'}
        </button>
      }
    >
      <div className='queue-song' onDoubleClick={onClick}>
        <div className='flex flex-row items-center'>
          <div className='queue-song-image-container'>
            <div className='queue-song-overlay' onClick={onClick}>
              <Play />
            </div>
            <img alt={item.album?.name || ''} className='album-cover' src={item.album?.images[0].url} />
          </div>

          <div id='song-and-artist-name'>
            <p className='text-white font-bold song-title' title={item.name}>
              {item.name}
            </p>
            <p className='song-artist' title={item.artists?.map((a) => a.name).join(', ') || ''}>
              {item.artists?.slice(0, 3).map((a) => a.name).join(', ') || ''}
            </p>
          </div>
        </div>
      </div>
    </DetailsCard>
  );
});