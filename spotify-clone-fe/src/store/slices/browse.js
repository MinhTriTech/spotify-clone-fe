import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { categoriesService } from '../../services/categories';

const initialState = {
  loading: true,
  categories: [],
};

export const fetchCategories = createAsyncThunk('browse/fetchCategories', async (_, api) => {
  const user = api.getState().auth.user;
  const response = await categoriesService.fetchCategories({ limit: 50 });
  const items = response.data.categories.items;
  return user ? items : items.filter((item) => item.id);
});

const browseSlice = createSlice({
  name: 'browse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
