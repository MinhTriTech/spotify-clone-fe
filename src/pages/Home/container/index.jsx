// Components
import { Col, Row } from 'antd';
import { HomeHeader } from './header';
import { TopTracks } from '../components/topTracks';
import { MadeForYou } from '../components/madeForYou';
import { NewReleases } from '../components/newReleases';
import { FeaturePlaylists } from '../components/featurePlaylists';
import { RecentlyPlayed } from '../components/recentlyPlayed';
import { TopMixes } from '../components/topMixes';
import { Rankings } from '../components/rankings';
import { Trending } from '../components/trending';
import { FavouriteArtists } from '../components/favouriteArtists';
import { YourPlaylists } from '../components/yourPlaylists';

// Utils
import { memo, useRef, useState } from 'react';
import { useAppSelector } from '../../../store/store';
import useIsMobile from '../../../utils/isMobile';

const HomePageContainer = memo((props) => {
  const { container } = props;
  const [color, setColor] = useState('rgb(66, 32, 35)');

  const isMobile = useIsMobile();
  const sectionContainerRef = useRef(null);
  // const user = useAppSelector((state) => !!state.auth.user);
  const user = true;
  const section = useAppSelector((state) => state.home.section);

  return (
    <div ref={sectionContainerRef}>
      <HomeHeader color={color} container={container} sectionContainer={sectionContainerRef} />
      <div
        className="Home-seccion"
        style={{
          paddingTop: isMobile ? 50 : 0,
          transition: 'background 5s',
          background: `linear-gradient(180deg, ${color} 2%, rgb(18, 18, 18) 18%)`,
        }}
      >
        <Row gutter={user ? [16, 16] : undefined}>
          {user && (
            <Col span={24}>
              <TopTracks setColor={setColor} />
            </Col>
          )}

          {user && (
            <Col span={24}>
              <MadeForYou />
            </Col>
          )}

          {user && (
            <Col span={24}>
              <TopMixes />
            </Col>
          )}

          {user && section === 'ALL' && (
            <Col span={24}>
              <RecentlyPlayed />
            </Col>
          )}

          <Col span={24}>
            <FeaturePlaylists />
          </Col>

          {user && (
            <Col span={24}>
              <YourPlaylists />
            </Col>
          )}

          <Col span={24}>
            <NewReleases />
          </Col>

          {(!user || section === 'MUSIC') && (
            <Col span={24}>
              <Rankings />
            </Col>
          )}

          {(!user || section === 'MUSIC') && (
            <Col span={24}>
              <Trending />
            </Col>
          )}

          {user && section === 'ALL' && (
            <Col span={24}>
              <FavouriteArtists />
            </Col>
          )}
        </Row>
      </div>
    </div>
  );
});

export default HomePageContainer;
