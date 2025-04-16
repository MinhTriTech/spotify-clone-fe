import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  topTracks: [],
  albums: [],
  artist: null,
  otherArtists: [],
  loading: true,
  following: false,
  singles: [],
  appearsOn: [],
  compilations: [],
};

// 👉 Fake generator
const mockTrack = (id) => ({
  id: `track-${id}`,
  name: `Track ${id}`,
  saved: false,
});

const mockAlbum = (id, group = 'album') => ({
  id: `album-${group}-${id}`,
  name: `${group.toUpperCase()} ${id}`,
  images: [{ url: 'https://via.placeholder.com/300' }],
});

const mockArtist = (id) => ({
  id,
  name: `Artist ${id}`,
  followers: { total: 100000 },
  images: [{ url: 'https://via.placeholder.com/400' }],
});

export const fetchArtist = createAsyncThunk('artist/fetchArtist', async (id, { getState }) => {
  const user = getState().auth.user;

  const artist = mockArtist(id);
  const following = !!user; // nếu có user thì coi như đang follow
  const topTracks = Array.from({ length: 5 }, (_, i) => mockTrack(i + 1));
  const albums = Array.from({ length: 4 }, (_, i) => mockAlbum(i + 1, 'album'));
  const singles = Array.from({ length: 3 }, (_, i) => mockAlbum(i + 1, 'single'));
  const appearsOn = Array.from({ length: 2 }, (_, i) => mockAlbum(i + 1, 'appears_on'));
  const compilations = Array.from({ length: 1 }, (_, i) => mockAlbum(i + 1, 'compilation'));

  return [artist, following, topTracks, [albums, singles, appearsOn, compilations]];
});

export const fetchOtherArtists = createAsyncThunk('artist/fetchOtherArtists', async (id) => {
  return Array.from({ length: 4 }, (_, i) => mockArtist(`similar-${i + 1}`));
});

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
        state.albums = [];
        state.singles = [];
        state.appearsOn = [];
        state.compilations = [];
        state.topTracks = [];
        state.following = false;
        state.loading = true;
        state.artist = null;
        state.otherArtists = [];
      }
    },
    setTopSongLikeState(state, action) {
      state.topTracks = state.topTracks.map((track) =>
        track.id === action.payload.id
          ? { ...track, saved: action.payload.saved }
          : track
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArtist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArtist.fulfilled, (state, action) => {
      state.artist = action.payload[0];
      state.following = action.payload[1];
      state.topTracks = action.payload[2];
      state.albums = action.payload[3][0];
      state.singles = action.payload[3][1];
      state.appearsOn = action.payload[3][2];
      state.compilations = action.payload[3][3];
      state.loading = false;
    });
    builder.addCase(fetchOtherArtists.fulfilled, (state, action) => {
      state.otherArtists = action.payload;
    });
  },
});

export const artistActions = {
  fetchArtist,
  fetchOtherArtists,
  ...artistSlice.actions,
};

export default artistSlice.reducer;
