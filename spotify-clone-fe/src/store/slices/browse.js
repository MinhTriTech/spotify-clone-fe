import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: true,
  categories: [],
};

// 👉 Tạo mock danh sách thể loại nhạc
const mockCategory = (id) => ({
  id: `category-${id}`,
  name: `Mock Category ${id}`,
  icons: [
    {
      url: 'https://via.placeholder.com/150',
    },
  ],
});

export const fetchCategories = createAsyncThunk('browse/fetchCategories', async (_, api) => {
  const user = api.getState().auth.user;
  const categories = Array.from({ length: 12 }, (_, i) => mockCategory(i + 1));
  return user ? categories : categories.filter((item) => item.id);
});

const browseSlice = createSlice({
  name: 'browse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
    });
  },
});

export const browseActions = {
  ...browseSlice.actions,
  fetchCategories,
};

export default browseSlice.reducer;
