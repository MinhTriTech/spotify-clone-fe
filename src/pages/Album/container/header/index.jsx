import { Col, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { AlbumTableHeader } from '../table/header';
import { PlayCircleButton } from '../../components/controls/playCircle';
import ArtistActionsWrapper from '../../../../components/Actions/ArtistActions';

import { useAppSelector } from '../../../../store/store';
import { isRightLayoutOpen } from '../../../../store/slices/ui';

import dayjs from 'dayjs';
import tinycolor from 'tinycolor2';

import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';

import { useEffect, useState, useRef } from 'react';

export const AlbumHeader = ({ container, sectionContainer, color }) => {
  const album = useAppSelector((state) => state.album.album);
  const tracks = useAppSelector((state) => state.album.tracks);
  const artist = useAppSelector((state) => state.artist.artist);
  
  const [headerWidth, setHeaderWidth] = useState(0);
  const [activeTable, setActiveTable] = useState(false);
  const [activeHeader, setActiveHeader] = useState(false);

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
        background: `linear-gradient(180deg, transparent 0px, ${color} 100%), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=")`,
      }}
    >
      <div
        className={`nav-header ${activeHeader ? 'active' : ''}`}
        style={{
          minHeight: 36,
          width: headerWidth,
          backgroundColor: !activeHeader
            ? 'transparent'
            : tinycolor(color).darken(10).toRgbString(),
        }}
      >
        <div className='nav-header-content' style={{ opacity: !activeHeader ? 0 : 1 }}>
          <Space>
            <PlayCircleButton size={20} />
            <h1 className='nav-header-playlist-title'>{album?.title}</h1>
          </Space>
          <div
            style={{ padding: '0px 20px', opacity: !activeTable ? 0 : 1 }}
            className={`nav-bar-header-table-container ${activeTable ? 'active' : ''}`}
          >
            <AlbumTableHeader />
          </div>
        </div>
      </div>

      <div style={{ padding: 30, paddingTop: 30 }}>
        <Row gutter={[24, 24]} align={'middle'}>
          <Col xs={24} sm={6} lg={5}>
            <div>
              <img src={album?.image} alt={album?.title} className='playlist-img' />
            </div>
          </Col>
          <Col xs={24} sm={18} lg={19}>
            <Row justify='space-between'>
              <Col span={24}>
                <p className='text-white'>Album</p>
                <h1 className='playlist-title'>{album?.title}</h1>
              </Col>
              <Col span={24}>
                <Space className='owner'>
                  {artist ? (
                    <Link to={`/artist/${artist.artist_id}`}>
                      <img
                        id='user-avatar'
                        alt='User Avatar'
                        className='playlist-avatar'
                        src={artist.image || ARTISTS_DEFAULT_IMAGE}
                      />
                    </Link>
                  ) : null}

                  <h3 className='text-sm font-semibold text-white'>
                    {artist ? (
                      <ArtistActionsWrapper artist={artist} trigger={['contextMenu']}>
                        <Link to={`/artist/${artist.artist_id}`} className='link-text'>
                          {artist.name}
                        </Link>
                      </ArtistActionsWrapper>
                    ) : (
                      ''
                    )}
                    <span className='songs-number'>
                      {' '}
                      • {dayjs(album?.created_at).format('YYYY')} • {tracks?.length}{' '}
                      {tracks?.length === 1 ? 'song' : 'songs'},{' '}
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
