import React, { useMemo } from 'react';
import { Col } from 'antd';
import { LibraryTitle } from '../Title';
import { ListItemComponent } from './ListCards';
import { CompactItemComponent } from './CompactCards';
import { LibraryFilters, SearchArea } from '../Filters';
import { GridItemComponent } from '../../../../Lists/list';
import useIsMobile from '../../../../../utils/isMobile';
import { LanguageButton } from '../Language';
import { LibraryLoginInfo } from './loginInfo';

// Redux
import { useAppSelector } from '../../../../../store/store';
import { getLibraryCollapsed } from '../../../../../store/slices/ui';

const COLLAPSED_STYLE = {
  overflowY: 'scroll',
  height: '100%',
};

const YourLibrary = () => {
  const collapsed = useAppSelector(getLibraryCollapsed);
  const user = true; // bạn có thể gắn useAppSelector nếu có auth store
  const activeOnOtherDevice = false;

  const heightValue = useMemo(() => {
    let value = 310;
    if (collapsed) value = 218;
    if (activeOnOtherDevice) value += 50;
    return value;
  }, [collapsed, activeOnOtherDevice]);

  return (
    <div className={`Navigation-section library ${!collapsed ? 'open' : ''}`}>
      <LibraryTitle />
      {!collapsed && user ? <LibraryFilters /> : null}

      <div className="library-list-container">
        <Col style={collapsed ? {} : COLLAPSED_STYLE}>
          <div
            className="library-list"
            style={{
              overflowY: 'scroll',
              overflowX: 'hidden',
              height: `calc(100vh - ${heightValue}px)`,
            }}
          >
            {!user ? <AnonymousContent /> : <LoggedContent collapsed={collapsed} />}
          </div>

          {!user ? (
            <div style={{ marginLeft: 10 }}>
              <LanguageButton />
            </div>
          ) : null}
        </Col>
      </div>
    </div>
  );
};

const AnonymousContent = () => <LibraryLoginInfo />;

const LoggedContent = ({ collapsed }) => {
  const isMobile = useIsMobile();

  // ✅ MOCK data thư viện
  const items = [
    {
      id: '1',
      type: 'playlist',
      name: 'Mock Playlist',
      images: [{ url: 'https://via.placeholder.com/300' }],
    },
    {
      id: '2',
      type: 'album',
      name: 'Mock Album',
      images: [{ url: 'https://via.placeholder.com/300' }],
    },
  ];

  const view = 'GRID'; // hoặc 'LIST' / 'COMPACT'

  return (
    <>
      {!collapsed && <SearchArea />}
      <div
        className={`${collapsed ? 'collapsed' : ''} ${
          !collapsed && view === 'GRID' ? 'grid-view' : ''
        }`}
      >
        {items.map((item) => {
          if (collapsed) return <ListItemComponent key={item.id} item={item} />;

          return (
            <div key={item.id} onClick={isMobile ? () => console.log('collapse') : undefined}>
              {view === 'LIST' && <ListItemComponent item={item} />}
              {view === 'COMPACT' && <CompactItemComponent item={item} />}
              {view === 'GRID' && <GridItemComponent item={item} />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default YourLibrary;
