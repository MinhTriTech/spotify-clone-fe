import YourLibrary from './list';

// Redux
import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';

// React
import { useEffect } from 'react';

export const Library = () => {
  const dispatch = useAppDispatch();
  const hasUser = useAppSelector((state) => !!state.auth.user);

  useEffect(() => {
    if (hasUser) {
      dispatch(yourLibraryActions.fetchMyArtists());
      dispatch(yourLibraryActions.fetchMyPlaylists());
    }
  }, [hasUser, dispatch]);

  return (
    <div style={{ height: '100%' }}>
      <YourLibrary />
    </div>
  );
};

export default Library;
