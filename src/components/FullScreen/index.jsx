import { Col, Row, Space } from 'antd';
import AlbumSongDetails from './Album';
import { ExpandOutIcon } from '../Icons';
import VolumeControls from '../Layout/components/PlayingBar/Volume';
import ControlButtons from '../Layout/components/PlayingBar/ControlButtons';
import SongProgressBar from '../Layout/components/PlayingBar/SongProgressBar';
import { Tooltip } from '../Tooltip';
import AddSongToLibraryButton from '../Actions/AddSongToLibrary';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { spotifyActions } from '../../store/slices/spotify';
import { useAudio } from '../../contexts/AudioContext';
import { useEffect, useRef } from 'react';

const ExpandOutButton = ({ onExit }) => (
  <Tooltip title="Thoát toàn màn hình">
    <button title="Thoát toàn màn hình" style={{ marginLeft: 20 }} onClick={onExit}>
      <ExpandOutIcon />
    </button>
  </Tooltip>
);

const AddToLibrary = () => {
  const dispatch = useAppDispatch();
  const song = useAppSelector(
    (state) => state.spotify.state?.track_window.current_track,
    (a, b) => a?.id === b?.id
  );
  const isLiked = useAppSelector((state) => state.spotify.liked);

  const handleToggle = () => {
    dispatch(spotifyActions.setLiked({ liked: !isLiked }));
  };

  return (
    <AddSongToLibraryButton size={20} isSaved={isLiked} id={song?.id} onToggle={handleToggle} />
  );
};

export const FullScreenPlayer = ({ onExit }) => {
  const { currentTrack, audioRef } = useAudio();
  const localVideoRef = useRef(null);
  const videoUrl = currentTrack?.video;
  const imageUrl = currentTrack?.image;

  useEffect(() => {
    const video = localVideoRef.current;
    const audio = audioRef.current;

    if (!video || !audio || !videoUrl) return;

    const needReload = video.src !== videoUrl;

    if (needReload) {
      video.src = videoUrl;
      video.load();
    }

    const handleCanPlay = () => {
      try {
        video.currentTime = audio.currentTime;
        if (!audio.paused) {
          video.play().catch(e => console.error('Video play error:', e));
        }
        video.loop = video.duration < audio.duration;
      } catch (e) {
        console.error('Sync error:', e);
      }
    };

    const syncTimeWithAudio = () => {
      if (Math.abs(video.currentTime - audio.currentTime) > 0.3) {
        video.currentTime = audio.currentTime;
      }
    };

    const handlePlayPause = () => {
      if (audio.paused) {
        video.pause();
      } else {
        video.play().catch(e => console.error('Video play error:', e));
      }
    };

    const handleAudioEnded = () => {
      if (video && !video.loop) {
        video.pause();
      }
    };

    video.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('timeupdate', syncTimeWithAudio);
    audio.addEventListener('play', handlePlayPause);
    audio.addEventListener('pause', handlePlayPause);
    audio.addEventListener('ended', handleAudioEnded);

    if (video.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('timeupdate', syncTimeWithAudio);
      audio.removeEventListener('play', handlePlayPause);
      audio.removeEventListener('pause', handlePlayPause);
      audio.removeEventListener('ended', handleAudioEnded);
    };
  }, [videoUrl, audioRef]);

  return (
    <div className="Full-screen-page">
      <div style={{ width: '100%', padding: 60 }}>
        <Row gutter={[24, 24]} justify="center" style={{ alignItems: 'baseline' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            {videoUrl ? (
              <video
                ref={localVideoRef}
                style={{
                  width: '80%',
                  maxHeight: '400px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                  display: 'block',
                }}
                muted
                controls={false}
              />
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt={currentTrack?.title || 'cover'}
                style={{
                  width: '80%',
                  maxHeight: '400px',
                  borderRadius: '10px',
                  objectFit: 'cover',
                }}
              />
            ) : null}
          </Col>

          <Col span={24}>
            <AlbumSongDetails />
          </Col>
          <Col span={24}>
            <SongProgressBar />
          </Col>
          <Col span={8}>
            <AddToLibrary />
          </Col>
          <Col span={8}>
            <ControlButtons />
          </Col>
          <Col span={8} style={{ textAlign: 'end' }}>
            <Space>
              <VolumeControls />
              <ExpandOutButton onExit={onExit} />
            </Space>
          </Col>
        </Row>
      </div>
    </div>
  );
};

FullScreenPlayer.displayName = 'FullScreenPlayer';
