// Components
import { Col, Row, Space } from 'antd';
import { Link } from 'react-router-dom';
import { PlaylistTableHeader } from './table/header';
import { PlayCircleButton } from './controls/playCircle';
import { editPlaylistModalActions } from '../../store/slices/editPlaylistModal';

// React
import { useEffect, useMemo, useState, useRef } from 'react';

// Constants
import { ARTISTS_DEFAULT_IMAGE, PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';

// Utils
import tinycolor from 'tinycolor2';
import { getPlaylistDescription } from '../../utils/getDescription';

// Redux
import { isRightLayoutOpen } from '../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../store/store';

const PlaylistHeader = ({ container, color, sectionContainer }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const owner = useAppSelector((state) => state.playlist.user);
  const playlist = useAppSelector((state) => state.playlist.playlist);
  const tracks = useAppSelector((state) => state.playlist.tracks);

  const isMine = user?.id === owner?.id;

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
  }, [sectionContainer, libraryCollapsed, rightLayoutOpen]);

  return (
    <div
      style={{
        overflow: 'auto',
        position: 'relative',
        background: `linear-gradient(180deg, transparent 0px, ${color} 100%), url("data:image/svg+xml;base64,PHN2ZyB...")`,
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
        <div
          className='nav-header-content'
          style={{
            opacity: !activeHeader ? 0 : 1,
          }}
        >
          <Space>
            <PlayCircleButton size={20} />
            <h1 className='nav-header-playlist-title'>{playlist?.name}</h1>
          </Space>
          <div
            style={{ padding: '0px 20px' }}
            className={`nav-bar-header-table-container ${activeTable ? 'active' : ''}`}
          >
            <PlaylistTableHeader />
          </div>
        </div>
      </div>

      <div style={{ padding: 30, paddingTop: 30 }}>
        <Row gutter={[24, 24]} align={'middle'}>
          <Col xs={24} sm={6} lg={5}>
            <div>
              {isMine ? (
                <div className='playlist-img-overlay'>
                  <div className='playlist-img-overlay-container'>
                    <button
                      type='button'
                      aria-haspopup='true'
                      onClick={() => dispatch(editPlaylistModalActions.setPlaylist({ playlist }))}
                    >
                      <div className='icon'>
                        <svg
                          role='img'
                          height={50}
                          width={50}
                          aria-hidden='true'
                          viewBox='0 0 24 24'
                          style={{ margin: '0 auto' }}
                        >
                          <path d='M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z'></path>
                        </svg>
                        <span>Choose photo</span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : null}
              <img
                src={
                  playlist?.images?.length
                    ? playlist.images[0].url
                    : PLAYLIST_DEFAULT_IMAGE
                }
                alt=''
                className='playlist-img'
              />
            </div>
          </Col>
          <Col xs={24} sm={18} lg={19}>
            <Row justify='space-between'>
              <Col span={24}>
                <p className='text-white'>
                  {playlist?.public ? 'Playlist' : 'Private Playlist'}
                </p>
                <div
                  className={isMine ? 'pointer' : ''}
                  onClick={() => {
                    if (isMine) dispatch(editPlaylistModalActions.setPlaylist({ playlist }));
                  }}
                >
                  <h1 className='playlist-title'>{playlist?.name}</h1>
                  <p className='playlist-description'>{getPlaylistDescription(playlist)}</p>
                </div>
              </Col>
              <Col span={24}>
                <Space className='owner'>
                  {owner?.images?.length ? (
                    <Link to={`/users/${owner.id}`}>
                      <img
                        className='playlist-avatar'
                        id='user-avatar'
                        alt='User Avatar'
                        src={
                          owner.images.length
                            ? owner.images[0].url
                            : ARTISTS_DEFAULT_IMAGE
                        }
                      />
                    </Link>
                  ) : null}
                  <h3 className='text-sm font-semibold text-white'>
                    {owner ? (
                      owner.display_name === 'Spotify' ? (
                        <span className='link-text'>{owner.display_name}</span>
                      ) : (
                        <Link to='/' className='link-text'>
                          {owner.display_name}
                        </Link>
                      )
                    ) : (
                      ''
                    )}
                    <span className='songs-number'>
                      {playlist?.followers?.total
                        ? ` • ${playlist.followers.total} saves`
                        : ''}
                      {playlist?.tracks?.total
                        ? ` • ${playlist.tracks.total} ${
                            playlist.tracks.total === 1 ? 'song' : 'songs'
                          }`
                        : ''}
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

export default PlaylistHeader;
