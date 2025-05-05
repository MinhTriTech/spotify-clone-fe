import { memo, useCallback, useMemo } from 'react';
import { Dropdown, message } from 'antd';
import { FollowIcon, UnfollowIcon } from '../Icons';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { userService } from '../../services/users';
import { yourLibraryActions } from '../../store/slices/yourLibrary';
import { artistActions } from '../../store/slices/artist';
import { uiActions } from '../../store/slices/ui';

const ArtistActionsWrapper = memo((props) => {
  const { children, artist, trigger = ['contextMenu'] } = props;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);
  const myArtists = useAppSelector((state) => state.yourLibrary.myArtists);

  const handleUserValidation = useCallback(() => {
    if (!user) {
      dispatch(uiActions.openLoginTooltip());
      return false;
    }
    return true;
  }, [dispatch, user]);

  const artistId = artist?.artist_id;
  
  const inLibrary = useMemo(() => {
    if (!artistId) return false;
    return myArtists.some((p) => p.artist_id === artistId);
  }, [myArtists, artistId]);

  const items = useMemo(() => {
    const menuItems = [];

    if (inLibrary) {
      menuItems.push({
        key: 'remove',
        label: 'Bỏ theo dõi',
        icon: <UnfollowIcon />,
        onClick: async () => {
          if (!handleUserValidation()) return;
          await userService.unfollowArtists(artistId);
          dispatch(artistActions.setFollowing({ following: false }));
          dispatch(yourLibraryActions.fetchMyArtists());
        },
      });
    } else {
      menuItems.push({
        key: 'add',
        label: 'Theo dõi',
        icon: <FollowIcon />,
        onClick: async () => {
          if (!handleUserValidation()) return;
          await userService.followArtists(artistId);
          dispatch(artistActions.setFollowing({ following: true }));
          dispatch(yourLibraryActions.fetchMyArtists());
        },
      });
    }

    return menuItems;
  }, [artistId, dispatch, handleUserValidation, inLibrary]);

  return (
    <Dropdown menu={{ items }} trigger={trigger}>
      {children}
    </Dropdown>
  );
});

export default ArtistActionsWrapper;
