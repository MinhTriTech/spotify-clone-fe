import { Col, Row, Space } from 'antd';

import { PlayCircleButton } from './playCircle';
import { AddPlaylistToLibraryButton } from './AddPlaylistToLibrary';

import { useAppDispatch, useAppSelector } from '../../../store/store';

const PlaylistControls = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const playlist = useAppSelector((state) => state.playlist.playlist);

  const isMine = playlist?.owner?.id === user?.id;

  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space align='center'>
            <PlayCircleButton />

            {!isMine ? (
              <div className='scale' style={{ marginRight: 10 }}>
                <AddPlaylistToLibraryButton id={playlist?.id} />
              </div>
            ) : null}
          </Space>
        </Col>
        <Col>
          <Space className='mobile-hidden'>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default PlaylistControls;
