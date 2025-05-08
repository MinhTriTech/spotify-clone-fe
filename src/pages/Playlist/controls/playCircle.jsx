import { PlayCircle } from '../../../components/Lists/PlayCircle';

import { useAppSelector } from '../../../store/store';

import { memo } from 'react';

export const PlayCircleButton = memo(({ size = 30 }) => {
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const track = useAppSelector((state) => state.playlist.tracks);

  const context={ 
    id: playlist.playlist_id,
    image: playlist.image,
    type: "playlist",
    title: playlist.title
  }

  let isCurrent = false;
  
  if (context && context.type === 'playlist' && context.id) {
    const isPlayingThisPlaylist = playlist.length > 0 && 
                                 currentIndex >= 0 && 
                                 currentPlaylistId === context.id;
    
    isCurrent = isPlayingThisPlaylist;
  } 
  else if (context && context.song_id) {
    isCurrent = currentTrack?.id === context.song_id;
  }
  

  if ( !track ) return null; 

  return (
    <PlayCircle
      size={size}
      big={size >= 30}
      isCurrent={isCurrent}
      context={context}
    />
  );
});
