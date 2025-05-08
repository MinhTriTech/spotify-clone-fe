import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { artistService } from '../../services/artist';

const initialState = {
  artist: null,
  topTracks: [],
  following: false,
  albums: [],
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
        state.artist = null;
        state.topTracks = [];
        state.albums = [];
        state.following = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.artist = action.payload.artist;
      state.topTracks = action.payload.songs;
      state.albums = action.payload.albums;
      state.following = action.payload.is_following;
    });
  },
});

export const artistActions = {
  fetchArtist,
  ...artistSlice.actions,
};

export default artistSlice.reducer;
