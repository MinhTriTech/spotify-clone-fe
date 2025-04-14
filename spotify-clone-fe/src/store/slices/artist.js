import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { artistService } from '../../services/artist';

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

export const fetchArtist = createAsyncThunk(
  'artist/fetchArtist',
  async (id, params) => {
    const state = params.getState();
    const user = state.auth.user;

    const promises = [
      artistService.fetchArtist(id),
      user ? userService.checkFollowingArtists([id]) : Promise.resolve({ data: [false] }),
      artistService.fetchArtistTopTracks(id),
      artistService.fetchArtistAlbums(id, { limit: 10, include_groups: 'album' }),
      artistService.fetchArtistAlbums(id, { limit: 10, include_groups: 'single' }),
      artistService.fetchArtistAlbums(id, { limit: 10, include_groups: 'appears_on' }),
      artistService.fetchArtistAlbums(id, { limit: 10, include_groups: 'compilation' }),
    ];

    const responses = await Promise.all(promises);

    const artist = responses[0].data;
    const [following] = responses[1].data;

    const tracks = responses[2].data.tracks;
    const albums = responses[3].data.items;
    const singles = responses[4].data.items;

    const appearsOn = responses[5].data.items;
    const compilations = responses[6].data.items;

    const extraResponses = await Promise.all([
      userService.checkSavedTracks(tracks.map((track) => track.id)).catch(() => ({ data: [] })),
    ]);

    const saved = extraResponses[0].data;
    const itemsWithSave = tracks.map((item, index) => ({
      ...item,
      saved: saved[index],
    }));

    return [artist, following, itemsWithSave, [albums, singles, appearsOn, compilations]];
  }
);

const fetchOtherArtists = createAsyncThunk(
  'artist/fetchOtherArtists',
  async (id) => {
    const response = await artistService.fetchSimilarArtists(id);
    return response.data.artists;
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
        track.id === action.payload.id ? { ...track, saved: action.payload.saved } : track
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
