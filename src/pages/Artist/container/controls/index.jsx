import { Col, Row, Space, Tooltip } from 'antd';

import { PlayCircleButton } from './playCircle';
import { FollowArtistButton } from './followButton';

import { useAppSelector } from '../../../../store/store';

const ArtistControls = () => {
  const artist = useAppSelector((state) => state.artist.artist);

  return (
    <div className="playlist-controls">
      <Row justify="space-between" align="middle">
        <Col>
          <Space align="center">
            <PlayCircleButton />

            <div style={{ marginRight: 10 }}>
              <FollowArtistButton id={artist?.artist_id} />
            </div>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ArtistControls;
