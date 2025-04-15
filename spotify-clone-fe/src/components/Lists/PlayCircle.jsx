import { useCallback, useState } from 'react';

export const PlayCircle = ({ size = 20, big, isCurrent = false, context, image }) => {
  // ✅ MOCK trạng thái
  const [isPlaying, setIsPlaying] = useState(false);
  const user = true; // hoặc false nếu bạn muốn giả lập chưa đăng nhập

  const onClick = useCallback(
    (e) => {
      if (e && e.stopPropagation) e.stopPropagation();

      if (!user && image) {
        console.log('Mock: Open login modal with image', image);
        return;
      }

      if (isPlaying && isCurrent) {
        console.log('Mock: Pause playback');
        setIsPlaying(false);
        return;
      }

      console.log('Mock: Start playback', context);
      setIsPlaying(true);
    },
    [user, image, isPlaying, isCurrent, context]
  );

  return (
    <button
      onClick={onClick}
      className={`${big ? 'circle-play big' : 'circle-play'} ${isPlaying ? 'active' : ''}`}
    >
      <span>
        {!isPlaying ? (
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
