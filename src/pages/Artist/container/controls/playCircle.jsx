import { memo } from 'react';
import { useAppSelector } from '../../../../store/store';
import { PlayCircle } from '../../../../components/Lists/PlayCircle';
import { useAudio } from '../../../../contexts/AudioContext';

export const PlayCircleButton = memo(({ size = 30 }) => {
  const artist = useAppSelector(
    (state) => state.artist.artist,
    (prev, next) => prev?.id === next?.id
  );

  const { currentArtistId } = useAudio();

  let isCurrent = false;
  
  if (artist.artist_id == currentArtistId) {
    isCurrent = true;
  } 
  else {
    isCurrent = false;
  }

  return (
    <PlayCircle
      size={size}
      big={size >= 30}
      isCurrent={isCurrent} 
      context={{ 
        id: artist.artist_id,
        image: artist.image,
        type: "artist",
        title: artist.name
      }}
    />
  );
});
