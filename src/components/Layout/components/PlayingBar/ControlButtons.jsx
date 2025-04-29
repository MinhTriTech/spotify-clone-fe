import { Col, Row } from 'antd';
import { Pause, Play, SkipBack, SkipNext } from '../../../Icons';
import { memo, useState, useCallback } from 'react';
import { useAudio } from '../../../../contexts/AudioContext';

const SkipBackButton = memo(() => {
  const { playPrevTrack, currentSrc } = useAudio();
  const disabled = !currentSrc;

  const handleSkipBack = useCallback(() => {
    if (!disabled) {
      playPrevTrack();
    }
  }, [disabled, playPrevTrack]);

  return (
    <button
      className={disabled ? 'disabled' : ''}
      onClick={handleSkipBack}
      disabled={disabled}
    >
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
  const { playNextTrack, currentSrc } = useAudio();
  const disabled = !currentSrc;

  const handleSkipNext = useCallback(() => {
    if (!disabled) {
      playNextTrack();
    }
  }, [disabled, playNextTrack]);

  return (
    <button
      className={disabled ? 'disabled' : ''}
      onClick={handleSkipNext}
      disabled={disabled}
    >
      <SkipNext />
    </button>
  );
});

const CONTROLS = [SkipBackButton, PlayButton, SkipNextButton];

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