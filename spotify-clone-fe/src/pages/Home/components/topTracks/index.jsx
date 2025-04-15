import React from 'react';
import { Col, Row } from 'antd';
import { HorizontalCard } from './horizontalCard';

const isMobile = window.innerWidth < 768;

export const TopTracks = ({ setColor }) => {
  const topTracks = [
    {
      id: '1',
      name: 'Mock Song 1',
      uri: 'spotify:track:1',
      album: {
        id: 'album1',
        images: [{ url: 'https://via.placeholder.com/300' }]
      }
    },
    {
      id: '2',
      name: 'Mock Song 2',
      uri: 'spotify:track:2',
      album: {
        id: 'album2',
        images: [{ url: 'https://via.placeholder.com/300' }]
      }
    },
    {
      id: '3',
      name: 'Mock Song 3',
      uri: 'spotify:track:3',
      album: {
        id: 'album3',
        images: [{ url: 'https://via.placeholder.com/300' }]
      }
    },
    {
      id: '4',
      name: 'Mock Song 4',
      uri: 'spotify:track:4',
      album: {
        id: 'album4',
        images: [{ url: 'https://via.placeholder.com/300' }]
      }
    }
  ];

  return (
    <Row
      gutter={[16, 16]}
      style={{ margin: '20px 0px', marginTop: isMobile ? 20 : 70 }}
      justify="space-between"
    >
      {topTracks.map((item) => (
        <Col key={item.id} xs={24} md={12} lg={6}>
          <HorizontalCard item={item} setColor={setColor} />
        </Col>
      ))}
    </Row>
  );
};

