import { Col, Row } from 'antd';

import SongsSearchSection from '../components/songs';

const SearchSongsPageContainer = (props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SongsSearchSection query={props.query} />
      </Col>
    </Row>
  );
};

export default SearchSongsPageContainer;
