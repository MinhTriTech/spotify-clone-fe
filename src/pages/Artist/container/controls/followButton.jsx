import { useCallback } from 'react';

import { artistActions } from '../../../../store/slices/artist';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { uiActions } from '../../../../store/slices/ui';

import { userService } from '../../../../services/users';

const FollowArtist = ({ id, onToggle }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => !!state.auth.user,
    (prev, next) => prev === next
  );

  const handleFollow = useCallback(() => {
    if (!user) {
      return dispatch(uiActions.openLoginTooltip());
    }
    userService.followArtists(id).then(() => {
      dispatch(artistActions.setFollowing({ following: true }));
      onToggle();
    });
  }, [dispatch, id, onToggle, user]);

  return (
    <button className="transparent-button" onClick={handleFollow}>
      Theo dõi
    </button>
  );
};

const UnfollowArtist = ({ id, onToggle }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state) => !!state.auth.user,
    (prev, next) => prev === next
  );

  const handleUnfollow = useCallback(() => {
    if (!user) {
      return dispatch(uiActions.openLoginTooltip());
    }
    userService.unfollowArtists(id).then(() => {
      dispatch(artistActions.setFollowing({ following: false }));
      onToggle();
    });
  }, [dispatch, id, onToggle, user]);

  return (
    <button className="transparent-button" onClick={handleUnfollow}>
      Bỏ theo dõi
    </button>
  );
};

export const FollowArtistButton = ({ id }) => {
  const dispatch = useAppDispatch();
  const isSaved = useAppSelector((state) => state.artist.following);
  
  const onToggle = () => {
    dispatch(yourLibraryActions.fetchMyArtists());
  };

  return isSaved ? (
    <UnfollowArtist id={id} onToggle={onToggle} />
  ) : (
    <FollowArtist id={id} onToggle={onToggle} />
  );
};
