import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const ModernSlider = ({ isEnabled, value, onChange, onChangeStart, onChangeComplete }) => {
  const handleChange = (newValue) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleBeforeChange = () => {
    if (onChangeStart) {
      onChangeStart();
    }
  };

  const handleAfterChange = (newValue) => { // Đổi tên hàm này thành handleComplete
    if (onChangeComplete) {           // Và gọi onChangeComplete
      onChangeComplete(newValue);
    }
  };

  return (
    <div className="modern-slider-container">
      <Slider
        disabled={!isEnabled}
        value={value}
        onChange={handleChange}
        onBeforeChange={handleBeforeChange}
        onChangeComplete={handleAfterChange} // Sử dụng onChangeComplete
        railStyle={{
          backgroundColor: '#535353',
          height: 4,
          borderRadius: 2,
        }}
        trackStyle={{
          backgroundColor: '#1ed760',
          height: 4,
          borderRadius: 2,
        }}
        handleStyle={[
          {
            borderColor: '#1ed760',
            backgroundColor: '#1ed760',
            width: 12,
            height: 12,
            borderRadius: '50%',
            marginTop: -4,
            opacity: 1,
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          },
        ]}
      />
    </div>
  );
};

export default ModernSlider;