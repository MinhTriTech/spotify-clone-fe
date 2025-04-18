import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { useDispatch, useSelector } from 'react-redux';
import { createTransform } from 'redux-persist';

// Reducers
import uiReducer from './slices/ui';
import authReducer from './slices/auth';
import homeReducer from './slices/home';
import albumReducer from './slices/album';
import queueReducer from './slices/queue';
import genreReducer from './slices/genre';
import searchReducer from './slices/search';
import browseReducer from './slices/browse';
import artistReducer from './slices/artist';
import profileReducer from './slices/profile';
import spotifyReducer from './slices/spotify';
import languageReducer from './slices/language';
import playlistReducer from './slices/playlist';
import likedSongsReducer from './slices/likedSongs';
import playingNowReducer from './slices/playingNow';
import yourLibraryReducer from './slices/yourLibrary';
import searchHistoryReducer from './slices/searchHistory';
import artistDiscographyReducer from './slices/discography';
import editPlaylistModalReducer from './slices/editPlaylistModal';
import expireReducer from 'redux-persist-expire';

// Combine reducers
const appReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  home: homeReducer,
  album: albumReducer,
  queue: queueReducer,
  genre: genreReducer,
  search: searchReducer,
  artist: artistReducer,
  browse: browseReducer,
  profile: profileReducer,
  spotify: spotifyReducer,
  language: languageReducer,
  playlist: playlistReducer,
  playingNow: playingNowReducer,
  likedSongs: likedSongsReducer,
  yourLibrary: yourLibraryReducer,
  searchHistory: searchHistoryReducer,
  artistDiscography: artistDiscographyReducer,
  editPlaylistModal: editPlaylistModalReducer,
});

// Root reducer with action to reset state on logout
const rootReducer = (state, action) => {
  if (action.type === 'auth/removeUser') {
    return appReducer(undefined, action); // Reset state on logout
  }
  return appReducer(state, action);
};

const uiTransform = createTransform(
  (inboundState, key) => {
    const { loginModalMain, ...rest } = inboundState;
    return rest; 
  },
  (outboundState, key) => {
    return outboundState;
  },
  { whitelist: ['ui'] }
);

// Whitelist for redux-persist (which states to persist)
const whitelist = ['language', 'ui', 'searchHistory'];

// Create persisted reducer with transformations (e.g., expiry for searchHistory)
const persistedReducer = persistReducer(
  {
    storage,
    whitelist,
    key: 'root',
    transforms: [
      uiTransform,
      expireReducer('searchHistory', { expireSeconds: 60 * 60 * 24 })],
  },
  rootReducer
);

// Configure Redux store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['spotify.player'], // Ignore specific paths from serializable check
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignore redux-persist actions
      },
    }),
});

// Exports for dispatch and selector hooks
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

// Persistor for redux-persist to manage state persistence
export const persistor = persistStore(store);
