import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artist: null,
  album: null,
  playlist: null,
  myAlbums: [],
  myArtists: [],
  myPlaylists: [],
  search: '',
  view: 'LIST',
  filter: 'ALL',
  orderBy: 'default',
  discography: {
    artist: null,
    filter: 'All',
    loading: true,
    albums: [],
    singles: [],
    compilations: [],
  },
};

const playingNowSlice = createSlice({
  name: 'playingNow',
  initialState,
  reducers: {
    setArtist: (state, action) => {
      state.artist = action.payload;
    },
    setAlbum: (state, action) => {
      state.album = action.payload;
      state.playlist = null;
    },
    setPlaylist: (state, action) => {
      state.playlist = action.payload;
      state.album = null;
    },
    setLibrarySearch: (state, action) => {
      state.search = action.payload;
    },
    setLibraryView: (state, action) => {
      state.view = action.payload;
    },
    setLibraryFilter: (state, action) => {
      state.filter = action.payload;
    },
    setLibraryOrderBy: (state, action) => {
      state.orderBy = action.payload;
    },
    setMyAlbums: (state, action) => {
      state.myAlbums = action.payload;
    },
    setMyArtists: (state, action) => {
      state.myArtists = action.payload;
    },
    setMyPlaylists: (state, action) => {
      state.myPlaylists = action.payload;
    },
    // Discography-specific reducers
    setDiscographyArtist: (state, action) => {
      state.discography.artist = action.payload;
    },
    setDiscographyFilter: (state, action) => {
      state.discography.filter = action.payload;
    },
    setDiscographyLoading: (state, action) => {
      state.discography.loading = action.payload;
    },
    setDiscographyAlbums: (state, action) => {
      state.discography.albums = action.payload;
    },
    setDiscographySingles: (state, action) => {
      state.discography.singles = action.payload;
    },
    setDiscographyCompilations: (state, action) => {
      state.discography.compilations = action.payload;
    },
  },
});

export const playingNowActions = {
  ...playingNowSlice.actions,
};

export default playingNowSlice.reducer;
