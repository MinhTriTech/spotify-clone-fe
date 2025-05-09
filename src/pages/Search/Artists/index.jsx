import { memo, useEffect } from 'react';

import SearchArtistsPageContainer from './container';
import NoSearchResults from '../NoResults';

import { useParams } from 'react-router-dom';

import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

const SearchArtistsPage = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const loading = useAppSelector((state) => state.search.loading);
  const artists = useAppSelector((state) => state.search.artists);

  useEffect(() => {
    dispatch(searchActions.setSection('ARTISTS'));
  }, [dispatch]);

  if (loading) return null;

  if (!artists) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchArtistsPageContainer {...props} />;
});

export default SearchArtistsPage;
