import React, { Suspense, useRef, useEffect } from 'react';
import './styles/App.scss';

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';

import { store, persistor } from './store/store';
import Home from './pages/Home';
import Page404 from './pages/404';
import { AppLayout } from './components/Layout';

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
          <Route path="/" element={<Suspense><Home container={container} /></Suspense>} />
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
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <AppLayout>
              <RoutesComponent />
            </AppLayout>
          </Router>
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
