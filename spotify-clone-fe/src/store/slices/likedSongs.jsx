import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  total: 0,
  items: [],
};

const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState,
  reducers: {
    removeSong: (state, action) => {
      state.items = state.items.filter((item) => item.track.id !== action.payload.id);
      state.total -= 1;
    },
    setLikedSongs: (state, action) => {
      state.items = action.payload.items;
      state.total = action.payload.total;
    },
    addMoreLikedSongs: (state, action) => {
      state.items.push(...action.payload);
    },
  },
});

export const likedSongsActions = {
  ...likedSongsSlice.actions,
};

export default likedSongsSlice.reducer;