import { memo } from 'react';

// Components
import { Col, Row } from 'antd';
import { NowPlayingLayout } from '../layout';
// ❌ Đã xoá useTranslation
import { CurrentDevice } from './currentDevice';
import DevicesList from './list/deviceList';

export const Devices = memo(() => {
  return (
    <NowPlayingLayout title="Kết nối với thiết bị">
      <div style={{ margin: '20px 10px' }}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <CurrentDevice />
          </Col>

          <Col span={24}>
            <DevicesList />
          </Col>
        </Row>
      </div>
    </NowPlayingLayout>
  );
});
