import React, { Suspense, useRef, useEffect } from 'react';
import './styles/App.scss';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ConfigProvider } from 'antd';

// Redux
import { Provider } from 'react-redux';
import { store } from './store/store';

// Pages & Layout
import Home from './pages/Home';
import Page404 from './pages/404';
import AppLayout from './components/Layout';

const RoutesComponent = () => {
  const container = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = 0;
    }
  }, [location]);

  return (
    <div className="Main-section" ref={container} style={{ height: '100vh' }}>
      <div style={{ minHeight: 'calc(100vh - 230px)', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Home container={container} />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  return (
    <ConfigProvider theme={{ token: { fontFamily: 'SpotifyMixUI' } }}>
      <Provider store={store}>
        <Router>
          <AppLayout>
            <RoutesComponent />
          </AppLayout>
        </Router>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
