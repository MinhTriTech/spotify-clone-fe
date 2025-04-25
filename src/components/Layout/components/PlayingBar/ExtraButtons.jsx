// Components
import { Col, Row } from 'antd';
import VolumeControls from './Volume';
import { Tooltip } from '../../../Tooltip';
import { FullScreenPlayer } from '../../../FullScreen';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

// Icons
import {
  DetailsIcon,
  DeviceIcon,
  ExpandIcon,
  ListIcon,
  MicrophoneIcon,
  PhoneIcon,
} from '../../../Icons';

// Redux
import { uiActions } from '../../../../store/slices/ui';
import { languageActions } from '../../../../store/slices/language';
import { useAppDispatch, useAppSelector } from '../../../../store/store';

const LyricsButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Tooltip title="Lời bài hát">
      <button
        style={{ marginLeft: 5, marginRight: 5 }}
        onClick={() => dispatch(languageActions.openLanguageModal())}
      >
        <MicrophoneIcon />
      </button>
    </Tooltip>
  );
};

const DetailsButton = () => {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => !state.ui.detailsCollapsed);

  return (
    <Tooltip title="Đang phát">
      <button
        className={active ? 'active-icon-button tablet-hidden' : 'tablet-hidden'}
        onClick={() => dispatch(uiActions.toggleDetails())}
        style={{
          marginLeft: 5,
          marginRight: 10,
          cursor: 'pointer',
        }}
      >
        <DetailsIcon active={active} />
      </button>
    </Tooltip>
  );
};

const QueueButton = () => {
  const dispatch = useAppDispatch();
  const queueCollapsed = useAppSelector((state) => state.ui.queueCollapsed);

  return (
    <Tooltip title="Hàng đợi phát">
      <button
        onClick={() => dispatch(uiActions.toggleQueue())}
        className={!queueCollapsed ? 'active-icon-button' : ''}
        style={{
          marginLeft: 10,
          marginRight: 5,
          cursor: queueCollapsed ? 'pointer' : 'not-allowed',
        }}
      >
        <ListIcon active={!queueCollapsed} />
      </button>
    </Tooltip>
  );
};

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

const DeviceButton = () => {
  const dispatch = useAppDispatch();
  const isDeviceOpen = useAppSelector((state) => !state.ui.devicesCollapsed);
  const currentDevice = useAppSelector((state) => state.spotify.activeDeviceType);

  return (
    <Tooltip title="Kết nối thiết bị">
      <button
        onClick={() => dispatch(uiActions.toggleDevices())}
        className={isDeviceOpen ? 'active-icon-button' : ''}
        style={{ marginTop: 4, cursor: isDeviceOpen ? 'pointer' : 'not-allowed' }}
      >
        {currentDevice === 'Smartphone' ? (
          <PhoneIcon active={isDeviceOpen} />
        ) : (
          <DeviceIcon active={isDeviceOpen} />
        )}
      </button>
    </Tooltip>
  );
};

const ExtraControlButtons = () => {
  return (
    <div>
      <Row gutter={18} align="middle">
        <DetailsButton />
        <LyricsButton />
        <QueueButton />
        <Col className="hiddable-icon">
          <DeviceButton />
        </Col>
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
