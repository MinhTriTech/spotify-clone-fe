// import { Col, Row } from 'antd';
// import { HorizontalCard } from './horizontalCard';

// // Redux
// import { useSelector } from 'react-redux';

// export const TopTracks = ({ setColor }) => {
//   const topTracks = useSelector((state) => state.home.topTracks);
//   const isMobile = window.innerWidth < 768;

//   if (!topTracks || !topTracks.length) return null;

//   return (
//     <Row
//       gutter={[16, 16]}
//       style={{ margin: '20px 0px', marginTop: isMobile ? 20 : 70 }}
//       justify='space-between'
//     >
//       {topTracks.slice(0, isMobile ? 4 : undefined).map((item) => (
//         <Col key={item.name} xs={24} md={12} lg={6}>
//           <HorizontalCard item={item} setColor={setColor} />
//         </Col>
//       ))}
//     </Row>
//   );
// };


import { Col, Row } from 'antd';

// Tạm thời không dùng Redux
// import { useSelector } from 'react-redux';

// Component con tạm mock
const HorizontalCard = ({ item, setColor }) => (
  <div
    style={{
      backgroundColor: '#333',
      padding: '10px',
      borderRadius: '8px',
      cursor: 'pointer',
    }}
    onMouseEnter={() => setColor('rgb(66, 32, 35)')} // Mock change color
  >
    <img src={item.thumbnail} alt={item.title} style={{ width: '100%', borderRadius: '8px' }} />
    <h4 style={{ color: 'white', marginTop: '10px' }}>{item.title}</h4>
    <p style={{ color: 'gray', fontSize: '12px' }}>{item.artist}</p>
  </div>
);

export const TopTracks = ({ setColor }) => {
  // Mock dữ liệu
  const topTracks = [
    {
      id: '1',
      title: 'Mock Song 1',
      artist: 'Mock Artist A',
      thumbnail: 'https://i.scdn.co/image/ab6761610000e5eb5a79a6ca8c60e4ec1440be53',
    },
    {
      id: '2',
      title: 'Mock Song 2',
      artist: 'Mock Artist B',
      thumbnail: 'https://i.scdn.co/image/ab6761610000e5eb5a79a6ca8c60e4ec1440be53',
    },
    {
      id: '3',
      title: 'Mock Song 3',
      artist: 'Mock Artist C',
      thumbnail: 'https://i.scdn.co/image/ab6761610000e5eb5a79a6ca8c60e4ec1440be53',
    },
    {
      id: '4',
      title: 'Mock Song 4',
      artist: 'Mock Artist D',
      thumbnail: 'https://i.scdn.co/image/ab6761610000e5eb5a79a6ca8c60e4ec1440be53',
    },
  ];

  const isMobile = window.innerWidth < 768;

  if (!topTracks || !topTracks.length) return null;

  return (
    <Row
      gutter={[16, 16]}
      style={{ margin: '20px 0px', marginTop: isMobile ? 20 : 70 }}
      justify="space-between"
    >
      {topTracks.slice(0, isMobile ? 4 : undefined).map((item) => (
        <Col key={item.id} xs={24} md={12} lg={6}>
          <HorizontalCard item={item} setColor={setColor} />
        </Col>
      ))}
    </Row>
  );
};
