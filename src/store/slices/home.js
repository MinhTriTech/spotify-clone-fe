import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { playlistService } from '../../services/playlists';

const initialState = {
  topTracks: [],
  featurePlaylists: [],
  songsOfFeaturePlaylists: [],
  section: 'ALL',
};

export const fetchTopTracks = createAsyncThunk('home/fetchTopTracks', async () => {
  const response = await playlistService.fetchTopTracks();
  return response.data;
});

export const fecthFeaturedPlaylists = createAsyncThunk('home/fecthFeaturedPlaylists', async () => {
  const response = await playlistService.getFeaturedPlaylists();
  return response.data;
});

export const fetchSongsOfFeaturedPlaylists = createAsyncThunk(
  'home/fetchSongsOfFeaturedPlaylists',
  async (id) => {
    const response = await playlistService.getSongsOfFeaturedPlaylists(id);
    return response.data;
  }
);


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
    builder.addCase(fetchSongsOfFeaturedPlaylists.fulfilled, (state, action) => {
      state.songsOfFeaturePlaylists = action.payload;
    });
  },
});

export const homeActions = {
  ...homeSlice.actions,
  fetchTopTracks,
  fecthFeaturedPlaylists,
  fetchSongsOfFeaturedPlaylists,
};

export default homeSlice.reducer;
