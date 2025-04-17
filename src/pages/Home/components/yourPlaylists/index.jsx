// import { useAppSelector } from '../../../../store/store';
// import { memo, useMemo } from 'react';

// import { GridItemList } from '../../../../components/Lists/list';

// export const YourPlaylists = memo(() => {
//   const user = useAppSelector((state) => state.auth.user?.id);
//   const playlists = useAppSelector((state) => state.yourLibrary.myPlaylists);

//   const items = useMemo(() => {
//     return playlists.filter((p) => p.owner?.id === user).slice(0, 12);
//   }, [playlists, user]);

//   if (!items || !items.length) return null;

//   return (
//     <div className='home'>
//       <GridItemList items={items} title="Playlist của bạn" />
//     </div>
//   );
// });

import { memo, useMemo } from 'react';

// Không dùng Redux
// import { useAppSelector } from '../../../../store/store';
// import { GridItemList } from '../../../../components/Lists/list';

// Tạm mock GridItemList
const GridItemList = ({ title, items }) => (
  <div style={{ padding: '20px' }}>
    <h2 style={{ color: 'white' }}>{title}</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
      {items.map((item) => (
        <div key={item.id} style={{ width: '150px', backgroundColor: '#222', padding: '10px', borderRadius: '8px' }}>
          <img src={item.thumbnail} alt={item.name} style={{ width: '100%', borderRadius: '8px' }} />
          <h4 style={{ color: 'white', marginTop: '10px' }}>{item.name}</h4>
        </div>
      ))}
    </div>
  </div>
);

export const YourPlaylists = memo(() => {
  // Mock user id
  const userId = '123';

  // Mock danh sách tất cả playlists
  const playlists = useMemo(() => [
    { id: '1', name: 'My Chill Vibes', owner: { id: '123' }, thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Workout Hits', owner: { id: '123' }, thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Travel Playlist', owner: { id: '456' }, thumbnail: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Focus Flow', owner: { id: '123' }, thumbnail: 'https://via.placeholder.com/150' },
  ], []);

  const items = useMemo(() => {
    return playlists.filter((p) => p.owner?.id === userId).slice(0, 12);
  }, [playlists, userId]);

  if (!items || !items.length) return null;

  return (
    <div className="home">
      <GridItemList items={items} title="Playlist của bạn" />
    </div>
  );
});
