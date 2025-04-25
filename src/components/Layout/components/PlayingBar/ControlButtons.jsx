import { Col, Row } from 'antd';
import { Pause, Play, Replay, ReplayOne, ShuffleIcon, SkipBack, SkipNext } from '../../../Icons';
import { memo, useState, useCallback } from 'react';
import { useAudio } from '../../../../contexts/AudioContext';

const ShuffleButton = memo(() => {
  const [shuffle, setShuffle] = useState(false);
  return (
    <button onClick={() => setShuffle(!shuffle)}>
      <ShuffleIcon active={shuffle} />
    </button>
  );
});

const SkipBackButton = memo(() => {
  const disabled = false;
  return (
    <button className={disabled ? 'disabled' : ''} onClick={() => !disabled && console.log('Previous track')}>
      <SkipBack />
    </button>
  );
});

const PlayButton = memo(() => {
  const { isPlaying, play, pause, currentSrc, videoRef } = useAudio();
  const disabled = !currentSrc;

  const togglePlay = useCallback(() => {
    if (disabled) return;

    const video = videoRef?.current;

    if (isPlaying) {
      pause();
      video?.pause(); 
    } else {
      play();
      video?.play().catch(() => {}); 
    }
  }, [disabled, isPlaying, play, pause, videoRef]);

  return (
    <button
      className={`player-pause-button ${disabled ? 'disabled' : ''} ${isPlaying ? 'active' : ''}`}
      onClick={togglePlay}
      disabled={disabled}
    >
      {!isPlaying ? <Play /> : <Pause />}
    </button>
  );
});

const SkipNextButton = memo(() => {
  const disabled = false;
  return (
    <button className={disabled ? 'disabled' : ''} onClick={() => !disabled && console.log('Next track')}>
      <SkipNext />
    </button>
  );
});

const ReplayButton = memo(() => {
  const [repeatMode, setRepeatMode] = useState(0);
  const looping = repeatMode === 1 || repeatMode === 2;
  return (
    <button
      className={repeatMode === 2 ? 'active-icon-button' : ''}
      onClick={() => {
        const nextMode = repeatMode === 2 ? 0 : repeatMode === 1 ? 2 : 1;
        setRepeatMode(nextMode);
      }}
    >
      {repeatMode === 2 ? <ReplayOne active /> : <Replay active={looping} />}
    </button>
  );
});

const CONTROLS = [ShuffleButton, SkipBackButton, PlayButton, SkipNextButton, ReplayButton];

const ControlButtons = () => {
  return (
    <Row gutter={24} align='middle' style={{ justifyContent: 'center' }}>
      {CONTROLS.map((Component, index) => (
        <Col key={index}>
          <Component />
        </Col>
      ))}
    </Row>
  );
};

export default ControlButtons;