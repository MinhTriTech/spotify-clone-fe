import { Col, Row } from 'antd';

import PlaylistsSearchSection from '../components/playlists';

const SearchPlaylistPageContainer = (props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <PlaylistsSearchSection />
      </Col>
    </Row>
  );
};

export default SearchPlaylistPageContainer;
