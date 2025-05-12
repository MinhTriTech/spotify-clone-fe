// Cleaned NowPlayingBarMobile component for frontend-only usage
import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { ListIcon, Pause, Play } from '../../../Icons';
import tinycolor from 'tinycolor2';
import SongDetails from './SongDetails';
import {AddSongToLibraryButton} from '../../../Actions/AddSongToLibrary';

const PlayButton = ({ isPlaying, togglePlay }) => {
  return (
    <button onClick={togglePlay}>
      {isPlaying ? <Pause /> : <Play />}
    </button>
  );
};

const QueueButton = () => {
  return (
    <button onClick={() => console.log('Toggle queue')}>
      <ListIcon />
    </button>
  );
};

const NowPlayingBarMobile = () => {
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(240000); // mock 4 min
  const [isPlaying, setIsPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [currentColor, setColor] = useState('blue');

  const currentSong = {
    id: 'mock-song-id',
    album: {
      images: [
        {
          url: 'https://via.placeholder.com/150',
        },
      ],
    },
  };

  useEffect(() => {
    let interval = setInterval(() => {
      if (isPlaying) {
        setPosition((prev) => {
          const next = prev + 1000;
          return next >= duration ? 0 : next;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  useEffect(() => {
    if (currentSong) {
      const r = '#1db954';
      let color = tinycolor(r);
      while (color.isLight()) {
        color = color.darken(10);
      }
      setColor(color.toHexString());
    }
  }, [currentSong]);

  return (
    <div>
      <div
        className='mobile-player'
        style={{ background: `linear-gradient(${currentColor} -50%, rgb(18, 18, 18) 300%)` }}
      >
        <Row justify='space-between'>
          <Col>
            <SongDetails isMobile />
          </Col>
          <Col style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                minWidth: 50,
                marginRight: 5,
                gap: 15,
                justifyContent: 'space-between',
              }}
            >
              <QueueButton />
              <PlayButton isPlaying={isPlaying} togglePlay={() => setIsPlaying(!isPlaying)} />
            </div>
          </Col>
        </Row>
        <div className='time-line'>
          <div
            className='current-time'
            style={{ width: `${(position / duration) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default NowPlayingBarMobile;