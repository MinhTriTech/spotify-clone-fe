import { Col, Row } from 'antd';
import { Pause, Play, SkipBack, SkipNext, DownloadIcon } from '../../../Icons';
import { memo, useCallback } from 'react';
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

const DownloadButton = memo(() => {
  const { currentSrc } = useAudio();
  const disabled = !currentSrc;

  const handleDownload = useCallback(async () => {
    if (disabled) return;

    try {
      const response = await fetch(currentSrc);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const originalFilename = currentSrc.split('/').pop() || 'track';
      const hasExtension = originalFilename.includes('.');
      const fallbackExt = blob.type.split('/')[1] || 'mp3';
      const finalFilename = hasExtension ? originalFilename : `track.${fallbackExt}`;

      const link = document.createElement('a');
      link.href = url;
      link.download = finalFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Tải file thất bại:', error);
    }
  }, [disabled, currentSrc]);

  return (
    <button
      className={disabled ? 'disabled' : ''}
      onClick={handleDownload}
      disabled={disabled}
    >
      <DownloadIcon />
    </button>
  );
});


const CONTROLS = [SkipBackButton, PlayButton, SkipNextButton, DownloadButton];

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