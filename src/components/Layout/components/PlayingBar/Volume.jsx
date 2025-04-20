import { useState, useEffect, useRef } from 'react';
import { useAudio } from '../../../../contexts/AudioContext'; 
import { Space } from 'antd';
import ModernSlider from '../../../Slider';
import { Tooltip } from '../../../Tooltip';
import { VolumeIcon, VolumeMuteIcon, VolumeOneIcon, VolumeTwoIcon } from '../../../Icons';

const getIcon = (volume) => {
  if (volume === 0) return <VolumeMuteIcon />;
  if (volume < 0.4) return <VolumeOneIcon />;
  if (volume < 0.7) return <VolumeTwoIcon />;
  return <VolumeIcon />;
};

const VolumeControls = () => {
  const { audioRef, volume, setVolume } = useAudio();
  const [isDragging, setIsDragging] = useState(false);
  const [localVolume, setLocalVolume] = useState(volume);
  const prevVolumeRef = useRef(volume > 0 ? volume : 0.5);
  
  // Theo dõi thay đổi volume từ context
  useEffect(() => {
    if (!isDragging) {
      setLocalVolume(volume);
      if (volume > 0) {
        prevVolumeRef.current = volume;
      }
    }
  }, [volume, isDragging]);

  const muted = volume === 0;

  const handleMuteToggle = () => {
    if (!audioRef.current) return;
    
    const newVolume = muted ? prevVolumeRef.current : 0;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    setLocalVolume(newVolume);
  };

  const handleVolumeChange = (val) => {
    setIsDragging(true);
    setLocalVolume(val);
  };

  const handleVolumeChangeComplete = (val) => {
    if (!audioRef.current) return;
    
    if (val > 0) {
      prevVolumeRef.current = val;
    }
    
    audioRef.current.volume = val;
    setVolume(val);
    
    // Sử dụng setTimeout để đảm bảo state được cập nhật sau event
    setTimeout(() => {
      setIsDragging(false);
    }, 50);
  };

  return (
    <div className="volume-control-container" onClick={(e) => e.stopPropagation()}>
      <Space size={6} style={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title={muted ? 'Unmute' : 'Mute'}>
          <div 
            onClick={handleMuteToggle}
            className="cursor-pointer"
          >
            {getIcon(isDragging ? localVolume : volume)}
          </div>
        </Tooltip>

        <div style={{ width: 90 }} onClick={(e) => e.stopPropagation()}>
          <ModernSlider
            isEnabled={true}
            value={isDragging ? localVolume : volume}
            min={0}
            max={1}
            step={0.01}
            onChange={handleVolumeChange}
            onChangeComplete={handleVolumeChangeComplete}
            controlType="volume"
          />
        </div>
      </Space>
    </div>
  );
};

export default VolumeControls;