// import { useAppSelector } from '../../../../store/store';

// import { GridItemList } from '../../../../components/Lists/list';
// import { getPlaylistDescription } from '../../../../utils/getDescription';

// export const FeaturePlaylists = () => {
//   const featurePlaylists = useAppSelector((state) => state.home.featurePlaylists);

//   if (!featurePlaylists || !featurePlaylists.length) return null;

//   return (
//     <div className='home'>
//       <GridItemList
//         items={featurePlaylists}
//         title="Playlist nổi bật"
//         getDescription={getPlaylistDescription}
//       />
//     </div>
//   );
// };

import { useMemo } from 'react';

// Không dùng Redux
// import { useAppSelector } from '../../../../store/store';
// import { getPlaylistDescription } from '../../../../utils/getDescription';

// Tạm mock GridItemList
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

// Mock getPlaylistDescription
const getPlaylistDescription = (playlist) => `Created by ${playlist.owner || 'Unknown Creator'}`;

export const FeaturePlaylists = () => {
  // Mock feature playlists
  const featurePlaylists = useMemo(() => [
    { id: '1', name: 'Morning Boost', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Evening Chill', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Top Hits', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Classic Vibes', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
  ], []);

  if (!featurePlaylists || !featurePlaylists.length) return null;

  return (
    <div className="home">
      <GridItemList
        items={featurePlaylists}
        title="Playlist nổi bật"
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
