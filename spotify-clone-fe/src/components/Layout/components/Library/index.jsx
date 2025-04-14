import React, { useEffect } from 'react';
import YourLibrary from './list';

import { useAppDispatch, useAppSelector } from '../../../../store/store';
import { yourLibraryActions } from '../../../../store/slices/yourLibrary';

export const Library = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(yourLibraryActions.fetchMyAlbums());
      dispatch(yourLibraryActions.fetchMyArtists());
      dispatch(yourLibraryActions.fetchMyPlaylists());
    }
  }, [user, dispatch]);

  return (
    <div style={{ height: '100%' }}>
      <YourLibrary />
    </div>
  );
};

export default Library;
