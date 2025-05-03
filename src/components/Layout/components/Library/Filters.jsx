import { memo, useMemo } from 'react';

import Chip from '../../../Chip';
import { Dropdown, Flex, Space } from 'antd';
import { CloseIcon2, GridIcon, OrderCompactIcon, OrderListIcon, SearchIcon } from '../../../Icons';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';

const VIEW = ['COMPACT', 'LIST', 'GRID'];

const viewLabels = {
  COMPACT: 'Gọn nhẹ',
  LIST: 'Danh sách',
  GRID: 'Lưới',
};

const SearchSelector = memo(() => {
  return (
    <button className='addButton'>
      <SearchIcon style={{ height: '1rem' }} />
    </button>
  );
});

const ViewSelector = memo(() => {
  const dispatch = useAppDispatch();
  const view = useAppSelector((state) => state.yourLibrary.view);

  const items = VIEW.map((viewKey) => ({
    key: viewKey,
    label: viewLabels[viewKey],
    onClick: () => {
      dispatch(yourLibraryActions.setView({ view: viewKey }));
    },
  }));

  return (
    <Dropdown
      placement='bottomRight'
      className='viewSelector'
      menu={{ items, selectedKeys: [view] }}
      trigger={['click']}
    >
      <button className='order-button'>
        <Space align='center'>
          <span>{viewLabels[view]}</span>
          {view === 'GRID' && <GridIcon style={{ height: '1rem' }} />}
          {view === 'LIST' && <OrderListIcon style={{ height: '1rem' }} />}
          {view === 'COMPACT' && <OrderCompactIcon style={{ height: '1rem' }} />}
        </Space>
      </button>
    </Dropdown>
  );
});

export const SearchArea = () => {
  return (
    <Flex align='center' justify='space-between' style={{ margin: '0px 10px', marginBottom: 10 }}>
      <SearchSelector />
      <ViewSelector />
    </Flex>
  );
};

const TypeSelector = memo(() => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector((state) => state.yourLibrary.filter);

  const hasArtists = useAppSelector((state) => state.yourLibrary.myArtists.length > 0);
  const hasPlaylists = useAppSelector((state) => state.yourLibrary.myPlaylists.length > 0);

  const onClick = (filterType) => {
    dispatch(yourLibraryActions.setFilter({ filter: filterType }));
  };

  const items = useMemo(() => {
    const data = [];
    if (hasPlaylists) data.push({ text: 'Danh sách phát', type: 'PLAYLISTS' });
    if (hasArtists) data.push({ text: 'Nghệ sĩ', type: 'ARTISTS' });
    return data;
  }, [hasArtists, hasPlaylists]);

  if (!hasArtists && !hasPlaylists) return null;

  return (
    <Space>
      {filter !== 'ALL' && (
        <Chip key='close' text={<CloseIcon2 />} onClick={() => onClick('ALL')} />
      )}

      {items.map(({ text, type }) => {
        if (filter === 'ALL' || type === filter) {
          return (
            <Chip
              key={text}
              text={text}
              active={filter === type}
              onClick={() => onClick(type)}
            />
          );
        }
        return null;
      })}
    </Space>
  );
});

export const LibraryFilters = () => {
  return (
    <div>
      <div>
        <TypeSelector />
      </div>
    </div>
  );
};
