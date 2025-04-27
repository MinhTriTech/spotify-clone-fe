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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const volumeRef = useRef(1);
  const syncingRef = useRef(false); // Để tránh vòng lặp khi đồng bộ

  // Đồng bộ hóa video với audio
  const syncVideoWithAudio = useCallback(() => {
    if (!videoRef.current || !audioRef.current || !currentTrack?.video || syncingRef.current) return;
    
    // Chỉ đồng bộ khi chênh lệch thời gian vượt quá ngưỡng
    if (Math.abs(videoRef.current.currentTime - audioRef.current.currentTime) > 0.2) {
      videoRef.current.currentTime = audioRef.current.currentTime;
    }
  }, [currentTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      setIsPlaying(true);
      if (videoRef.current && currentTrack?.video) {
        videoRef.current.play().catch(e => console.error("Video play error:", e));
      }
    };
    
    const handlePause = () => {
      setIsPlaying(false);
      if (videoRef.current && currentTrack?.video) {
        videoRef.current.pause();
      }
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      if (videoRef.current && currentTrack?.video) {
        videoRef.current.pause();
      }
    };
    
    const handleVolumeChange = () => {
      if (Math.abs(audio.volume - volumeRef.current) > 0.01) {
        volumeRef.current = audio.volume;
        setVolumeState(audio.volume);
      }
    };
    
    const handleLoadedMetadata = () => {
      setCurrentSrc(audio.src);
      setDuration(audio.duration || 0);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      syncVideoWithAudio();
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('volumechange', handleVolumeChange);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('volumechange', handleVolumeChange);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentTrack, syncVideoWithAudio]);

  const setVolume = useCallback((newVolume) => {
    const safeVolume = Math.max(0, Math.min(1, newVolume));
    if (audioRef.current) audioRef.current.volume = safeVolume;
    volumeRef.current = safeVolume;
    setVolumeState(safeVolume);
  }, []);

  const play = useCallback(() => {
    const playPromise = audioRef.current?.play();
    if (playPromise) {
      playPromise.then(() => {
        setIsPlaying(true);
        if (videoRef.current && currentTrack?.video) {
          videoRef.current.play().catch(e => console.error("Video play error:", e));
        }
      }).catch(e => console.error("Audio play error:", e));
    }
  }, [currentTrack]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    if (videoRef.current && currentTrack?.video) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  }, [currentTrack]);

  const setSrc = useCallback((src, trackInfo = null) => {
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = src;
      audioRef.current.load();

      audioRef.current.play();
      
      if (wasPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play error:", e));
      }
    }

    if (trackInfo?.video && videoRef.current) {
      videoRef.current.src = trackInfo.video;
      videoRef.current.load();
      videoRef.current.currentTime = audioRef.current.currentTime;
      
      if (!audioRef.current.paused) {
        videoRef.current.play().catch(e => console.error("Video play error:", e));
      }
    }

    setCurrentTrack(trackInfo ?? null);
  }, []);

  const seekTo = useCallback((time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
    
    if (videoRef.current && currentTrack?.video) {
      videoRef.current.currentTime = time;
    }
  }, [currentTrack]);

  const toggleLoop = useCallback(() => {
    if (audioRef.current) {
      const newLoop = !audioRef.current.loop;
      audioRef.current.loop = newLoop;
      if (videoRef.current) {
        videoRef.current.loop = newLoop;
      }
      setLoop(newLoop);
    }
  }, []);

  const resetAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ''; 
    }
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = '';
    }
    setIsPlaying(false);
    setCurrentSrc('');
    setCurrentTrack(null);
    setCurrentTime(0);
    setDuration(0);
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
        currentTime,
        duration,
        play,
        pause,
        setSrc,
        seekTo,
        toggleLoop,
        setCurrentTrack,
        setVolume,
        resetAudio,
      }}
    >
      {children}
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