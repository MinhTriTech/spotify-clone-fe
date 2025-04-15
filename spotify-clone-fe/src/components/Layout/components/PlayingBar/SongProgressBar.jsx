// Cleaned version of SongProgressBar (frontend-only)
import { memo, useEffect, useState } from 'react';
import { Slider } from '../../../Slider';
import { msToTime } from '../../../../utils';

const SongProgressBar = memo(() => {
  const [value, setValue] = useState(0);
  const [selecting, setSelecting] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(240000); // Mock duration: 4 minutes

  useEffect(() => {
    let interval = setInterval(() => {
      if (!selecting) {
        setPosition((prev) => {
          const next = prev + 1000;
          if (next >= duration) return 0;
          return next;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [selecting, duration]);

  useEffect(() => {
    if (!selecting) {
      setValue(duration ? (position >= duration ? 0 : position / duration) : 0);
    }
  }, [position, duration, selecting]);

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='text-white mr-2 text-xs'>{msToTime(position)}</div>
      <div style={{ width: '100%' }}>
        <Slider
          isEnabled
          value={value}
          onChangeStart={() => setSelecting(true)}
          onChange={(val) => setValue(val)}
          onChangeEnd={(val) => {
            setSelecting(false);
            const newPosition = Math.round(duration * val);
            setPosition(newPosition);
          }}
        />
      </div>
      <div className='text-white ml-2 text-xs'>{msToTime(duration)}</div>
    </div>
  );
});

export default SongProgressBar;