import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userService } from '../../services/users';

const initialState = {
  items: [],
};

export const fetchLikeSongs = createAsyncThunk(
  'likedSongs/fetchLikeSongs',
  async () => {
    const response = await userService.getSavedTracks();
    return response.data;
  }
);

const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState,
  reducers: {
    removeSong: (state, action) => {
      state.items = state.items.filter((item) => item.track.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLikeSongs.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const likedSongsActions = {
  ...likedSongsSlice.actions,
  fetchLikeSongs,
};

export default likedSongsSlice.reducer;
