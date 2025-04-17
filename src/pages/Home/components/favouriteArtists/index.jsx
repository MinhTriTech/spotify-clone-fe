// import { useAppSelector } from '../../../../store/store';
// import { memo, useMemo } from 'react';

// import { GridItemList } from '../../../../components/Lists/list';

// export const FavouriteArtists = memo(() => {
//   const artists = useAppSelector((state) => state.yourLibrary.myArtists);

//   const items = useMemo(() => {
//     return artists.slice(0, 12);
//   }, [artists]);

//   if (!artists || !artists.length) return null;

//   return (
//     <div className='home'>
//       <GridItemList items={items} title='Nghệ sĩ yêu thích của bạn' />
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

export const FavouriteArtists = memo(() => {
  // Mock danh sách nghệ sĩ yêu thích
  const artists = useMemo(() => [
    { id: '1', name: 'Taylor Swift', thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Drake', thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Adele', thumbnail: 'https://via.placeholder.com/150' },
    { id: '4', name: 'The Weeknd', thumbnail: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Billie Eilish', thumbnail: 'https://via.placeholder.com/150' },
  ], []);

  const items = useMemo(() => {
    return artists.slice(0, 12);
  }, [artists]);

  if (!artists || !artists.length) return null;

  return (
    <div className="home">
      <GridItemList items={items} title="Nghệ sĩ yêu thích của bạn" />
    </div>
  );
});
