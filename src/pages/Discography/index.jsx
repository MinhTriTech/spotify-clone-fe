import { memo, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import ArtistDiscographyContainer from './container';
import { artistDiscographyActions } from '../../store/slices/discography';

const ArtistDiscography = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    if (params.artistId) {
      dispatch(artistDiscographyActions.fetchData(params.artistId));
    }
    return () => {
      dispatch(artistDiscographyActions.setArtist({ artist: null }));
    };
  }, [dispatch, params.artistId]);

  return (
    <div>
      <ArtistDiscographyContainer container={props.container} />
    </div>
  );
});

export default ArtistDiscography;
