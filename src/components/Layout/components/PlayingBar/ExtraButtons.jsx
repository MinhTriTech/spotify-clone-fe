// Components
import { Col, Row } from 'antd';
import VolumeControls from './Volume';
import { Tooltip } from '../../../Tooltip';
import { FullScreenPlayer } from '../../../FullScreen';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

// Icons
import {
  ExpandIcon,
} from '../../../Icons';

// Redux
import { uiActions } from '../../../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const ExpandButton = () => {
  const handle = useFullScreenHandle();
  const isQueueOpen = useAppSelector((state) => !state.ui.queueCollapsed);

  return (
    <>
      <FullScreen handle={handle}>
        <FullScreenPlayer onExit={handle.exit} />
      </FullScreen>

      <Tooltip title="Toàn màn hình">
        <button
          className="tablet-hidden"
          onClick={handle.enter}
          style={{
            marginRight: 5,
            cursor: isQueueOpen ? 'pointer' : 'not-allowed',
          }}
        >
          <ExpandIcon />
        </button>
      </Tooltip>
    </>
  );
};

const ExtraControlButtons = () => {
  return (
    <div>
      <Row gutter={18} align="middle">
        <Col>
          <VolumeControls />
        </Col>
        <Col>
          <ExpandButton />
        </Col>
      </Row>
    </div>
  );
};

export default ExtraControlButtons;
