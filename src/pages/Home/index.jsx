import { memo, useEffect } from 'react';

import HomePageContainer from './container';

import { homeActions } from '../../store/slices/home';
import { useAppDispatch, useAppSelector } from '../../store/store';

const Home = memo((props) => {
  const { container } = props;

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);
  useEffect(() => {
    if (user) {
      dispatch(homeActions.fetchTopTracks());
    }
    dispatch(homeActions.fecthFeaturedPlaylists());
    dispatch(homeActions.fecthArtists());
  }, [user, dispatch]);

  return <HomePageContainer container={container} />;
});

export default Home;
