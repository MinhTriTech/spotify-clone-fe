// import { useMemo } from 'react';

// // Components
// import { GridItemList } from '../../../../components/Lists/list';

// // Redux & Utils
// import { useAppSelector } from '../../../../store/store';
// import { getPlaylistDescription } from '../../../../utils/getDescription';

// // Constants
// import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';

// export const TopMixes = () => {
//   const madeForYou = useAppSelector((state) => state.home.madeForYou);

//   const items = useMemo(() => {
//     return madeForYou
//       .filter((p) => p.name.toLowerCase().includes('mix'))
//       .slice(0, 12);
//   }, [madeForYou]);

//   if (!items || !items.length) return null;

//   return (
//     <div className='home'>
//       <GridItemList
//         items={items}
//         title="Top bản phối của bạn"
//         moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
//         getDescription={getPlaylistDescription}
//       />
//     </div>
//   );
// };

import { useMemo } from 'react';

// Tạm thời không dùng Redux
// import { useAppSelector } from '../../../../store/store';
// import { getPlaylistDescription } from '../../../../utils/getDescription';
// import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';

// Tạm mock GridItemList
const GridItemList = ({ items, title, moreUrl, getDescription }) => (
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
const getPlaylistDescription = (playlist) => `Playlist by ${playlist.owner || 'Unknown'}`;

// Mock constant
const MADE_FOR_YOU_URI = 'made-for-you';

export const TopMixes = () => {
  // Mock madeForYou playlists
  const madeForYou = [
    { id: '1', name: 'Chill Mix', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Workout Mix', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Party Mix', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Relax Mix', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Focus Mix', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
  ];

  const items = useMemo(() => {
    return madeForYou
      .filter((p) => p.name.toLowerCase().includes('mix'))
      .slice(0, 12);
  }, [madeForYou]);

  if (!items || !items.length) return null;

  return (
    <div className="home">
      <GridItemList
        items={items}
        title="Top bản phối của bạn"
        moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
        getDescription={getPlaylistDescription}
      />
    </div>
  );
};
