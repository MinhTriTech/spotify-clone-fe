import { useEffect } from 'react';
import BrowsePageContainer from './container';

// Redux
import { useAppDispatch } from '../../store/store';
import { fetchCategories } from '../../store/slices/browse';

const BrowsePage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return <BrowsePageContainer />;
};

export default BrowsePage;
