import React, { memo } from 'react';
import HomePageContainer from './container';

const Home = memo(({ container }) => {
  return <HomePageContainer container={container} />;
});

export default Home;
