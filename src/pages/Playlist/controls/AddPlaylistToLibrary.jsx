import { useCallback, useMemo } from 'react';

import { Tooltip } from '../../../components/Tooltip';
import { AddedToLibrary, AddToLibrary } from '../../../components/Icons';

// Services
import { userService } from '../../../services/users';

// Redux
import { uiActions } from '../../../store/slices/ui';
import { useAppDispatch, useAppSelector } from '../../../store/store';
import { yourLibraryActions } from '../../../store/slices/yourLibrary';

const FollowPlaylist = ({ id, size, onToggle }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const handleAddToLibrary = () => {
    if (!user) return dispatch(uiActions.openLoginTooltip());
    userService.followPlaylist(id).then(() => onToggle());
  };

  return (
    <Tooltip title="Thêm vào Thư viện của bạn">
      <button onClick={handleAddToLibrary}>
        <AddToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

const UnfollowPlaylist = ({ id, size, onToggle }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const handleDeleteFromLibrary = useCallback(() => {
    if (!user) return dispatch(uiActions.openLoginTooltip());
    userService.unfollowPlaylist(id).then(() => onToggle());
  }, [dispatch, id, onToggle, user]);

  return (
    <Tooltip title="Xóa khỏi Thư viện của bạn">
      <button onClick={handleDeleteFromLibrary}>
        <AddedToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

export const AddPlaylistToLibraryButton = ({ id }) => {
  const dispatch = useAppDispatch();
  const myPlaylists = useAppSelector((state) => state.yourLibrary.myPlaylists);

  const isSaved = useMemo(
    () => myPlaylists.some((playlist) => playlist.id === id),
    [myPlaylists, id]
  );

  const onToggle = () => {
    dispatch(yourLibraryActions.fetchMyPlaylists());
  };

  return isSaved ? (
    <UnfollowPlaylist size={32} id={id} onToggle={onToggle} />
  ) : (
    <FollowPlaylist size={32} id={id} onToggle={onToggle} />
  );
};
