import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../../../store/store';
import { DEFAULT_PAGE_COLOR } from '../../../../constants/spotify';
import UserHoverableMenu from './scrollHoverable';
import { getImageAnalysis2 } from '../../../../utils/imageAnyliser';
import tinycolor from 'tinycolor2';
import { UserHeader } from './header';
import { MyPlaylistsSection } from '../components/playlists';
import { ARTISTS_DEFAULT_IMAGE } from '../../../../constants/spotify';

const ProfileContainer = (props) => {
  const user = useAppSelector((state) => state.profile.user);
  
  const ref = useRef(null);
  const [color, setColor] = useState(DEFAULT_PAGE_COLOR);

  useEffect(() => {
    if (user) {
      getImageAnalysis2(ARTISTS_DEFAULT_IMAGE).then((c) => {
        const color = tinycolor(c);
        while (color.isLight()) color.darken(10);
        setColor(color.darken(20).toString());
      });
    }
  }, [setColor, user]);

  return (
    <div className='Profile-section' ref={ref}>
      <UserHoverableMenu color={color} container={props.container} sectionContainer={ref} />
      <UserHeader color={color} />

      <div
        style={{
          maxHeight: 323,
          padding: '20px 15px',
          background: `linear-gradient(${color} -50%, ${DEFAULT_PAGE_COLOR} 90%)`,
        }}
      >
        <MyPlaylistsSection />
      </div>
    </div>
  );
};

export default ProfileContainer;
