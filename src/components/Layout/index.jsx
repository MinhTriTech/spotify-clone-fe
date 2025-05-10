import { memo, useEffect, useState } from 'react';

import { Col, Row } from 'antd';
import { Navbar } from './components/Navbar';
import { Library } from './components/Library';
import PlayingBar from './components/PlayingBar';
import {LibraryDrawer} from '../Drawers/LibraryDrawer';
import { EditPlaylistModal } from '../Modals/EditPlaylistModal';
import { DeletePlaylistModal } from '../Modals/DeletePlaylistModal';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { getLibraryCollapsed, uiActions } from '../../store/slices/ui';
import { LoginFooter } from './components/LoginFooter';
import LoginModal from '../Modals/LoginModal';

const AppLayout = memo((props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);
  const libraryCollapsed = useAppSelector(getLibraryCollapsed);

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    window.onresize = () => {
      const vh = window.innerWidth;
      if (vh < 950) {
        dispatch(uiActions.collapseLibrary());
        setIsTablet(true);
      } else {
        setIsTablet(false);
      }
    };
    return () => {
      window.onresize = null;
    };
  }, [dispatch]);

  return (
    <>
      <LibraryDrawer />
      <EditPlaylistModal />
      <DeletePlaylistModal />
      <LoginModal />

      <div className='main-container'>
        <Row
          wrap
          justify='end'
          gutter={[8, 8]}
          style={{
            overflow: 'hidden',
            height: `calc(100vh - ${
              '105'
            }px)`,
          }}
        >
          <Col span={24}>
            <Navbar />
          </Col>

          <Col
            span={24}
            style={{
              maxHeight: undefined,
            }}
          >
            <PanelGroup direction='horizontal' autoSaveId='persistence'>
              <Panel
                id='left'
                order={1}
                className='mobile-hidden'
                minSize={isTablet ? 10 : libraryCollapsed ? 7 : 22}
                maxSize={isTablet ? 10 : libraryCollapsed ? 8 : 28}
                defaultSize={isTablet ? 10 : libraryCollapsed ? 7 : 22}
                style={{
                  borderRadius: 5,
                  minWidth: libraryCollapsed ? 85 : 280,
                  maxWidth: libraryCollapsed ? 85 : undefined,
                }}
              >
                <Library />
              </Panel>

              <PanelResizeHandle className='resize-handler' />
              <Panel id='center' order={2} style={{ borderRadius: 5 }}>
                {props.children}
              </Panel>
            </PanelGroup>
          </Col>
        </Row>
      </div>

      {<footer>{user ? <PlayingBar /> : <LoginFooter />}</footer>}
    </>
  );
});

AppLayout.displayName = 'AppLayout';

export default AppLayout;
