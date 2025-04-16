import { createSlice } from '@reduxjs/toolkit';

// Initial state with an array of items (which can be Playlist, Album, Track, or Artist)
const initialState = {
  items: [],
};

const searchHistoryActionsSlice = createSlice({
  name: 'searchHistory',
  initialState,
  reducers: {
    setItem(state, action) {
      // Add a new item at the beginning of the items array
      state.items.unshift(action.payload);
    },
    clearItems(state) {
      // Clear all items in the state
      state.items = [];
    },
    removeItem(state, action) {
      // Remove an item by its id
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const searchHistoryActions = {
  ...searchHistoryActionsSlice.actions,
};

export default searchHistoryActionsSlice.reducer;
