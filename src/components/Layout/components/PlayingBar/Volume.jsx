// Cleaned VolumeControls for frontend-only testing
import { useState } from 'react';

import { Space } from 'antd';
import Slider from '../../../Slider';
import { Tooltip } from '../../../Tooltip';
import { VolumeIcon, VolumeMuteIcon, VolumeOneIcon, VolumeTwoIcon } from '../../../Icons';

const getIcon = (volume) => {
  if (volume === 0) return <VolumeMuteIcon />;
  if (volume < 0.4) return <VolumeOneIcon />;
  if (volume < 0.7) return <VolumeTwoIcon />;
  return <VolumeIcon />;
};

const VolumeControls = () => {
  const [volume, setVolume] = useState(1);
  const muted = volume === 0;

  return (
    <div className='volume-control-container'>
      <Space style={{ display: 'flex' }}>
        <Tooltip title={muted ? 'Unmute' : 'Mute'}>
          <div
            onClick={() => {
              setVolume(muted ? 1 : 0);
            }}
          >
            {getIcon(muted ? 0 : volume)}
          </div>
        </Tooltip>

        <div className='flex items-center justify-between w-full' style={{ width: 90 }}>
          <Slider
            isEnabled
            value={muted ? 0 : volume}
            onChange={(val) => setVolume(val)}
            onChangeComplete={(val) => setVolume(val)}
          />
        </div>
      </Space>
    </div>
  );
};

export default VolumeControls;
