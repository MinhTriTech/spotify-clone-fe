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
  
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

  const [currentArtistId, setCurrentArtistId] = useState(null);

  const [currentLikedSongId, setCurrentLikedSongId] = useState(null);
  
  const volumeRef = useRef(1);
  const syncingRef = useRef(false);

  const syncVideoWithAudio = useCallback(() => {
    if (!videoRef.current || !audioRef.current || !currentTrack?.video || syncingRef.current) return;
    
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
      if (playlist.length > 0 && currentIndex >= 0) {
        const nextIndex = getNextTrackIndex();
        if (nextIndex !== -1) {
          playTrackByIndex(nextIndex);
        } else {
          setIsPlaying(false);
          if (videoRef.current && currentTrack?.video) {
            videoRef.current.pause();
          }
        }
      } else {
        setIsPlaying(false);
        if (videoRef.current && currentTrack?.video) {
          videoRef.current.pause();
        }
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
  }, [currentTrack, syncVideoWithAudio, playlist, currentIndex]);

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

  const tryPlay = async (media) => {
    try {
      await media.play();
    } catch (e) {
      if (e.name === 'AbortError' || e.name === 'NotAllowedError') {
        console.warn('Play was interrupted, waiting to retry...');
        media.addEventListener('canplay', function onCanPlay() {
          media.removeEventListener('canplay', onCanPlay);
          media.play().catch(err => console.error("Retry play error:", err));
        });
      } else {
        console.error('Play error:', e);
      }
    }
  };
  
  const setSrc = useCallback((src, trackInfo = null) => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const wasPlaying = !audio.paused;
      audio.src = src;
      audio.load();
  
      if (wasPlaying) {
        tryPlay(audio);
      }
    }
  
    if (trackInfo?.video && videoRef.current) {
      const video = videoRef.current;
      video.src = trackInfo.video;
      video.load();
      video.currentTime = audioRef.current.currentTime;
  
      if (!audioRef.current.paused) {
        tryPlay(video);
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

  const setPlaylistTracks = useCallback((tracks) => {
    setPlaylist(tracks);
    setCurrentIndex(-1); 
  }, []);

  const updateCurrentPlaylistId = useCallback((temp) => {
    setCurrentPlaylistId(temp);
  }, []);
  
  const updateCurrentArtistId = useCallback((temp) => {
    setCurrentArtistId(temp);
  }, []);  

  const updateCurrentLikedSongId = useCallback((temp) => {
    setCurrentLikedSongId(temp);
  }, []);  

  const setPlaylistAndPlay = useCallback(async (tracks, index = 0, playlistId = null, artistId = null, likedSongId = null) => {
    if (!tracks || tracks.length === 0 || index < 0 || index >= tracks.length) return;
  
    setPlaylist(tracks);
    setCurrentPlaylistId(playlistId);
    setCurrentArtistId(artistId)
    setCurrentLikedSongId(likedSongId)
    setCurrentIndex(index);
  
    const track = tracks[index];
    setSrc(track.src, track);
  
    if (audioRef.current) {
      await waitForCanPlay(audioRef.current);
      tryPlay(audioRef.current);
    }
  
    if (track?.video && videoRef.current) {
      tryPlay(videoRef.current);
    }
  }, [setSrc]);
  
  
  const getNextTrackIndex = useCallback(() => {
    if (playlist.length === 0) return -1;
      const nextIndex = currentIndex + 1;
      return nextIndex < playlist.length ? nextIndex : -1;
  }, [playlist, currentIndex]);
  
  const getPrevTrackIndex = useCallback(() => {
    if (playlist.length === 0 || currentIndex <= 0) return -1;
    
    return currentIndex - 1;
  }, [playlist, currentIndex]);
  
  const waitForCanPlay = (media) => new Promise((resolve) => {
    if (media.readyState >= 3) {
      resolve();
    } else {
      media.addEventListener('canplay', resolve, { once: true });
    }
  });
  
  const playTrackByIndex = useCallback(async (index) => {
    if (index < 0 || index >= playlist.length) return;
  
    const track = playlist[index];
  
    setSrc(track.src, track);
    setCurrentIndex(index);
  
    if (audioRef.current) {
      await waitForCanPlay(audioRef.current);
      audioRef.current.play().catch(e => console.error("Audio play error:", e));
    }
  }, [playlist, setSrc]);
  
  
  const playNextTrack = useCallback(() => {
    const nextIndex = getNextTrackIndex();
    if (nextIndex !== -1) {
      playTrackByIndex(nextIndex);
    }
  }, [getNextTrackIndex, playTrackByIndex]);
  
  const playPrevTrack = useCallback(() => {
    const prevIndex = getPrevTrackIndex();
    if (prevIndex !== -1) {
      playTrackByIndex(prevIndex);
    } else {
      seekTo(0);
    }
  }, [getPrevTrackIndex, playTrackByIndex, seekTo]);

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
        
        playlist,
        currentIndex,
        currentPlaylistId,
        setPlaylistTracks,
        setPlaylistAndPlay,
        playTrackByIndex,
        playNextTrack,
        playPrevTrack,
        updateCurrentPlaylistId,

        currentArtistId,
        updateCurrentArtistId,

        currentLikedSongId,
        updateCurrentLikedSongId,
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