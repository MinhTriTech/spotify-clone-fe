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

import uiReducer from './slices/ui';
import authReducer from './slices/auth';
import homeReducer from './slices/home';
import albumReducer from './slices/album';
import searchReducer from './slices/search';
import artistReducer from './slices/artist';
import profileReducer from './slices/profile';
import spotifyReducer from './slices/spotify';
import playlistReducer from './slices/playlist';
import likedSongsReducer from './slices/likedSongs';
import yourLibraryReducer from './slices/yourLibrary';
import searchHistoryReducer from './slices/searchHistory';
import editPlaylistModalReducer from './slices/editPlaylistModal';
import deletePlaylistModalReducer from './slices/deletePlaylistModal';
import messageReducer from './slices/message';
import expireReducer from 'redux-persist-expire';

const appReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  home: homeReducer,
  album: albumReducer,
  search: searchReducer,
  artist: artistReducer,
  profile: profileReducer,
  spotify: spotifyReducer,
  playlist: playlistReducer,
  likedSongs: likedSongsReducer,
  yourLibrary: yourLibraryReducer,
  searchHistory: searchHistoryReducer,
  editPlaylistModal: editPlaylistModalReducer,
  deletePlaylistModal: deletePlaylistModalReducer,
  message: messageReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/removeUser') {
    return appReducer(undefined, action); 
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

const whitelist = ['language', 'ui', 'searchHistory'];

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

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredPaths: ['spotify.player'], 
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;

export const persistor = persistStore(store);
