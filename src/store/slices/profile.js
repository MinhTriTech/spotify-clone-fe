import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  user: null,
  artists: [],
  playlists: [],
  following: false,
};

// 👉 MOCK generators
const mockTrack = (i) => ({
  id: `track-${i}`,
  name: `Track ${i}`,
  saved: false,
});

const mockArtist = (i) => ({
  id: `artist-${i}`,
  name: `Artist ${i}`,
  images: [{ url: 'https://via.placeholder.com/200' }],
});

const mockPlaylist = (i) => ({
  id: `playlist-${i}`,
  name: `Playlist ${i}`,
  public: true,
  images: [{ url: 'https://via.placeholder.com/200' }],
});

const mockUser = (id = 'mock-user') => ({
  id,
  display_name: 'Mock User',
  images: [{ url: 'https://via.placeholder.com/300' }],
});

export const fetchMyArtists = createAsyncThunk('profile/fetchMyArtists', async () => {
  return Array.from({ length: 5 }, (_, i) => mockArtist(i + 1));
});

export const fetchPlaylists = createAsyncThunk('profile/fetchMyPlaylists', async () => {
  return Array.from({ length: 5 }, (_, i) => mockPlaylist(i + 1));
});

export const fetchMyTracks = createAsyncThunk('profile/fetchMyTracks', async () => {
  return Array.from({ length: 5 }, (_, i) => ({
    ...mockTrack(i + 1),
    saved: Math.random() < 0.5,
  }));
});

export const fetchCurrentUserData = createAsyncThunk('profile/fetchCurrentUserData', async () => {
  const artists = Array.from({ length: 4 }, (_, i) => mockArtist(i + 1));
  const tracks = Array.from({ length: 4 }, (_, i) => ({
    ...mockTrack(i + 1),
    saved: Math.random() < 0.5,
  }));
  return [artists, tracks];
});

export const fetchUser = createAsyncThunk('profile/fetchUser', async (id) => {
  const userData = mockUser(id);
  const playlists = Array.from({ length: 5 }, (_, i) => mockPlaylist(i + 1));
  const following = true;

  return [userData, playlists, following];
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
      state.following = false;
      state.playlists = [];
      state.artists = [];
      state.songs = [];
    },
    setLinkedStateForTrack: (state, action) => {
      state.songs = state.songs.map((track) =>
        track.id === action.payload.id
          ? { ...track, saved: action.payload.saved }
          : track
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload[0];
      state.playlists = action.payload[1];
      state.following = action.payload[2];
    });
    builder.addCase(fetchMyArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
    });
    builder.addCase(fetchCurrentUserData.fulfilled, (state, action) => {
      state.artists = action.payload[0];
      state.songs = action.payload[1];
    });
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      state.playlists = action.payload.filter((p) => p.public);
    });
    builder.addCase(fetchMyTracks.fulfilled, (state, action) => {
      state.songs = action.payload;
    });
  },
});

export const profileActions = {
  fetchUser,
  fetchPlaylists,
  fetchMyArtists,
  fetchMyTracks,
  ...profileSlice.actions,
};

export default profileSlice.reducer;
