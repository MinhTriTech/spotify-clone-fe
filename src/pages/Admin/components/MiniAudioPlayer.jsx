import React, { useEffect, useRef, useState } from "react";

const MiniAudioPlayer = ({ src }) => {
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Cập nhật tiến độ khi nhạc chạy
  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent || 0);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    const audio = audioRef.current;
    audio.currentTime = (audio.duration * percent) / 100;
    setProgress(percent);
  };

  return (
    <div className="w-64 flex items-center space-x-2">
      <audio ref={audioRef} src={src} preload="metadata" />
      <button
        onClick={togglePlay}
        className="text-spotifyGreen text-lg font-bold hover:scale-110 transition"
      >
        {isPlaying ? "❚❚" : "▶"}
      </button>

      <div
        ref={progressRef}
        className="relative flex-1 h-2 bg-gray-600 rounded cursor-pointer"
        onClick={handleSeek}
      >
        <div
          className="absolute top-0 left-0 h-2 bg-spotifyGreen rounded"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: `${progress}%` }}
        >
          <div className="w-3 h-3 bg-spotifyGreen rounded-full shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default MiniAudioPlayer;
