import { useCallback, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';

const FollowArtist = ({ id, onToggle }) => {
  const { t } = useTranslation(['artist']);
  const [isFollowing, setIsFollowing] = useState(false); // Sử dụng useState để theo dõi trạng thái follow
  const user = useAppSelector((state) => !!state.auth.user, (prev, next) => prev === next);

  const handleFollow = useCallback(() => {
    if (!user) {
      console.warn('Không có token, nhưng vẫn cho load UI');
    }
    setIsFollowing(true); // Cập nhật trạng thái theo dõi trực tiếp
    onToggle();
  }, [onToggle, user]);

  return (
    <button className="transparent-button" onClick={handleFollow}>
      {t('Follow')}
    </button>
  );
};

const UnfollowArtist = ({ id, onToggle }) => {
  const { t } = useTranslation(['artist']);
  const [isFollowing, setIsFollowing] = useState(false); // Sử dụng useState để theo dõi trạng thái follow
  const user = useAppSelector((state) => !!state.auth.user, (prev, next) => prev === next);

  const handleUnfollow = useCallback(() => {
    if (!user) {
      console.warn('Không có token, nhưng vẫn cho load UI');
    }
    setIsFollowing(false); // Cập nhật trạng thái bỏ theo dõi trực tiếp
    onToggle();
  }, [onToggle, user]);

  return (
    <button className="transparent-button" onClick={handleUnfollow}>
      {t('Unfollow')}
    </button>
  );
};

const FollowArtistButton = ({ id }) => {
  const [isFollowing, setIsFollowing] = useState(false); // Theo dõi trạng thái theo dõi
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
