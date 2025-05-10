import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { searchService } from '../../services/search';

const initialState = {
  songs: [],
  playlists: [],
  artists: [],
  albums: [],
  users: [],
  loading: true,
  section: 'ALL',
  songsTotal: 0,
};

const fetchSearch = createAsyncThunk('search/fetchSearch', async (query) => {
  const response = await searchService.fetchSearch(query);
  return response;
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSection(state, action) {
      state.section = action.payload;
    },
    setSavedStateForTrack(state, action) {
      const { id, saved } = action.payload;
      const track = state.songs.find((t) => t.id === id);
      if (track) {
        track.saved = saved;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.songs = action.payload.songs?.length > 0 ? action.payload.songs : [];
      state.artists = action.payload.artists.length > 0 ? action.payload.artists : [];
      state.albums = action.payload.albums.length > 0 ? action.payload.albums : [];
      state.playlists = action.payload.playlists.length > 0 ? action.payload.playlists : [];
      state.users = action.payload.users.length > 0 ? action.payload.users : [];
      state.songsTotal = action.payload.songs?.length;
      state.loading = false;
    });
    builder.addCase(fetchSearch.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const searchActions = {
  fetchSearch,
  ...searchSlice.actions,
};

export default searchSlice.reducer;
