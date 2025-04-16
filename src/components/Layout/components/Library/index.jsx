import React, { useEffect } from 'react';
import YourLibrary from './list';

export const Library = () => {
  const user = true; // ✅ mock trạng thái đăng nhập

  useEffect(() => {
    if (user) {
      console.log('Mock fetch: albums, artists, playlists');
      // Không cần dispatch thật
    }
  }, [user]);

  return (
    <div style={{ height: '100%' }}>
      <YourLibrary />
    </div>
  );
};

export default Library;
