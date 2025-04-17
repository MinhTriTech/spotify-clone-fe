// import { useAppSelector } from '../../../../store/store';
// import { memo } from 'react';

// import { GridItemList } from '../../../../components/Lists/list';
// import { getItemDescription } from '../../../../utils/getDescription';

// export const RecentlyPlayed = memo(() => {
//   const recentlyPlayed = useAppSelector((state) => state.home.recentlyPlayed);

//   if (!recentlyPlayed || !recentlyPlayed.length) return null;

//   return (
//     <div className='home'>
//       <GridItemList
//         title="Nghe gần đây"
//         items={recentlyPlayed.slice(0, 10)}
//         getDescription={getItemDescription}
//       />
//     </div>
//   );
// });

import { memo, useMemo } from 'react';

// Không xài Redux
// import { useAppSelector } from '../../../../store/store';
// import { getItemDescription } from '../../../../utils/getDescription';

// Mock GridItemList
const GridItemList = ({ title, items, getDescription }) => (
  <div style={{ padding: '20px' }}>
    <h2 style={{ color: 'white' }}>{title}</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
      {items.map((item) => (
        <div key={item.id} style={{ width: '150px', backgroundColor: '#222', padding: '10px', borderRadius: '8px' }}>
          <img src={item.thumbnail} alt={item.name} style={{ width: '100%', borderRadius: '8px' }} />
          <h4 style={{ color: 'white', marginTop: '10px' }}>{item.name}</h4>
          <p style={{ color: 'gray', fontSize: '12px' }}>{getDescription ? getDescription(item) : 'No description'}</p>
        </div>
      ))}
    </div>
  </div>
);

// Mock getItemDescription
const getItemDescription = (item) => `Played by ${item.artist || 'Unknown Artist'}`;

export const RecentlyPlayed = memo(() => {
  // Mock recentlyPlayed list
  const recentlyPlayed = useMemo(() => [
    { id: '1', name: 'Mock Track 1', artist: 'Artist A', thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Mock Track 2', artist: 'Artist B', thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Mock Album 1', artist: 'Artist C', thumbnail: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Mock Playlist 1', artist: 'Artist D', thumbnail: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Mock Track 3', artist: 'Artist E', thumbnail: 'https://via.placeholder.com/150' },
  ], []);

  if (!recentlyPlayed || !recentlyPlayed.length) return null;

  return (
    <div className="home">
      <GridItemList
        title="Nghe gần đây"
        items={recentlyPlayed.slice(0, 10)}
        getDescription={getItemDescription}
      />
    </div>
  );
});
