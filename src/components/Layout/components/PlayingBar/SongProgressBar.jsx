import { memo, useEffect, useState, useCallback, useRef } from 'react';
import ModernSlider from '../../../Slider';
import { msToTime } from '../../../../utils';
import { useAudio } from '../../../../contexts/AudioContext';

const SongProgressBar = memo(() => {
  const { audioRef } = useAudio();
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);
  const progressRef = useRef(0);

  const duration = audioRef.current?.duration || 0;

  // Cập nhật progress dựa trên sự kiện timeupdate
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (!dragging && duration) {
        const currentTime = audio.currentTime;
        setDisplayTime(currentTime);
        progressRef.current = currentTime / duration;
        setProgress(progressRef.current);
      }
    };

    audio.addEventListener('timeupdate', updateProgress);
    
    // Cần lắng nghe sự kiện loadedmetadata để có duration chính xác
    const handleMetadata = () => {
      updateProgress();
    };
    
    audio.addEventListener('loadedmetadata', handleMetadata);
    
    // Sự kiện seeking và seeked cũng rất quan trọng
    const handleSeeked = () => {
      updateProgress();
    };
    
    audio.addEventListener('seeked', handleSeeked);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', handleMetadata);
      audio.removeEventListener('seeked', handleSeeked);
    };
  }, [audioRef, dragging, duration]);

  const handleSliderChange = useCallback((val) => {
    setDragging(true);
    // Cập nhật hiển thị ngay lập tức để UI phản hồi
    setProgress(val);
    if (duration) {
      setDisplayTime(val * duration);
    }
  }, [duration]);

  const handleSliderChangeComplete = useCallback(
    (val) => {
      if (!audioRef.current || !duration) return;

      // Trực tiếp sử dụng tham chiếu đến audio element
      try {
        const audio = audioRef.current;
        const newTime = Math.max(0, Math.min(val * duration, duration));
        
        // Đặt currentTime, đảm bảo giá trị nằm trong phạm vi hợp lệ
        audio.currentTime = newTime;
        
        // Cập nhật state
        setDisplayTime(newTime);
        progressRef.current = val;
        
        // Đặt timeout ngắn để đảm bảo UI được cập nhật 
        // trước khi cho phép timeupdate event tiếp tục cập nhật
        setTimeout(() => {
          setDragging(false);
        }, 100);
        
        console.log(`Seeking to: ${newTime}s (${val * 100}%)`);
      } catch (err) {
        console.error('Error during seek:', err);
        setDragging(false);
      }
    },
    [audioRef, duration]
  );

  return (
    <div className="flex items-center justify-between w-full">
      <div className="text-white mr-2 text-xs">{msToTime(displayTime * 1000)}</div>
      <div style={{ width: '100%' }}>
        <ModernSlider
          isEnabled
          value={progress}
          onChange={handleSliderChange}
          onChangeComplete={handleSliderChangeComplete}
          controlType="progress"
        />
      </div>
      <div className="text-white ml-2 text-xs">{msToTime(duration * 1000)}</div>
    </div>
  );
});

export default SongProgressBar;