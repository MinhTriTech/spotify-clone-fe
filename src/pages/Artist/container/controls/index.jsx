import { Col, Row, Space, Tooltip } from 'antd';

import { PlayCircleButton } from './playCircle';
import { FollowArtistButton } from './followButton';
import { MenuDots } from '../../../../components/Icons';
import { ArtistActionsWrapper } from '../../../../components/Actions/ArtistActions';

// Redux
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
              <FollowArtistButton id={artist?.id} />
            </div>

            <ArtistActionsWrapper artist={artist} trigger={['click']}>
              <Tooltip title={`Tùy chọn khác cho ${artist?.name}`}>
                <div className="scale">
                  <MenuDots />
                </div>
              </Tooltip>
            </ArtistActionsWrapper>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ArtistControls;
