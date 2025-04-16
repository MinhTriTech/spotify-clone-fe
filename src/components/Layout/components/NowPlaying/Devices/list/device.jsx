// Cleaned DeviceItem component for frontend-only use
import { memo, useCallback } from 'react';
import { DeviceIcons } from '../../../../../../utils/spotify/getDeviceIcon';

export const DeviceItem = memo(({ device }) => {
  const onClick = useCallback(() => {
    if (device.is_restricted) return;
    console.log(`Mock transfer playback to device ${device.name}`);
  }, [device]);

  return (
    <div
      onClick={onClick}
      className={`device-item-container ${device.is_restricted ? 'disabled' : ''}`}
    >
      <div className='device-icon-container'>
        <div className='item'>{DeviceIcons[device.type]}</div>
      </div>

      <div className='device-text-container'>
        <div className='text'>
          <p>
            <span>{device.name}</span>
          </p>
        </div>
      </div>
    </div>
  );
});