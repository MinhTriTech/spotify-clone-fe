import { Col, Row } from 'antd';
import { HorizontalCard } from './horizontalCard';

// Redux
import { useSelector } from 'react-redux';

export const TopTracks = ({ setColor }) => {
  const topTracks = useSelector((state) => state.home.topTracks);
  const isMobile = window.innerWidth < 768;

  if (!topTracks || !topTracks.length) return null;

  return (
    <Row
      gutter={[16, 16]}
      style={{ margin: '20px 0px', marginTop: isMobile ? 20 : 70 }}
      justify='space-between'
    >
      {topTracks.slice(0, isMobile ? 4 : undefined).map((item) => (
        <Col key={item.name} xs={24} md={12} lg={6}>
          <HorizontalCard item={item} setColor={setColor} />
        </Col>
      ))}
    </Row>
  );
};
