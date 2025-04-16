import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  artist: null,
  tracks: [],
  album: null,
  otherAlbums: [],
  loading: true,
  following: false,
  order: 'ALL',
  view: 'LIST',
};

// ✅ Mock fetchAlbum
export const fetchAlbum = createAsyncThunk('album/fetchAlbum', async (id) => {
  // 👉 Giả lập dữ liệu album
  const album = {
    id,
    name: 'Mock Album',
    artists: [{ id: 'artist-1', name: 'Mock Artist' }],
    images: [{ url: 'https://via.placeholder.com/300' }],
    uri: `spotify:album:${id}`,
  };

  // 👉 Giả lập danh sách track
  const tracks = Array.from({ length: 10 }, (_, i) => ({
    id: `track-${i + 1}`,
    name: `Track ${i + 1}`,
    uri: `spotify:track:track-${i + 1}`,
    saved: false,
  }));

  // 👉 Giả lập artist
  const artist = {
    id: 'artist-1',
    name: 'Mock Artist',
    images: [{ url: 'https://via.placeholder.com/300' }],
  };

  // 👉 Giả lập các album khác của artist
  const otherAlbums = Array.from({ length: 5 }, (_, i) => ({
    id: `other-album-${i + 1}`,
    name: `Other Album ${i + 1}`,
    images: [{ url: 'https://via.placeholder.com/300' }],
  }));

  // 👉 Giả lập người dùng không follow artist
  const following = false;

  return [album, tracks, following, artist, otherAlbums];
});

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    setFollowing(state, action) {
      state.following = action.payload.following;
    },
    setAlbum(state, action) {
      state.album = action.payload.album;
      if (!action.payload.album) {
        state.tracks = [];
        state.following = false;
        state.loading = true;
        state.artist = null;
        state.view = 'LIST';
      }
    },
    setView(state, action) {
      state.view = action.payload.view;
    },
    setOrder(state, action) {
      state.order = action.payload.order;
    },
    updateTrackLikeState(state, action) {
      const index = state.tracks.findIndex((track) => track.id === action.payload.id);
      if (index !== -1) {
        state.tracks[index].saved = action.payload.saved;
      }
    },
    resetOrder(state, action) {
      state.order = action.payload.order || 'ALL';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, action) => {
      state.album = action.payload[0];
      state.tracks = action.payload[1];
      state.following = action.payload[2];
      state.artist = action.payload[3];
      state.otherAlbums = action.payload[4];
      state.loading = false;
    });
  },
});

export const albumActions = {
  fetchAlbum,
  ...albumSlice.actions,
};

export default albumSlice.reducer;
