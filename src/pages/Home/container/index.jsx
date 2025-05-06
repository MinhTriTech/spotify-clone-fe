import { Col, Row } from 'antd';
import { TopTracks } from '../components/topTracks';
import { FeaturePlaylists } from '../components/featurePlaylists';
import { FavouriteArtists } from '../components/favouriteArtists';

import { memo, useRef, useState } from 'react';
import { useAppSelector } from '../../../store/store';
import useIsMobile from '../../../utils/isMobile';

const HomePageContainer = memo((props) => {
  const [color, setColor] = useState('rgb(66, 32, 35)');

  const isMobile = useIsMobile();
  const sectionContainerRef = useRef(null);
  const user = useAppSelector((state) => !!state.auth.user);

  return (
    <div ref={sectionContainerRef}>
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

          <Col span={24}>
            <FeaturePlaylists />
          </Col>

          <Col span={24}>
            <FavouriteArtists />
          </Col>
        </Row>
      </div>
    </div>
  );
});

export default HomePageContainer;
