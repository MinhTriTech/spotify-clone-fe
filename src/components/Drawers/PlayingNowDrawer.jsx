import { memo, useLayoutEffect, useState } from 'react';

// Components
import { Drawer } from 'antd';
import PlayingNow from '../Layout/components/NowPlaying';

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export const PlayingNowDrawer = memo(() => {
  const [width] = useWindowSize();

  // ✅ MOCK trạng thái mở drawer
  const open = true; // ← đổi thành false nếu bạn muốn ẩn nó

  if (width > 900) return null;

  return (
    <div className="playing-now-drawer">
      <Drawer open={open} onClose={() => {}} placement="right">
        <PlayingNow />
      </Drawer>
    </div>
  );
});

PlayingNowDrawer.displayName = 'PlayingNowDrawer';
