import React, { memo, useEffect } from 'react';

// Components
import HomePageContainer from './container';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { homeActions } from '../../store/slices/home';

const Home = memo(({ container }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => !!state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(homeActions.fetchTopTracks());
      dispatch(homeActions.fetchMadeForYou());
      dispatch(homeActions.fetchRecentlyPlayed());
    }
    dispatch(homeActions.fetchRanking());
    dispatch(homeActions.fetchTrending());
    dispatch(homeActions.fetchNewReleases());
    dispatch(homeActions.fecthFeaturedPlaylists());
  }, [user, dispatch]);

  return <HomePageContainer container={container} />;
});

export default Home;
