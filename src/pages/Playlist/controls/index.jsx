import { Col, Row, Space } from 'antd';

import { PlayCircleButton } from './playCircle';

import { Tooltip } from '../../../components/Tooltip';

import { useAppDispatch, useAppSelector } from '../../../store/store';

import { MenuDots } from '../../../components/Icons';

import {PlayListActionsWrapper} from '../../../components/Actions/PlaylistActions';

const PlaylistControls = () => {
  const dispatch = useAppDispatch();

  const playlist = useAppSelector((state) => state.playlist.playlist);
  const canEdit = useAppSelector((state) => state.playlist.canEdit);
  
  const isMine = canEdit;

  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space align='center'>
            <PlayCircleButton />

            {isMine ? (
              <PlayListActionsWrapper
                playlist={playlist}
                trigger={['click']}
                onRefresh={() => {
                  dispatch(refreshPlaylist(playlist.id));
                }}
              >
                <Tooltip title={`Tùy chọn khác cho ${playlist?.title}`}>
                  <div className="scale">
                    <MenuDots />
                  </div>
                </Tooltip>
              </PlayListActionsWrapper>
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
