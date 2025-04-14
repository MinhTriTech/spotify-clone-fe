import { memo, useCallback, useMemo } from 'react';
import { Dropdown, message } from 'antd';
import { FollowIcon, UnfollowIcon } from '../Icons';

// Utils
import { useTranslation } from 'react-i18next';

// Redux
import { useAppDispatch, useAppSelector } from '../../store/store';
import { userService } from '../../services/users';
import { yourLibraryActions } from '../../store/slices/yourLibrary';
import { uiActions } from '../../store/slices/ui';

const ArtistActionsWrapper = memo((props) => {
  const { children, artist } = props;

  const { t } = useTranslation(['playlist']);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);
  const myArtists = useAppSelector((state) => state.yourLibrary.myArtists);

  const handleUserValidation = useCallback(() => {
    if (!user) {
      console.warn('Không có token, nhưng vẫn cho load UI');
    }
    return true;
  }, [dispatch, user]);

  const inLibrary = useMemo(() => {
    const id = artist.id || artist.uri?.split(':').reverse()[0];
    return myArtists.some((p) => p.id === id);
  }, [myArtists, artist]);

  const items = useMemo(() => {
    const items = [];
    const id = artist.id || artist.uri?.split(':').reverse()[0];

    if (inLibrary) {
      items.push({
        key: 'remove',
        label: t('Unfollow'),
        icon: <UnfollowIcon />,
        onClick: async () => {
          if (!handleUserValidation()) return;
          userService.unfollowArtists([id]).then(() => {
            message.success(t('Artist unfollowed'));
            dispatch(yourLibraryActions.fetchMyArtists());
          });
        },
      });
    } else {
      items.push({
        key: 'add',
        label: t('Follow'),
        icon: <FollowIcon />,
        onClick: async () => {
          if (!handleUserValidation()) return;
          userService.followArtists([id]).then(() => {
            message.success(t('Artist followed'));
            dispatch(yourLibraryActions.fetchMyArtists());
          });
        },
      });
    }

    return items;
  }, [artist, dispatch, handleUserValidation, inLibrary, t]);

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});

export default ArtistActionsWrapper;
