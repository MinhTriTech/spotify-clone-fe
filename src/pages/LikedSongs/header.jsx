import { Col, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { PlaylistTableHeader } from './table/header';
import { PlayCircleButton } from './controls/playCircle';
import { ARTISTS_DEFAULT_IMAGE, EQUILISER_IMAGE } from '../../constants/spotify';

import { use, useEffect, useRef, useState } from 'react';

import { LIKED_SONGS_IMAGE } from '../../constants/spotify';

import tinycolor from 'tinycolor2';

import { useAppSelector } from '../../store/store';
import { isRightLayoutOpen } from '../../store/slices/ui';

export const LikedSongsHeader = ({
  container,
  color,
  sectionContainer,
}) => {
  const user = useAppSelector((state) => state.auth.user);
  
  const total = useAppSelector((state) => state.likedSongs.items);

  const [headerWidth, setHeaderWidth] = useState(0);
  const [activeHeader, setActiveHeader] = useState(false);
  const [activeTable, setActiveTable] = useState(false);

  const rightLayoutOpen = useAppSelector(isRightLayoutOpen);
  const libraryCollapsed = useAppSelector((state) => state.ui.libraryCollapsed);

  useEffect(() => {
    const ref = container.current;
    const handleScroll = () => {
      if (ref) {
        setActiveHeader(ref.scrollTop > 260);
        setActiveTable(ref.scrollTop > 320);
      }
    };
    ref?.addEventListener('scroll', handleScroll);
    return () => {
      window.onresize = null;
      ref?.removeEventListener('scroll', handleScroll);
    };
  }, [container]);

  useEffect(() => {
    const ref = sectionContainer?.current;
    if (ref) {
      const observer = new ResizeObserver((entries) => {
        setHeaderWidth(entries[0].contentRect.width);
      });
      observer.observe(ref);
      return () => ref && observer.unobserve(ref);
    }
  }, [sectionContainer, rightLayoutOpen, libraryCollapsed]);

  return (
    <div
      style={{
        overflow: 'auto',
        position: 'relative',
        background: `linear-gradient(180deg, transparent 0px, ${color} 100%), url("data:image/svg+xml;base64,...")`,
      }}
    >
      <div
        className={`nav-header ${activeHeader ? 'active' : ''}`}
        style={{
          width: headerWidth,
          opacity: !activeHeader ? 0 : 1,
          backgroundColor: !activeHeader
            ? 'transparent'
            : tinycolor(color).darken(10).toRgbString(),
        }}
      >
        <Space>
          <PlayCircleButton size={20} />
          <h1 className='nav-header-playlist-title'>Bài hát đã thích</h1>
        </Space>
        <div
          style={{ padding: '0px 20px', opacity: !activeTable ? 0 : 1 }}
          className={`nav-bar-header-table-container ${activeTable ? 'active' : ''}`}
        >
          <PlaylistTableHeader />
        </div>
      </div>

      <div style={{ padding: 30, paddingTop: 30 }}>
        <Row gutter={[24, 24]} align={'middle'}>
          <Col xs={24} sm={6} lg={5}>
            <div>
              <img src={LIKED_SONGS_IMAGE} alt='Hình ảnh bài hát đã thích' className='playlist-img' />
            </div>
          </Col>

          <Col xs={24} sm={18} lg={19}>
            <Row justify='space-between'>
              <Col span={24}>
                <p className='text-white'>Danh sách phát</p>
                <div>
                  <h1 className='playlist-title'>Bài hát đã thích</h1>
                </div>
              </Col>

              <Col span={24}>
                <Space className='owner'>
                    <Link to='/profile'>
                      <img
                        id='user-avatar'
                        alt='Ảnh đại diện người dùng'
                        src={ARTISTS_DEFAULT_IMAGE}
                        className='playlist-avatar'
                      />
                    </Link>

                  <h3 className='text-sm font-semibold text-white'>
                    <Link to='/profile' className='link-text'>
                      {user?.user_info.username}
                    </Link>

                    <span className='songs-number'>
                      {total ? ` • ${total.length} ${total.length === 1 ? 'bài hát' : 'bài hát'}` : ' '}
                    </span>
                  </h3>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};
