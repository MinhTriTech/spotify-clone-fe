import { memo, useEffect, useState, useCallback, useRef } from 'react';
import ModernSlider from '../../../Slider';
import { msToTime } from '../../../../utils';
import { useAudio } from '../../../../contexts/AudioContext';

const SongProgressBar = memo(() => {
  const { audioRef, videoRef  } = useAudio();
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [displayTime, setDisplayTime] = useState(0);
  const progressRef = useRef(0);

  const duration = Math.max(
    audioRef.current?.duration || 0,
    videoRef?.current?.duration || 0
  );

  useEffect(() => {
    const audio = audioRef.current;
    const video = videoRef?.current;

    const updateProgress = () => {
      if (!dragging && duration) {
        const currentTime = Math.max(
          audio?.currentTime || 0,
          video?.currentTime || 0
        );
        setDisplayTime(currentTime);
        const progressVal = currentTime / duration;
        progressRef.current = progressVal;
        setProgress(progressVal);
      }
    };

    if (audio) {
      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', updateProgress);
      audio.addEventListener('seeked', updateProgress);
    }

    if (video) {
      video.addEventListener('timeupdate', updateProgress);
      video.addEventListener('loadedmetadata', updateProgress);
      video.addEventListener('seeked', updateProgress);
    }

    return () => {
      if (audio) {
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', updateProgress);
        audio.removeEventListener('seeked', updateProgress);
      }

      if (video) {
        video.removeEventListener('timeupdate', updateProgress);
        video.removeEventListener('loadedmetadata', updateProgress);
        video.removeEventListener('seeked', updateProgress);
      }
    };
  }, [audioRef, videoRef, dragging, duration]);

  const handleSliderChange = useCallback(
    (val) => {
      setDragging(true);
      setProgress(val);
      if (duration) {
        setDisplayTime(val * duration);
      }
    },
    [duration]
  );

  const handleSliderChangeComplete = useCallback(
    (val) => {
      const audio = audioRef.current;
      const video = videoRef?.current;

      if (!duration || (!audio && !video)) return;

      try {
        const newTime = Math.max(0, Math.min(val * duration, duration));
        if (audio) audio.currentTime = newTime;
        if (video) video.currentTime = newTime;

        setDisplayTime(newTime);
        progressRef.current = val;

        setTimeout(() => {
          setDragging(false);
        }, 100);
        console.log(`Seeking to: ${newTime}s`);
      } catch (err) {
        console.error('Error seeking:', err);
        setDragging(false);
      }
    },
    [audioRef, videoRef, duration]
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