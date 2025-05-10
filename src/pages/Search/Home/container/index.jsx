import { Col, Row } from 'antd';

import { SearchedSongs } from '../components/songs';
import { AlbumsSearchSection } from '../components/albums';
import { ArtistsSearchSection } from '../components/artists';
import { PlaylistsSearchSection } from '../components/playlists';
import { UsersSearchSection } from '../components/users';

export const SearchPageContainer = (props) => {
  return (
    <Row gutter={[16, 16]} style={{ paddingBottom: 20 }}>
      <Col span={24} lg={15}>
        <SearchedSongs />
      </Col>

      <Col span={24}>
        <ArtistsSearchSection />
      </Col>

      <Col span={24}>
        <AlbumsSearchSection />
      </Col>

      <Col span={24}>
        <PlaylistsSearchSection />
      </Col>

      <Col span={24}>
        <UsersSearchSection />
      </Col>
    </Row>
  );
};

export default SearchPageContainer;
