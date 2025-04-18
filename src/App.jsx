import './styles/App.scss';

// Utils
import { Suspense, lazy, memo, useCallback, useEffect, useMemo, useRef } from 'react';

// Components
import { ConfigProvider } from 'antd';
import AppLayout from './components/Layout';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { uiActions } from './store/slices/ui';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store, useAppDispatch, useAppSelector } from './store/store';
import { fetchUser } from './store/slices/auth';

// Pages
import SearchContainer from './pages/Search/Container';
import { Spinner } from './components/spinner';

const LoginPage = lazy(() => import('./pages/Login'));
const AdminLayout = lazy(() => import('./pages/Admin'));
const Home = lazy(() => import('./pages/Home'));
const Page404 = lazy(() => import('./pages/404'));
const AlbumView = lazy(() => import('./pages/Album'));
const GenrePage = lazy(() => import('./pages/Genre'));
const BrowsePage = lazy(() => import('./pages/Browse'));
const ArtistPage = lazy(() => import('./pages/Artist'));
const PlaylistView = lazy(() => import('./pages/Playlist'));
const ArtistDiscographyPage = lazy(() => import('./pages/Discography'));

const Profile = lazy(() => import('./pages/User/Home'));
const ProfileTracks = lazy(() => import('./pages/User/Songs'));
const ProfileArtists = lazy(() => import('./pages/User/Artists'));
const ProfilePlaylists = lazy(() => import('./pages/User/Playlists'));

const SearchPage = lazy(() => import('./pages/Search/Home'));
const SearchTracks = lazy(() => import('./pages/Search/Songs'));
const LikedSongsPage = lazy(() => import('./pages/LikedSongs'));
const SearchAlbums = lazy(() => import('./pages/Search/Albums'));
const SearchPlaylist = lazy(() => import('./pages/Search/Playlists'));
const SearchPageArtists = lazy(() => import('./pages/Search/Artists'));
const RecentlySearched = lazy(() => import('./pages/Search/RecentlySearched'));

window.addEventListener('resize', () => {
  const vh = window.innerWidth;
  if (vh < 950) {
    store.dispatch(uiActions.collapseLibrary());
  }
});

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
      { path: '/artist/:artistId/discography', element: <ArtistDiscographyPage container={container} /> },
      { public: true, path: '/artist/:artistId', element: <ArtistPage container={container} /> },
      { path: '/users/:userId/artists', element: <ProfileArtists container={container} /> },
      { path: '/users/:userId/playlists', element: <ProfilePlaylists container={container} /> },
      { path: '/users/:userId/tracks', element: <ProfileTracks container={container} /> },
      { path: '/users/:userId', element: <Profile container={container} /> },
      { public: true, path: '/genre/:genreId', element: <GenrePage /> },
      { public: true, path: '/search', element: <BrowsePage /> },
      { path: '/recent-searches', element: <RecentlySearched /> },
      {
        public: true,
        path: '/search/:search',
        element: <SearchContainer container={container} />,
        children: [
          { path: 'artists', element: <SearchPageArtists container={container} /> },
          { path: 'albums', element: <SearchAlbums container={container} /> },
          { path: 'playlists', element: <SearchPlaylist container={container} /> },
          { path: 'tracks', element: <SearchTracks container={container} /> },
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
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => !!state.auth.user);
  const role = useAppSelector((state) => state.auth.role);
  const loading = useAppSelector((state) => state.auth.loading);
  const loginModalMain = useAppSelector((state) => !!state.ui.loginModalMain);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [dispatch, user]);
  

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

  if (loading) return <Spinner loading={loading}/>;

  if (!loginModalMain && !user) return <LoginPage />;

  if (role === true) {
    return (
      <Router>
        <AdminLayout />
      </Router>
    );
  }

  return (
    <Router>
      <AppLayout>
        <RoutesComponent />
      </AppLayout>
    </Router>
  );
};

function App() {
  return (
    <ConfigProvider theme={{ token: { fontFamily: 'SpotifyMixUI' } }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootComponent />
        </PersistGate>
      </Provider>
    </ConfigProvider>
  );
}

export default App;
