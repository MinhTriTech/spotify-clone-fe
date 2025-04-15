import React, { memo, useLayoutEffect, useState } from 'react';
import { Drawer } from 'antd';
import YourLibrary from '../Layout/components/Library/list';

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

const LibraryDrawer = memo(() => {
  const [width] = useWindowSize();

  // ✅ MOCK trạng thái drawer
  const open = false; // ← bạn có thể đổi thành true để test

  if (width > 900) return null;

  return (
    <div className="playing-now-drawer">
      <Drawer open={open} onClose={() => {}} placement="left">
        <YourLibrary />
      </Drawer>
    </div>
  );
});

LibraryDrawer.displayName = 'LibraryDrawer';

export default LibraryDrawer;
