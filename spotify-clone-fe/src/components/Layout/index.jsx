import React, { memo, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { Navbar } from './components/Navbar';
import { Library } from './components/Library';
import PlayingBar from './components/PlayingBar';
import PlayingNow from './components/NowPlaying';
import LanguageModal from '../Modals/LanguageModal';
import LibraryDrawer from '../Drawers/LibraryDrawer';
import { PlayingNowDrawer } from '../Drawers/PlayingNowDrawer';
import EditPlaylistModal from '../Modals/EditPlaylistModal';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import useIsMobile from '../../utils/isMobile';

// Redux
import { useAppSelector } from '../../store/store';
import { getLibraryCollapsed, isRightLayoutOpen } from '../../store/slices/ui';

const AppLayout = memo(({ children }) => {
  const user = true;
  const isMobile = useIsMobile();

  const libraryCollapsed = useAppSelector(getLibraryCollapsed);
  const rightLayoutOpen = useAppSelector(isRightLayoutOpen);

  const hasState = true;
  const activeOnOtherDevice = false;

  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      setIsTablet(vw < 950);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // init

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* Modals & Drawers */}
      {/* <LanguageModal />
      <LibraryDrawer />
      <PlayingNowDrawer />
      <EditPlaylistModal /> */}

      {/* Main Layout */}
      <div className="main-container">
        <Row
          wrap
          justify="end"
          gutter={[8, 8]}
          style={{
            overflow: 'hidden',
            height: `calc(100vh - ${
              activeOnOtherDevice ? '141' : !user && isMobile ? '0' : '105'
            }px)`,
          }}
        >
          <Col span={24}>
            <Navbar />
          </Col>

          <Col
            span={24}
            style={{
              maxHeight: activeOnOtherDevice ? `calc(100vh - 185px)` : undefined,
            }}
          >
            <PanelGroup direction="horizontal">
              <Panel
                id="left"
                order={1}
                className="mobile-hidden"
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

              {!isMobile && <PanelResizeHandle className="resize-handler" />}

              <Panel id="center" order={2} style={{ borderRadius: 5 }}>
                {children}
              </Panel>

              {!isTablet && rightLayoutOpen && hasState && (
                <PanelResizeHandle className="resize-handler" />
              )}

              {rightLayoutOpen && hasState && (
                <Panel
                  order={3}
                  minSize={23}
                  maxSize={30}
                  defaultSize={25}
                  id="details-section"
                  style={{ borderRadius: 5 }}
                >
                  <PlayingNow />
                </Panel>
              )}
            </PanelGroup>
          </Col>
        </Row>
      </div>

      <footer>{user ? <PlayingBar /> : null}</footer>
    </>
  );
});

export default AppLayout;
