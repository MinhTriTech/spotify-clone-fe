import { Col, Dropdown, Row, Space } from 'antd';
import { memo } from 'react';

// Components
import { PlayCircleButton } from './playCircle';
import { Tooltip } from '../../../../components/Tooltip';
import { AddAlbumToLibraryButton } from './AddAlbumToLibrary';
import { MenuDots, OrderListIcon } from '../../../../components/Icons';
import AlbumActionsWrapper from '../../../../components/Actions/AlbumActions';

// Redux
import { albumActions } from '../../../../store/slices/album';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const filters = ['LIST', 'COMPACT'];

const ViewSection = memo(() => {
  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => state.album.view);

  const items = filters.map((filter) => ({
    key: filter,
    label: filter, // Dùng trực tiếp tên filter
    onClick: () => dispatch(albumActions.setView({ view: filter })),
  }));

  return (
    <Space className='mobile-hidden'>
      <Tooltip title="View">
        <Dropdown placement='bottomRight' menu={{ items, selectedKeys: [view] }}>
          <button className='order-button'>
            <Space align='center'>
              <span>{view}</span>
              <OrderListIcon />
            </Space>
          </button>
        </Dropdown>
      </Tooltip>
    </Space>
  );
});

const MenuSection = memo(() => {
  const album = useAppSelector((state) => state.album.album);

  return (
    <AlbumActionsWrapper album={album} trigger={['click']}>
      <Tooltip title={`More options for ${album?.name}`}>
        <div className='scale'>
          <MenuDots />
        </div>
      </Tooltip>
    </AlbumActionsWrapper>
  );
});

export const AlbumControls = () => {
  const album = useAppSelector((state) => state.album.album);

  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space align='center'>
            <PlayCircleButton />
            <div className='scale' style={{ marginRight: 10 }}>
              <AddAlbumToLibraryButton id={album?.id} />
            </div>
            <MenuSection />
          </Space>
        </Col>
        <Col>
          <ViewSection />
        </Col>
      </Row>
    </div>
  );
};
