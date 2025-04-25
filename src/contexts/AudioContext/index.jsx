import { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const videoRef = useRef(null); 

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolumeState] = useState(1);
  const [loop, setLoop] = useState(false);
  const volumeRef = useRef(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleVolumeChange = () => {
      if (Math.abs(audio.volume - volumeRef.current) > 0.01) {
        volumeRef.current = audio.volume;
        setVolumeState(audio.volume);
      }
    };
    const handleLoadedMetadata = () => setCurrentSrc(audio.src);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('volumechange', handleVolumeChange);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  const setVolume = useCallback((newVolume) => {
    const safeVolume = Math.max(0, Math.min(1, newVolume));
    if (audioRef.current) audioRef.current.volume = safeVolume;
    if (videoRef.current) videoRef.current.volume = safeVolume;
    volumeRef.current = safeVolume;
    setVolumeState(safeVolume);
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play();
    videoRef.current?.play();
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    videoRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const setSrc = useCallback((src, trackInfo = null) => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.play();
    }

    if (trackInfo?.video && videoRef.current) {
      videoRef.current.src = trackInfo.video;
      videoRef.current.currentTime = 0; 
      videoRef.current.play().catch(() => {}); 
    }

    setCurrentTrack(trackInfo ?? null);
  }, []);

  const toggleLoop = useCallback(() => {
    if (audioRef.current) {
      const newLoop = !audioRef.current.loop;
      audioRef.current.loop = newLoop;
      setLoop(newLoop);
    }
  }, []);

  return (
    <AudioContext.Provider
      value={{
        audioRef,
        videoRef, 
        isPlaying,
        currentSrc,
        currentTrack,
        volume,
        loop,
        play,
        pause,
        setSrc,
        toggleLoop,
        setCurrentTrack,
        setVolume,
      }}
    >
      {children}
      <audio ref={audioRef} style={{ display: 'none' }} />
      <video ref={videoRef} style={{ display: 'none' }} muted />
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};