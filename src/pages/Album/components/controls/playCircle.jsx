import { memo } from 'react';
import { useAppSelector } from '../../../../store/store';
import { PlayCircle } from '../../../../components/Lists/PlayCircle';
import { useAudio } from '../../../../contexts/AudioContext';

export const PlayCircleButton = memo(({ size = 30 }) => {
  const album = useAppSelector((state) => state.album.album);
  
  const { currentAlbumId } = useAudio();

  let isCurrent = false;
  
  if (album.album_id == currentAlbumId) {
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
        id: album.album_id,
        image: album.image,
        type: "album",
        title: album.title
      }}
    />
  );
});
