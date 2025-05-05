import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { artistService } from '../../services/artist';

const initialState = {
  topTracks: [],
  artist: null,
  loading: true,
  following: false,
};

export const fetchArtist = createAsyncThunk(
  'artist/fetchArtist',
  async (id) => {
    const data = await artistService.fetchArtist(id);
    return data;
  }
);

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    setFollowing(state, action) {
      state.following = action.payload.following;
    },
    setArtist(state, action) {
      state.artist = action.payload.artist;
      if (!action.payload.artist) {
        state.topTracks = [];
        state.following = false;
        state.loading = true;
        state.artist = null;
      }
    },
    setTopSongLikeState(state, action) {
      state.topTracks = state.topTracks.map((track) =>
        track.id === action.payload.id ? { ...track, saved: action.payload.saved } : track
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.artist = action.payload.artist;
      state.following = action.payload.is_following;
      state.topTracks = action.payload.songs;
      state.loading = false;
    });
  },
});

export const artistActions = {
  fetchArtist,
  ...artistSlice.actions,
};

export default artistSlice.reducer;
