import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// // Services
import { playlistService } from '../../services/playlists';

const initialState = {
  topTracks: [],
  section: 'ALL',
  featurePlaylists: [],
};

export const fetchTopTracks = createAsyncThunk('home/fetchTopTracks', async () => {
  const response = await playlistService.fetchTopTracks();
  return response.data;
});

export const fecthFeaturedPlaylists = createAsyncThunk('home/fecthFeaturedPlaylists', async () => {
  const response = await playlistService.getFeaturedPlaylists();
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
  },
});

export const homeActions = {
  ...homeSlice.actions,
  fetchTopTracks,
  fecthFeaturedPlaylists,
};

export default homeSlice.reducer;
