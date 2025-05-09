import { memo, useEffect } from 'react';

import NoSearchResults from '../NoResults';
import SearchPlaylistPageContainer from './container';

import { useParams } from 'react-router-dom';

import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

const SearchPlaylistPage = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const playlists = useAppSelector((state) => state.search.playlists);

  useEffect(() => {
    dispatch(searchActions.setSection('PLAYLISTS'));
  }, [dispatch]);

  if (!playlists) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchPlaylistPageContainer {...props} />;
});

export default SearchPlaylistPage;
