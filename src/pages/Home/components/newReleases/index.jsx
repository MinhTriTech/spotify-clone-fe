// import { useAppSelector } from '../../../../store/store';
// import { GridItemList } from '../../../../components/Lists/list';

// export const NewReleases = () => {
//   const newReleases = useAppSelector((state) => state.home.newReleases);

//   if (!newReleases || !newReleases.length) return null;

//   return (
//     <div className='home'>
//       <GridItemList title="Phát hành mới" items={newReleases} />
//     </div>
//   );
// };

import { useMemo } from 'react';

// Không xài Redux
// import { useAppSelector } from '../../../../store/store';
// import { GridItemList } from '../../../../components/Lists/list';

// Tạm mock GridItemList
const GridItemList = ({ title, items }) => (
  <div style={{ padding: '20px' }}>
    <h2 style={{ color: 'white' }}>{title}</h2>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '10px' }}>
      {items.map((item) => (
        <div key={item.id} style={{ width: '150px', backgroundColor: '#222', padding: '10px', borderRadius: '8px' }}>
          <img src={item.thumbnail} alt={item.title} style={{ width: '100%', borderRadius: '8px' }} />
          <h4 style={{ color: 'white', marginTop: '10px' }}>{item.title}</h4>
          <p style={{ color: 'gray', fontSize: '12px' }}>{item.artist}</p>
        </div>
      ))}
    </div>
  </div>
);

export const NewReleases = () => {
  // Mock danh sách album mới phát hành
  const newReleases = useMemo(() => [
    { id: '1', title: 'New Album 1', artist: 'Artist A', thumbnail: 'https://via.placeholder.com/150' },
    { id: '2', title: 'New Album 2', artist: 'Artist B', thumbnail: 'https://via.placeholder.com/150' },
    { id: '3', title: 'New Album 3', artist: 'Artist C', thumbnail: 'https://via.placeholder.com/150' },
    { id: '4', title: 'New Album 4', artist: 'Artist D', thumbnail: 'https://via.placeholder.com/150' },
  ], []);

  if (!newReleases || !newReleases.length) return null;

  return (
    <div className="home">
      <GridItemList title="Phát hành mới" items={newReleases} />
    </div>
  );
};
