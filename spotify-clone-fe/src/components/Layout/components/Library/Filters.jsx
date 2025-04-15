import { memo, useMemo, useState } from 'react';
import Chip from '../../../Chip';
import { Dropdown, Flex, Space } from 'antd';
import {
  CloseIcon2,
  GridIcon,
  OrderCompactIcon,
  OrderListIcon,
  SearchIcon,
} from '../../../Icons';

const t = (s) => s;
const VIEW = ['COMPACT', 'LIST', 'GRID'];

const SearchSelector = memo(() => {
  return (
    <button className="addButton">
      <SearchIcon style={{ height: '1rem' }} />
    </button>
  );
});

const ViewSelector = memo(() => {
  const [view, setView] = useState('GRID');

  const items = VIEW.map((v) => ({
    key: v,
    label: t(v),
    onClick: () => {
      console.log('Mock setView:', v);
      setView(v);
    },
  }));

  return (
    <Dropdown
      placement="bottomRight"
      className="viewSelector"
      menu={{ items, selectedKeys: [view] }}
      trigger={['click']}
    >
      <button className="order-button">
        <Space align="center">
          <span>{t(view)}</span>
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
    <Flex align="center" justify="space-between" style={{ margin: '0px 10px', marginBottom: 10 }}>
      <SearchSelector />
      <ViewSelector />
    </Flex>
  );
};

const TypeSelector = memo(() => {
  const [filter, setFilter] = useState('ALL');

  // ✅ Mock dữ liệu thư viện
  const hasAlbums = true;
  const hasArtists = true;
  const hasPlaylists = true;

  const onClick = (f) => {
    console.log('Mock setFilter:', f);
    setFilter(f);
  };

  const items = useMemo(() => {
    const data = [];
    if (hasPlaylists) data.push({ text: 'Playlists', type: 'PLAYLISTS' });
    if (hasArtists) data.push({ text: 'Artists', type: 'ARTISTS' });
    if (hasAlbums) data.push({ text: 'Albums', type: 'ALBUMS' });
    return data;
  }, [hasAlbums, hasArtists, hasPlaylists]);

  if (!hasAlbums && !hasArtists && !hasPlaylists) return null;

  return (
    <Space>
      {filter !== 'ALL' && (
        <Chip key="close" text={<CloseIcon2 />} onClick={() => onClick('ALL')} />
      )}

      {items.map(({ text, type }) => {
        if (filter === 'ALL' || type === filter) {
          return (
            <Chip
              key={text}
              text={t(text)}
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
