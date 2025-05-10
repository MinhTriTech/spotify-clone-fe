import { Col, Row } from 'antd';
import ArtistsSearchSection from '../components/artists';

const SearchArtistsPageContainer = (props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <ArtistsSearchSection />
      </Col>
    </Row>
  );
};

export default SearchArtistsPageContainer;
