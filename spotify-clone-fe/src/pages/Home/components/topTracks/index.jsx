import React from 'react';
import { Col, Row } from 'antd';
import { HorizontalCard } from './horizontalCard';
import { useAppSelector } from '../../../../store/store';

const isMobile = window.innerWidth < 768;

export const TopTracks = ({ setColor }) => {
  const topTracks = useAppSelector((state) => state.home.topTracks);

  if (!topTracks || topTracks.length === 0) return null;

  return (
    <Row
      gutter={[16, 16]}
      style={{ margin: '20px 0px', marginTop: isMobile ? 20 : 70 }}
      justify="space-between"
    >
      {topTracks.slice(0, isMobile ? 4 : undefined).map((item) => (
        <Col key={item.name} xs={24} md={12} lg={6}>
          <HorizontalCard item={item} setColor={setColor} />
        </Col>
      ))}
    </Row>
  );
};
