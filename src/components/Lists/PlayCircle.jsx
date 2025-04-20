import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { uiActions } from '../../store/slices/ui';
import { useAudio } from '../../contexts/AudioContext';

export const PlayCircle = ({ size = 20, big, isCurrent, context, image }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);
  const { isPlaying, play, pause, setSrc } = useAudio();

  const isThisTrackPlaying = isCurrent && isPlaying;

  const onClick = useCallback(
    (e) => {
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }

      if (!context?.file_path) return; // 🆕 lấy từ context.file_path

      if (!user && image) {
        return dispatch(uiActions.openLoginModal(image));
      }

      if (!isCurrent) {
        setSrc(context.file_path, {
          id: context.song_id,
          title: context.title,
          artists: context.artist, 
          // albumCoverUrl: context.album_cover || context.image,
        });
      } else {
        isThisTrackPlaying ? pause() : play();
      }
    },
    [isCurrent, isThisTrackPlaying, context, setSrc, play, pause, user, image, dispatch]
  );

  return (
    <button
      onClick={onClick}
      className={`${big ? 'circle-play big' : 'circle-play'} ${isThisTrackPlaying ? 'active' : ''}`}
    >
      <span>
        {!isThisTrackPlaying ? (
          <svg
            style={{ height: size }}
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 16 16"
          >
            <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
          </svg>
        ) : (
          <svg
            style={{ height: size }}
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path d="M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z"></path>
          </svg>
        )}
      </span>
    </button>
  );
};
