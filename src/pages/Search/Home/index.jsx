import { memo, useEffect } from 'react';

import SearchPageContainer from './container';

import { useParams } from 'react-router-dom';

import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

import NoSearchResults from '../NoResults';

export const SearchPage = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  
  const loading = useAppSelector((state) => state.search.loading);
  const songs = useAppSelector((state) => state.search.songs);
  const artists = useAppSelector((state) => state.search.artists);
  const playlists = useAppSelector((state) => state.search.playlists);
  const albums = useAppSelector((state) => state.search.albums);
  const users = useAppSelector((state) => state.search.users);

  useEffect(() => {
    dispatch(searchActions.setSection('ALL'));
  }, [dispatch]);

  useEffect(() => {
    if (params.search) {
      dispatch(searchActions.fetchSearch(params.search));
    }
  }, [dispatch, params.search]);

  if (loading) return null;

  if (songs.length < 1 && artists.length < 1 && playlists.length < 1 && albums.length < 1 && users.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchPageContainer {...props} />;
});

export default SearchPage;
