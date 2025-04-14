import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { categoriesService } from '../../services/categories';

const initialState = {
  category: null,
  playlists: [],
  loading: true,
};

export const fetchGenre = createAsyncThunk('genre/fetchGenre', async (id) => {
  const promises = [
    categoriesService.fetchCategory(id),
    categoriesService.fetchCategoryPlaylists(id, { limit: 50 }),
  ];

  const responses = await Promise.all(promises);
  const category = responses[0].data;
  const {
    playlists: { items },
  } = responses[1].data;

  return [category, items];
});

const genreSlice = createSlice({
  name: 'genre',
  initialState,
  reducers: {
    setGenre: (state, action) => {
      state.category = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGenre.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchGenre.fulfilled, (state, action) => {
      state.category = action.payload[0];
      state.playlists = action.payload[1];
      state.loading = false;
    });
  },
});

export const genreActions = {
  fetchGenre,
  ...genreSlice.actions,
};

export default genreSlice.reducer;
