import { memo } from 'react';
import { MenuIcon } from '../../../../Icons';
// ❌ Đã gỡ useTranslation
import { DeviceIcons } from '../../../../../utils/spotify/getDeviceIcon';

// Redux
import { useAppSelector } from '../../../../../store/store';
import { getCurrentDevice } from '../../../../../store/slices/spotify';
import { EQUILISER_IMAGE } from '../../../../../constants/spotify';

export const CurrentDevice = memo(() => {
  const currentDevice = useAppSelector(getCurrentDevice);
  const isPlaying = useAppSelector((state) => !state.spotify.state?.paused);

  if (!currentDevice) return null;

  const Icon = DeviceIcons[currentDevice.type];

  return (
    <div className="current-device-container">
      <div className="area-header" style={{ marginLeft: 5 }}>
        <div className="area-header-content">
          <div className="area-header-content-first">
            <div style={{ width: 24 }}>
              {!isPlaying ? (
                <Icon />
              ) : (
                <img width={20} alt={'device playing'} src={EQUILISER_IMAGE} />
              )}
            </div>
            <p>
              <span>Thiết bị hiện tại</span>
            </p>
          </div>
          <div className="area-header-content-second">
            <p>
              <span>{currentDevice.name}</span>
            </p>
          </div>
        </div>
        <div>
          <div>
            <button style={{ marginRight: 5 }}>
              <span>
                <MenuIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CurrentDevice;
