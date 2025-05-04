import { LikedSongsList } from './table';
import { LikedSongsHeader } from './header';

import tinycolor from 'tinycolor2';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';
import { useEffect, useRef, useState } from 'react';

import { DEFAULT_PAGE_COLOR, LIKED_SONGS_IMAGE } from '../../constants/spotify';
import { useAppDispatch } from '../../store/store';
import { fetchLikeSongs } from '../../store/slices/likedSongs';

const LikedSongsPage = (props) => {
  const dispatch = useAppDispatch();
  const containerRef = useRef(null);

  const [color, setColor] = useState(DEFAULT_PAGE_COLOR);

  useEffect(() => {
    getImageAnalysis2(LIKED_SONGS_IMAGE).then((color) => {
      const item = tinycolor(color);
      setColor(item.isLight() ? item.darken(10).toHexString() : item.toHexString());
    });
    dispatch(fetchLikeSongs());
  }, [dispatch]);

  return (
    <div className='Playlist-section' ref={containerRef}>
      <LikedSongsHeader color={color} container={props.container} sectionContainer={containerRef} />
      <LikedSongsList color={color} />
    </div>
  );
};

LikedSongsPage.displayName = 'LikedSongsPage';

export default LikedSongsPage;
