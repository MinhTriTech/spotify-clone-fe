import { memo, useEffect } from 'react';
import NoSearchResults from '../NoResults';
import SearchAlbumsPageContainer from './container';

import { useParams } from 'react-router-dom';

import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

const SearchAlbumsPage = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const loading = useAppSelector((state) => state.search.loading);
  const albums = useAppSelector((state) => state.search.albums);

  useEffect(() => {
    dispatch(searchActions.setSection('ALBUMS'));
  }, [dispatch]);

  if (loading) return null;

  if (albums.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchAlbumsPageContainer {...props} />;
});

export default SearchAlbumsPage;
