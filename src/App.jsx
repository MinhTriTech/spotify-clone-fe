import './styles/App.scss';

import { Suspense, lazy, memo, useCallback, useEffect, useMemo, useRef } from 'react';

import { App as AntdApp, ConfigProvider } from 'antd';
import AppLayout from './components/Layout';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

import {GoogleOAuthProvider} from '@react-oauth/google';

import { Provider } from 'react-redux';
import { uiActions } from './store/slices/ui';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store, useAppDispatch, useAppSelector } from './store/store';
import { fetchUser } from './store/slices/auth';

import { initSocket } from './services/socket';

import { AudioProvider, useAudio } from './contexts/AudioContext';

import SearchContainer from './pages/Search/Container';
import { Spinner } from './components/spinner';

const LoginPage = lazy(() => import('./pages/Login'));
const AdminLayout = lazy(() => import('./pages/Admin'));
const Home = lazy(() => import('./pages/Home'));
const Page404 = lazy(() => import('./pages/404'));
const AlbumView = lazy(() => import('./pages/Album'));
const Message = lazy(() => import('./pages/Message'));
const MessView = lazy(() => import('./pages/Message/components/MessView'));
const ArtistPage = lazy(() => import('./pages/Artist'));
const PlaylistView = lazy(() => import('./pages/Playlist'));

const Profile = lazy(() => import('./pages/User/Home'));

const SearchPage = lazy(() => import('./pages/Search/Home'));
const SearchTracks = lazy(() => import('./pages/Search/Songs'));
const LikedSongsPage = lazy(() => import('./pages/LikedSongs'));
const SearchAlbums = lazy(() => import('./pages/Search/Albums'));
const SearchPlaylists = lazy(() => import('./pages/Search/Playlists'));
const SearchArtists = lazy(() => import('./pages/Search/Artists'));
const SearchUsers = lazy(() => import('./pages/Search/Users'));

window.addEventListener('resize', () => {
  const vh = window.innerWidth;
  if (vh < 950) {
    store.dispatch(uiActions.collapseLibrary());
  }
});

const GlobalMedia = () => {
  const { audioRef, videoRef, currentTrack } = useAudio();

  return (
    <>
      <audio ref={audioRef} style={{ display: 'none' }} />
      {currentTrack?.video && (
        <video
          ref={videoRef}
          style={{ display: 'none' }}
          muted
          preload="auto"
        />
      )}
    </>
  );
};

const RoutesComponent = memo(() => {
  const location = useLocation();
  const container = useRef(null);
  const user = useAppSelector((state) => !!state.auth.user);

  useEffect(() => {
    if (container.current) {
      container.current.scrollTop = 0;
    }
  }, [location]);

  const routes = useMemo(() => {
    return [
      { path: '', element: <Home container={container} />, public: true },
      { path: '/collection/tracks', element: <LikedSongsPage container={container} /> },
      { public: true, path: '/playlist/:playlistId', element: <PlaylistView container={container} /> },
      { path: '/album/:albumId', element: <AlbumView container={container} /> },
      { path: '/message', element: <Message container={container} /> },
      { path: '/message/:idUser/:idChatRoom', element: <MessView container={container} /> },
      { path: '/message/:idUser', element: <MessView container={container} /> },
      { public: true, path: '/artist/:artistId', element: <ArtistPage container={container} /> },
      { path: '/users/:userId', element: <Profile container={container} /> },
      {
        public: true,
        path: '/search/:search',
        element: <SearchContainer container={container} />,
        children: [
          { path: 'tracks', element: <SearchTracks container={container} /> },
          { path: 'artists', element: <SearchArtists container={container} /> },
          { path: 'albums', element: <SearchAlbums container={container} /> },
          { path: 'playlists', element: <SearchPlaylists container={container} /> },
          { path: 'users', element: <SearchUsers container={container} /> },
          { path: '', element: <SearchPage container={container} /> },
        ],
      },
      { path: '*', element: <Page404 /> },
    ].filter((r) => (user ? true : r.public));
  }, [user]);

  return (
    <div className="Main-section" ref={container} style={{ height: user ? undefined : 'calc(100vh - 50px)' }}>
      <div style={{ minHeight: user ? 'calc(100vh - 230px)' : 'calc(100vh - 100px)', width: '100%' }}>
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={<Suspense>{route.element}</Suspense>}>
              {route.children?.map(child => (
                <Route key={child.path} path={child.path} element={<Suspense>{child.element}</Suspense>} />
              ))}
            </Route>
          ))}
        </Routes>
      </div>
    </div>
  );
});

const RootComponent = () => {
  const { resetAudio } = useAudio();
  const dispatch = useAppDispatch();
  const { user, role, loading, loginModalMain } = useAppSelector((state) => ({
    user: state.auth.user,
    role: state.auth.role,
    loading: state.ui.loading,
    loginModalMain: state.ui.loginModalMain,
  }));

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
      resetAudio();
    }
  }, [dispatch, user, resetAudio]);

  useEffect(() => {
    if (!user) return;
    const handleContextMenu = (e) => {
      e.preventDefault();
    };
    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [user]);

  if (loading) return <Spinner loading={loading} />;

  if (!loginModalMain && !user) return <LoginPage />;

  const Layout = role ? AdminLayout : AppLayout;

  return (
    <Router>
      <Layout>
        {!role && <RoutesComponent />}
      </Layout>
    </Router>
  )
};

function App() {
  useEffect(() => {
    initSocket();
  }, []);

  return (
    <ConfigProvider theme={{ token: { fontFamily: 'SpotifyMixUI' } }}>
      <AntdApp>
        <GoogleOAuthProvider clientId="674163388601-d7dk6m8us1j3duai1cp1ipejcoce3339.apps.googleusercontent.com">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <AudioProvider>
                <GlobalMedia />
                <RootComponent />
              </AudioProvider>
            </PersistGate>
          </Provider>
        </GoogleOAuthProvider>; 
      </AntdApp> 
    </ConfigProvider>
  );
}

export default App;
