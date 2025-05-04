import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { playlistService } from '../../services/playlists';

const initialState = {
  topTracks: [],
  featurePlaylists: [],
  songsOfFeaturePlaylists: [],
  songsOfLikedSongs: [],
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

export const getSongsOfLikedSongs = createAsyncThunk('home/getSongsOfLikedSongs', async () => {
  const response = await playlistService.getSongsOfLikedSongs();
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
    builder.addCase(fetchSongsOfFeaturedPlaylists.fulfilled, (state, action) => {
      state.songsOfFeaturePlaylists = action.payload;
    });
    builder.addCase(getSongsOfLikedSongs.fulfilled, (state, action) => {
      state.songsOfLikedSongs = action.payload;
    });
  },
});

export const homeActions = {
  ...homeSlice.actions,
  fetchTopTracks,
  fecthFeaturedPlaylists,
  fetchSongsOfFeaturedPlaylists,
  getSongsOfLikedSongs,
};

export default homeSlice.reducer;
