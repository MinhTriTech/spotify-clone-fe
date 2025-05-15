import { Col, Row, Space } from 'antd';

import { PlayCircleButton } from './playCircle';
import { useAppSelector } from '../../../../store/store';

export const AlbumControls = () => {
  const album = useAppSelector((state) => state.album.album);

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
