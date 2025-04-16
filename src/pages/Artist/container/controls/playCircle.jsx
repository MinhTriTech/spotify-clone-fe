import { memo, useMemo } from 'react';
import { useAppSelector } from '../../../../store/store';
import { PlayCircle } from '../../../../components/Lists/PlayCircle';

const PlayCircleButton = ({ size = 30 }) => {
  const artist = useAppSelector(
    (state) => state.artist.artist,
    (prev, next) => prev?.id === next?.id
  );
  const context = useAppSelector((state) => state.spotify.state?.context.uri);
  const isCurrent = useMemo(() => artist?.uri === context, [artist, context]);

  return (
    <PlayCircle
      size={size}
      big={size >= 30}
      isCurrent={isCurrent}
      image={artist?.images[0]?.url}
      context={{ context_uri: artist?.uri }}
    />
  );
};

export default memo(PlayCircleButton);
