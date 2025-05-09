import React, { memo, useEffect } from 'react';

import SearchPageContainer from './container';

import { useParams } from 'react-router-dom';

import { searchActions } from '../../../store/slices/search';
import { useAppDispatch, useAppSelector } from '../../../store/store';

export const SearchPage = memo((props) => {
  const dispatch = useAppDispatch();
  const params = useParams();
  
  const loading = useAppSelector((state) => state.search.loading);

  useEffect(() => {
    dispatch(searchActions.setSection('ALL'));
  }, [dispatch]);

  useEffect(() => {
    if (params.search) {
      dispatch(searchActions.fetchSearch(params.search));
    }
  }, [dispatch, params.search]);

  if (loading) return null;

  return <SearchPageContainer {...props} />;
});

export default SearchPage;
