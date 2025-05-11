import { Slider } from '@mui/material';
import { useAudio } from '../../contexts/AudioContext';

const ModernSlider = ({
  isEnabled = true,
  value = 0,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
  onChangeComplete,
  controlType = 'default',
  ...otherProps
}) => {
  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      if (onChange) onChange(newValue, controlType);
    }
  };

  const handleChangeCommitted = (event, newValue) => {
    if (typeof newValue === 'number') {
      if (onChangeComplete) onChangeComplete(newValue, controlType);
    }
  };

  const { currentSrc } = useAudio();
    const disabled = !currentSrc;

  return (
    <div className="modern-slider-container" data-control-type={controlType}>
      <Slider
        disabled={disabled}
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        {...otherProps}
        sx={{
          color: '#1ed760',
          height: 4,
          '& .MuiSlider-thumb': {
            width: 12,
            height: 12,
            backgroundColor: '#1ed760',
            border: '2px solid white',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.2)',
            },
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#535353',
          },
          '& .MuiSlider-track': {
            backgroundColor: '#1ed760',
          },
        }}
      />
    </div>
  );
};

export default ModernSlider;