import { Col, Row } from 'antd';
import AlbumsSearchSection from '../components/albums';

const SearchAlbumsPageContainer = (props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <AlbumsSearchSection />
      </Col>
    </Row>
  );
};

export default SearchAlbumsPageContainer;
