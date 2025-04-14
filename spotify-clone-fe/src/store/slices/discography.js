import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { artistService } from '../../services/artist';

// Initial state with default values
const initialState = {
  artist: null,
  filter: 'All',
  loading: true,
  albums: [],
  singles: [],
  compilations: [],
};

// Asynchronous action to fetch artist data and albums
const fetchData = createAsyncThunk(
  'discography/fetchData',
  async (id) => {
    const promises = [
      artistService.fetchArtist(id),
      artistService.fetchArtistAlbums(id, { limit: 50, include_groups: 'album' }),
      artistService.fetchArtistAlbums(id, { limit: 50, include_groups: 'single' }),
      artistService.fetchArtistAlbums(id, { limit: 50, include_groups: 'compilation' }),
    ];

    const responses = await Promise.all(promises);

    const artist = responses[0].data;
    const albums = responses[1].data.items;
    const singles = responses[2].data.items;
    const compilations = responses[3].data.items;

    return [artist, [albums, singles, compilations]];
  }
);

const artistDiscographySlice = createSlice({
  name: 'discography',
  initialState,
  reducers: {
    setArtist(state, action) {
      state.artist = action.payload.artist;
      if (!action.payload.artist) {
        state.albums = [];
        state.singles = [];
        state.compilations = [];
        state.loading = true;
        state.artist = null;
      }
    },
    setFilter(state, action) {
      state.filter = action.payload.filter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.artist = action.payload[0];
      state.albums = action.payload[1][0];
      state.singles = action.payload[1][1];
      state.compilations = action.payload[1][2];
      state.loading = false;
    });
  },
});

// Exporting actions and reducer for use in the store
export const artistDiscographyActions = {
  fetchData,
  ...artistDiscographySlice.actions,
};

export default artistDiscographySlice.reducer;
