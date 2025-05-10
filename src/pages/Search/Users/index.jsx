import { memo, useEffect } from 'react';

import SearchUsersPageContainer from './container';
import NoSearchResults from '../NoResults';

import { useParams } from 'react-router-dom';

import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

const SearchUsersPage = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams();

  const loading = useAppSelector((state) => state.search.loading);
  const users = useAppSelector((state) => state.search.users);

  useEffect(() => {
    dispatch(searchActions.setSection('USERS'));
  }, [dispatch]);

  if (loading) return null;

  if (users.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return <SearchUsersPageContainer {...props} />;
});

export default SearchUsersPage;
