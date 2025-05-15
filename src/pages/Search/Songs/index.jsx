import { memo, useEffect } from 'react';

import NoSearchResults from '../NoResults';
import SearchSongsPageContainer from './container';

import { useParams } from 'react-router-dom';

import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

const SearchSongsPage = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const loading = useAppSelector((state) => state.search.loading);
  const songs = useAppSelector((state) => state.search.songs);

  useEffect(() => {
    dispatch(searchActions.setSection('TRACKS'));
  }, [dispatch]);

  if (loading) return null;

  if (songs.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchSongsPageContainer {...props} query={params.search} />;
});

export default SearchSongsPage;
