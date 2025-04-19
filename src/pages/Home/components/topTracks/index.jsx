import { Col, Row } from 'antd';
import { HorizontalCard } from './horizontalCard';

// Redux
import { useAppSelector } from '../../../../store/store';

const isMobile = window.innerWidth < 768;

export const TopTracks = (props) => {
  // const topTracks = useAppSelector((state) => state.home.topTracks);

  const topTracks = [
    {
      id: '1',
      name: 'Bài hát số 1',
      uri: 'spotify:track:1',
      album: {
        id: 'album1',
        images: [
          {
            url: 'https://via.placeholder.com/300x300?text=Album+1',
          },
        ],
      },
    },
    {
      id: '2',
      name: 'Bài hát số 2',
      uri: 'spotify:track:2',
      album: {
        id: 'album2',
        images: [
          {
            url: 'https://via.placeholder.com/300x300?text=Album+2',
          },
        ],
      },
    },
    {
      id: '3',
      name: 'Bài hát số 3',
      uri: 'spotify:track:3',
      album: {
        id: 'album3',
        images: [
          {
            url: 'https://via.placeholder.com/300x300?text=Album+3',
          },
        ],
      },
    },
    {
      id: '4',
      name: 'Bài hát số 4',
      uri: 'spotify:track:4',
      album: {
        id: 'album4',
        images: [
          {
            url: 'https://via.placeholder.com/300x300?text=Album+4',
          },
        ],
      },
    },
  ];
  

  if (!topTracks || !topTracks.length) return null;

  return (
    <Row
      gutter={[16, 16]}
      style={{ margin: '20px 0px', marginTop: isMobile ? 20 : 70 }}
      justify="space-between"
    >
      {topTracks.slice(0, isMobile ? 4 : undefined).map((item) => (
        <Col key={item.name} xs={24} md={12} lg={6}>
          <HorizontalCard item={item} setColor={props.setColor} />
        </Col>
      ))}
    </Row>
  );
};
