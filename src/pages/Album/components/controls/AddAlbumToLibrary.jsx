import { memo, useCallback } from 'react';

// Components
import { Tooltip } from '../../../../components/Tooltip';
import { AddedToLibrary, AddToLibrary } from '../../../../components/Icons';

// Services
import { albumsService } from '../../../../services/albums';

// Redux
import { uiActions } from '../../../../store/slices/ui';
import { albumActions } from '../../../../store/slices/album';
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';

const FollowAlbum = ({ id, size, onToggle }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const handleAddToLibrary = () => {
    if (!user) return dispatch(uiActions.openLoginTooltip());
    return albumsService.saveAlbums([id]).then(() => {
      dispatch(albumActions.setFollowing({ following: true }));
      onToggle();
    });
  };

  return (
    <Tooltip title="Add to Your Library">
      <button onClick={handleAddToLibrary}>
        <AddToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

const UnfollowAlbum = ({ id, size, onToggle }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  const handleDeleteFromLibrary = useCallback(() => {
    if (!user) return dispatch(uiActions.openLoginTooltip());
    return albumsService.deleteAlbums([id]).then(() => {
      dispatch(albumActions.setFollowing({ following: false }));
      onToggle();
    });
  }, [dispatch, id, onToggle, user]);

  return (
    <Tooltip title="Remove from Your Library">
      <button onClick={handleDeleteFromLibrary}>
        <AddedToLibrary height={size} width={size} />
      </button>
    </Tooltip>
  );
};

export const AddAlbumToLibraryButton = memo(({ id }) => {
  const dispatch = useAppDispatch();
  const isSaved = useAppSelector((state) => state.album.following);

  const onToggle = useCallback(() => {
    dispatch(yourLibraryActions.fetchMyAlbums());
  }, [dispatch]);

  return isSaved ? (
    <UnfollowAlbum size={32} id={id} onToggle={onToggle} />
  ) : (
    <FollowAlbum size={32} id={id} onToggle={onToggle} />
  );
});
