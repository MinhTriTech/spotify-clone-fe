import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: null,
  playlists: [],
  loading: true,
};

// ✅ Mock fetchGenre
export const fetchGenre = createAsyncThunk('genre/fetchGenre', async (id) => {
  // ⚙️ Dữ liệu giả lập category
  const mockCategory = {
    id,
    name: `Mock Category: ${id}`,
    icons: [{ url: 'https://via.placeholder.com/150' }],
  };

  // ⚙️ Dữ liệu giả lập danh sách playlist trong category
  const mockPlaylists = Array.from({ length: 10 }, (_, i) => ({
    id: `mock-playlist-${i + 1}`,
    name: `Mock Playlist ${i + 1}`,
    description: `Description for playlist ${i + 1}`,
    images: [{ url: 'https://via.placeholder.com/300' }],
    owner: { id: 'mock-owner', name: 'Mock Owner' },
  }));

  return [mockCategory, mockPlaylists];
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
