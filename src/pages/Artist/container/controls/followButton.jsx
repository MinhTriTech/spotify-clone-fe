import { useCallback, useState } from 'react';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';

const FollowArtist = ({ id, onToggle }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const user = useAppSelector((state) => !!state.auth.user, (prev, next) => prev === next);

  const handleFollow = useCallback(() => {
    if (!user) {
      console.warn('Không có token, nhưng vẫn cho load UI');
    }
    setIsFollowing(true);
    onToggle();
  }, [onToggle, user]);

  return (
    <button className="transparent-button" onClick={handleFollow}>
      Theo dõi
    </button>
  );
};

const UnfollowArtist = ({ id, onToggle }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const user = useAppSelector((state) => !!state.auth.user, (prev, next) => prev === next);

  const handleUnfollow = useCallback(() => {
    if (!user) {
      console.warn('Không có token, nhưng vẫn cho load UI');
    }
    setIsFollowing(false);
    onToggle();
  }, [onToggle, user]);

  return (
    <button className="transparent-button" onClick={handleUnfollow}>
      Bỏ theo dõi
    </button>
  );
};

const FollowArtistButton = ({ id }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const dispatch = useAppDispatch();

  const onToggle = () => {
    dispatch(yourLibraryActions.fetchMyArtists());
  };

  return isFollowing ? (
    <UnfollowArtist id={id} onToggle={onToggle} />
  ) : (
    <FollowArtist id={id} onToggle={onToggle} />
  );
};

export default FollowArtistButton;
