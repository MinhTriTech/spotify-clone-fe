import { Col, Row, Space } from 'antd';

import { PlayCircleButton } from './playCircle';

export const PlaylistControls = () => {
  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space align='center'>
            <PlayCircleButton />
          </Space>
        </Col>
      </Row>
    </div>
  );
};
