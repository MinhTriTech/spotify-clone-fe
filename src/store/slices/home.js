import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { playlistService } from '../../services/playlists';

const initialState = {
  topTracks: [],
  featurePlaylists: [],
  artists: [],
  section: 'ALL',
};

export const fetchTopTracks = createAsyncThunk('home/fetchTopTracks', async () => {
  const response = await playlistService.fetchTopTracks();
  return response.data;
});

export const fecthFeaturedPlaylists = createAsyncThunk('home/fecthFeaturedPlaylists', async () => {
  const response = await playlistService.fecthPlaylists();
  return response.data;
});

export const fecthArtists = createAsyncThunk('home/fecthArtists', async () => {
  const response = await playlistService.fecthArtists();
  return response.data;
});

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSection(state, action) {
      state.section = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTopTracks.fulfilled, (state, action) => {
      state.topTracks = action.payload;
    });
    builder.addCase(fecthFeaturedPlaylists.fulfilled, (state, action) => {
      state.featurePlaylists = action.payload;
    });
    builder.addCase(fecthArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
    });
  },
});

export const homeActions = {
  ...homeSlice.actions,
  fetchTopTracks,
  fecthFeaturedPlaylists,
  fecthArtists,
};

export default homeSlice.reducer;
