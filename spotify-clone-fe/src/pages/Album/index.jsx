// Utils
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

// Redux
import { useAppDispatch } from '../../store/store';
import { albumActions } from '../../store/slices/album';

// Constants
import AlbumPageContainer from './container';

const AlbumPage = (props) => {
  const dispatch = useAppDispatch();
  const { albumId } = useParams();

  useEffect(() => {
    if (albumId) dispatch(albumActions.fetchAlbum(albumId));
    return () => {
      dispatch(albumActions.setAlbum({ album: null }));
    };
  }, [dispatch, albumId]);

  return <AlbumPageContainer container={props.container} />;
};

AlbumPage.displayName = 'AlbumPage';

export default AlbumPage;
