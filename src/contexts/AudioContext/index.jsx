import { createContext, useContext, useRef, useState, useEffect, useCallback } from 'react';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSrc, setCurrentSrc] = useState('');
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolumeState] = useState(1); // Đổi tên để tránh nhầm lẫn
  const [loop, setLoop] = useState(false);
  
  // Thêm volumeRef để theo dõi volume thực tế
  const volumeRef = useRef(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    
    // Chỉ cập nhật volume state nếu khác với giá trị ref
    const handleVolumeChange = () => {
      if (Math.abs(audio.volume - volumeRef.current) > 0.01) {
        volumeRef.current = audio.volume;
        setVolumeState(audio.volume);
        console.log("Volume changed to:", audio.volume);
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

  // Thêm hàm setVolume an toàn
  const setVolume = useCallback((newVolume) => {
    if (audioRef.current) {
      const safeVolume = Math.max(0, Math.min(1, newVolume));
      audioRef.current.volume = safeVolume;
      volumeRef.current = safeVolume;
      setVolumeState(safeVolume);
      console.log("Setting volume to:", safeVolume);
    }
  }, []);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, []);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, []);

  const setSrc = useCallback((src, trackInfo = null) => {
    if (audioRef.current) {
      audioRef.current.src = src;
      audioRef.current.play();
      
      if (trackInfo) {
        setCurrentTrack(trackInfo);
      } else {
        setCurrentTrack(null);
      }
    }
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
        setVolume, // Thêm hàm setVolume vào context
      }}
    >
      {children}
      <audio ref={audioRef} style={{ display: 'none' }} />
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