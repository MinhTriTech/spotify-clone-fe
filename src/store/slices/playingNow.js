import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { artistService } from '../../services/artist';
import { albumsService } from '../../services/albums';
import { playlistService } from '../../services/playlists';

const initialState = {
  artist: null,
  album: null,
  playlist: null,
};

export const fetchArtist = createAsyncThunk(
  'playingNow/fetchArtist',
  async (id, { getState }) => {
    const state = getState();
    if (state.playingNow.artist?.id === id) {
      return state.playingNow.artist;
    }
    const response = await artistService.fetchArtist(id);
    return response.data;
  }
);

export const fetchPlaylist = createAsyncThunk(
  'playingNow/fetchPlaylist',
  async (id, { getState }) => {
    const state = getState();
    if (state.playingNow.playlist?.id === id) {
      return state.playingNow.playlist;
    }
    const response = await playlistService.getPlaylist(id);
    return response.data;
  }
);

export const fetchAlbum = createAsyncThunk(
  'playingNow/fetchAlbum',
  async (id, { getState }) => {
    const state = getState();
    if (state.playingNow.album?.id === id) {
      return state.playingNow.album;
    }
    const response = await albumsService.fetchAlbum(id);
    return response.data;
  }
);

const playingNowSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.artist = action.payload;
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload;
      state.album = null;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.album = action.payload;
      state.playlist = null;
    });
  },
});

export const playingNowActions = {
  fetchAlbum,
  fetchArtist,
  fetchPlaylist,
  ...playingNowSlice.actions,
};

export default playingNowSlice.reducer;
