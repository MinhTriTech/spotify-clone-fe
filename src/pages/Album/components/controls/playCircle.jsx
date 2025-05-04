import { memo, useMemo } from 'react';
import { useAppSelector } from '../../../../store/store';
import { PlayCircle } from '../../../../components/Lists/PlayCircle';

export const PlayCircleButton = memo(({ size = 30 }) => {
  const album = useAppSelector((state) => state.album.album);
  const context = useAppSelector((state) => state.spotify.state?.context.uri);

  const isCurrent = useMemo(() => album?.uri === context, [album, context]);

  return (
    <PlayCircle
      size={size}
      big={size >= 30}
      isCurrent={isCurrent}
      context={{ context_uri: album?.uri }}
    />
  );
});
