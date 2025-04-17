// import React from 'react';
// import { GridItemList } from '../../../../components/Lists/list';

// import { useAppSelector } from '../../../../store/store';
// import { getPlaylistDescription } from '../../../../utils/getDescription';
// import { RANKING_URI } from '../../../../constants/spotify';

// export const Rankings = () => {
//   const rankings = useAppSelector((state) => state.home.rankings);

//   if (!rankings || rankings.length === 0) return null;

//   return (
//     <div className="home">
//       <GridItemList
//         items={rankings}
//         title="Bảng xếp hạng nổi bật"
//         moreUrl={`/genre/${RANKING_URI}`}
//         getDescription={getPlaylistDescription}
//       />
//     </div>
//   );
// };

import { useMemo } from 'react';

// Không dùng Redux
// import { useAppSelector } from '../../../../store/store';
// import { getPlaylistDescription } from '../../../../utils/getDescription';
// import { RANKING_URI } from '../../../../constants/spotify';

// Tạm mock GridItemList
const GridItemList = ({ title, items, moreUrl, getDescription }) => (
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
    <div style={{ marginTop: '20px', color: 'gray', fontSize: '12px' }}>
      <a href={moreUrl} style={{ color: '#1DB954' }}>Xem thêm</a>
    </div>
  </div>
);

// Mock getPlaylistDescription
const getPlaylistDescription = (playlist) => `Created by ${playlist.owner || 'Unknown'}`;

// Mock constant
const RANKING_URI = 'ranking';

export const Rankings = () => {
  // Mock rankings playlists
  const rankings = useMemo(() => [
    { id: '1', name: 'Top Vietnam Hits', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Top Global Hits', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Top K-pop Songs', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
  ], []);

  if (!rankings || rankings.length === 0) return null;

  return (
    <div className="home">
      <GridItemList
        items={rankings}
        title="Bảng xếp hạng nổi bật"
        moreUrl={`/genre/${RANKING_URI}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
