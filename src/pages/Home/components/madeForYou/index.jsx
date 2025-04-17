// import { useMemo } from 'react';

// // Components
// import { GridItemList } from '../../../../components/Lists/list';

// // Redux
// import { useAppSelector } from '../../../../store/store';
// import { getPlaylistDescription } from '../../../../utils/getDescription';

// // Constants
// import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';

// export const MadeForYou = () => {
//   const user = useAppSelector((state) => state.auth.user);
//   const madeForYou = useAppSelector((state) => state.home.madeForYou);

//   const items = useMemo(() => {
//     const items = madeForYou.filter((p) => !p.name.toLowerCase().includes('mix'));
//     const otherItems = madeForYou.filter((p) => p.name.toLowerCase().includes('mix')).reverse();
//     return [...items, ...otherItems].slice(0, 12);
//   }, [madeForYou]);

//   if (!items || !items.length) return null;

//   return (
//     <div className='home'>
//       <GridItemList
//         items={items}
//         moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
//         getDescription={getPlaylistDescription}
//         title={`Dành riêng cho ${user?.display_name || 'bạn'}`}
//       />
//     </div>
//   );
// };


import { useMemo } from 'react';

// Tạm thời không xài Redux
// import { useAppSelector } from '../../../../store/store';
// import { getPlaylistDescription } from '../../../../utils/getDescription';
// import { MADE_FOR_YOU_URI } from '../../../../constants/spotify';

// Tạm mock luôn GridItemList
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

// Mock hàm getPlaylistDescription
const getPlaylistDescription = (playlist) => `Playlist by ${playlist.owner || 'Unknown'}`;

// Mock constant
const MADE_FOR_YOU_URI = 'made-for-you';

export const MadeForYou = () => {
  // Mock user
  const user = { display_name: 'NguyenAn' };

  // Mock madeForYou playlists
  const madeForYou = [
    { id: '1', name: 'Chill Mix', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Focus Playlist', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Energy Boost', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Happy Vibes', owner: 'Spotify', thumbnail: 'https://via.placeholder.com/150' },
  ];

  const items = useMemo(() => {
    const items = madeForYou.filter((p) => !p.name.toLowerCase().includes('mix'));
    const otherItems = madeForYou.filter((p) => p.name.toLowerCase().includes('mix')).reverse();
    return [...items, ...otherItems].slice(0, 12);
  }, [madeForYou]);

  if (!items || !items.length) return null;

  return (
    <div className="home">
      <GridItemList
        items={items}
        moreUrl={`/genre/${MADE_FOR_YOU_URI}`}
        getDescription={getPlaylistDescription}
        title={`Dành riêng cho ${user?.display_name || 'bạn'}`}
      />
    </div>
  );
};
