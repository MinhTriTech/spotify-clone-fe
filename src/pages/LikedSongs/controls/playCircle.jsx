import { PlayCircle } from '../../../components/Lists/PlayCircle';

import { useAppSelector } from '../../../store/store';

import { memo } from 'react';

import { useAudio } from '../../../contexts/AudioContext';

export const PlayCircleButton = memo(({ size = 30 }) => {
  const { playlist, currentIndex, currentLikedSongId } = useAudio();

  const hasSongs = useAppSelector((state) => !!state.likedSongs.items.length);
  
  const context={
    id: 1,
    type: "likedSongs",
  }

  let isCurrent = false;
  
  if (context && context.type === 'likedSongs') {
    const isPlayingThisPlaylist = playlist.length > 0 && 
                                 currentIndex >= 0 && currentLikedSongId == 1;
    isCurrent = isPlayingThisPlaylist;
  } 

  if (!hasSongs) return null;

  return (
    <PlayCircle
      size={size}
      big={size >= 30}
      isCurrent={isCurrent}
      context={context}
    />
  );
});
