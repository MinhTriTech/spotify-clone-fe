// Components
import { Col } from 'antd';
import { LibraryTitle } from '../Title';
import { ListItemComponent } from './ListCards';
import { CompactItemComponent } from './CompactCards';
import { LibraryFilters, SearchArea } from '../Filters';
import { GridItemComponent } from '../../../../Lists/list';
import { memo, useMemo } from 'react';
import { LibraryLoginInfo } from './loginInfo';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../../store/store';
import { getLibraryItems } from '../../../../../store/slices/yourLibrary';
import { getLibraryCollapsed, uiActions } from '../../../../../store/slices/ui';

// Utils
import useIsMobile from '../../../../../utils/isMobile';

const COLLAPSED_STYLE = {
  overflowY: 'scroll',
  height: '100%',
};

const YourLibrary = () => {
  const collapsed = useAppSelector(getLibraryCollapsed);
  const user = useAppSelector((state) => !!state.auth.user);

  const heightValue = useMemo(() => {
    let value = 310;
    if (!user) value = 270;
    if (collapsed) value = 218;
    return value;
  }, [user, collapsed]);

  return (
    <div className={`Navigation-section library ${!collapsed ? 'open' : ''}`}>
      <LibraryTitle />

      {!collapsed && user ? <LibraryFilters /> : null}

      <div className='library-list-container'>
        <Col style={collapsed ? {} : COLLAPSED_STYLE}>
          <div
            className='library-list'
            style={{
              overflowY: 'scroll',
              overflowX: 'hidden',
              height: `calc(100vh - ${heightValue}px`,
            }}
          >
            {!user ? <AnonymousContent /> : <LoggedContent />}
          </div>
        </Col>
      </div>
    </div>
  );
};

const AnonymousContent = () => {
  return <LibraryLoginInfo />;
};

const getItemKey = (item) => {
  if (item.playlist_id) return `playlist-${item.playlist_id}`;
  if (item.artist_id) return `artist-${item.artist_id}`;
  if (item.id) return `likeSongs-${item.id}`;
  return `unknown-${Math.random()}`; 
};

const LoggedContent = memo(() => {
  const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const items = useAppSelector(getLibraryItems);
  const collapsed = useAppSelector(getLibraryCollapsed);
  const view = useAppSelector((state) => state.yourLibrary.view);
  
  return (
    <>
      {!collapsed ? <SearchArea /> : null}

      <div
        className={`${collapsed ? 'collapsed' : ''} ${
          !collapsed && view === 'GRID' ? 'grid-view' : ''
        }`}
      >
        {items.map((item) => {
        const key = getItemKey(item);

        if (collapsed) {
          return <ListItemComponent key={key} item={item} />;
        }

        return (
          <div
            key={key}
            onClick={isMobile ? () => dispatch(uiActions.collapseLibrary()) : undefined}
          >
            {view === 'LIST' && <ListItemComponent item={item} />}
            {view === 'COMPACT' && <CompactItemComponent item={item} />}
            {view === 'GRID' && <GridItemComponent item={item} />}
          </div>
        );
      })}

      </div>
    </>
  );
});

export default YourLibrary;
