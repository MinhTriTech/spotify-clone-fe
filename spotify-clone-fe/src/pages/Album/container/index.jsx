import { useEffect, useRef, useState } from 'react';

// Components
import { AlbumList } from './table';
import { AlbumHeader } from './header';

// Utils
import { getImageAnalysis2 } from '../../../utils/imageAnyliser';

// Redux
import { useAppSelector } from '../../../store/store';

// Constants
import { DEFAULT_PAGE_COLOR } from '../../../constants/spotify';
import tinycolor from 'tinycolor2';

const AlbumPageContainer = (props) => {
  const containerRef = useRef(null);

  const album = useAppSelector((state) => state.album.album);
  const [color, setColor] = useState(DEFAULT_PAGE_COLOR);

  useEffect(() => {
    if (album && album.images?.length) {
      getImageAnalysis2(album.images[0].url).then((r) => {
        let colorObj = tinycolor(r);
        while (colorObj.isLight()) {
          colorObj = colorObj.darken(10);
        }
        setColor(colorObj.toHexString());
      });
    }
  }, [album]);

  if (!album) return null;

  return (
    <div className='Playlist-section' ref={containerRef}>
      <AlbumHeader color={color} container={props.container} sectionContainer={containerRef} />
      <AlbumList color={color} />
    </div>
  );
};

AlbumPageContainer.displayName = 'AlbumPageContainer';

export default AlbumPageContainer;
