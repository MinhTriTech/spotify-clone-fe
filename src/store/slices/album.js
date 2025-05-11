import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { albumsService } from '../../services/albums';

const initialState = {
  album: null,
  tracks: [],
  artist: null,
  order: 'ALL',
  view: 'LIST',
};

export const fetchAlbum = createAsyncThunk(
  'album/fetchAlbum',
    async (id) => {
      const response = await albumsService.getAlbum(id);
      return response.data;
    }
);

export const getSongsOfAlbum = createAsyncThunk(
  'album/getSongsOfFeaturedAlbum',
  async (id) => {
    const response = await albumsService.getSongsOfAlbum(id);
    return response.data;
  }
);

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setAlbum(state, action) {
      state.album = action.payload.album;
      if (!action.payload.album) {
        state.tracks = [];
        state.artist = null;
        state.view = 'LIST';
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.album = action.payload.album;
      state.tracks = action.payload.songs;
      state.artist = action.payload.album.artist_id;
    });
  },
});

export const albumActions = {
  fetchAlbum,
  getSongsOfAlbum,
  ...albumSlice.actions,
};

export default albumSlice.reducer;
