import { Col, Row } from 'antd';
import UsersSearchSection from '../components/users';

const SearchUsersPageContainer = (props) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <UsersSearchSection />
      </Col>
    </Row>
  );
};

export default SearchUsersPageContainer;
