import { useEffect, useRef, useState } from 'react';

import { AlbumList } from './table';
import { AlbumHeader } from './header';

import { getImageAnalysis2 } from '../../../utils/imageAnyliser';

import { useAppSelector, useAppDispatch } from '../../../store/store';

import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';

import { artistActions } from '../../../store/slices/artist';

import tinycolor from 'tinycolor2';

const AlbumPageContainer = ({ container }) => {
  const containerRef = useRef(null);

  const album = useAppSelector((state) => state.album.album);
  const [color, setColor] = useState(DEFAULT_PAGE_COLOR);

  const artist = useAppSelector((state) => state.album.artist);

  const dispatch = useAppDispatch();
  
  useEffect(() => {
      if (artist) {
        dispatch(artistActions.getInfoArtist(artist));
      }
      return () => {
        dispatch(artistActions.setArtist({ artist: null }));
      };
    }, [dispatch, artist]);
  
  useEffect(() => {
    if (album && album.image) {
      getImageAnalysis2(album.image).then((r) => {
        let color = tinycolor(r);
        while (color.isLight()) {
          color = color.darken(10);
        }
        setColor(color.toHexString());
      });
    }
  }, [album]);

  if (!album) return null;

  return (
    <div className='Playlist-section' ref={containerRef}>
      <AlbumHeader color={color} container={container} sectionContainer={containerRef} />
      <AlbumList color={color} />
    </div>
  );
};

AlbumPageContainer.displayName = 'AlbumPageContainer';

export default AlbumPageContainer;
