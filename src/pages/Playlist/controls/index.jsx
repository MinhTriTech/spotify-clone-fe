import { Col, Dropdown, Row, Space } from 'antd';

import { PlayCircleButton } from './playCircle';
import { Tooltip } from '../../../components/Tooltip';
import { MenuDots, OrderCompactIcon, OrderListIcon } from '../../../components/Icons';
import { AddPlaylistToLibraryButton } from './AddPlaylistToLibrary';
import PlayistActionsWrapper from '../../../components/Actions/PlaylistActions';

// Redux
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { playlistActions, refreshPlaylist } from '../../../store/slices/playlist';

const filters = ['LIST', 'COMPACT'];

const filterLabels = {
  LIST: 'Danh sách',
  COMPACT: 'Thu gọn',
  'More options for': 'Tùy chọn khác cho',
  VIEW: 'Chế độ xem',
};

const PlaylistControls = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const view = useAppSelector((state) => state.playlist.view);
  const playlist = useAppSelector((state) => state.playlist.playlist);

  const isMine = playlist?.owner?.id === user?.id;

  const items = filters.map((filter) => ({
    key: filter,
    label: filterLabels[filter],
    onClick: () => dispatch(playlistActions.setView({ view: filter })),
  }));

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

            <PlayistActionsWrapper
              playlist={playlist}
              trigger={['click']}
              onRefresh={() => {
                dispatch(refreshPlaylist(playlist?.id));
              }}
            >
              <Tooltip title={`${filterLabels['More options for']} ${playlist?.name}`}>
                <div className='scale'>
                  <MenuDots />
                </div>
              </Tooltip>
            </PlayistActionsWrapper>
          </Space>
        </Col>
        <Col>
          <Space className='mobile-hidden'>
            <Tooltip title={filterLabels.VIEW}>
              <Dropdown placement='bottomRight' menu={{ items, selectedKeys: [view] }}>
                <button className='order-button'>
                  <Space align='center'>
                    <span>{filterLabels[view]}</span>
                    {view === 'LIST' ? <OrderListIcon /> : <OrderCompactIcon />}
                  </Space>
                </button>
              </Dropdown>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default PlaylistControls;
