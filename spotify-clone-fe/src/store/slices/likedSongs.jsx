import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Constants
import { userService } from '../../services/users';

const initialState = {
  total: 0,
  items: [],
};

export const fetchLikeSongs = createAsyncThunk(
  'likedSongs/fetchLikeSongs',
  async () => {
    const response = await userService.getSavedTracks({ limit: 50 });
    return [response.data.items, response.data.total];
  }
);

export const fetchMore = createAsyncThunk(
  'likedSongs/fetchMore',
  async (_, api) => {
    const {
      likedSongs: { items },
    } = api.getState();
    const response = await userService.getSavedTracks({ limit: 50, offset: items.length });
    return response.data.items;
  }
);

const likedSongsSlice = createSlice({
  name: 'likedSongs',
  initialState,
  reducers: {
    removeSong: (state, action) => {
      state.items = state.items.filter((item) => item.track.id !== action.payload.id);
      state.total -= 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLikeSongs.fulfilled, (state, action) => {
      state.items = action.payload[0];
      state.total = action.payload[1];
    });
    builder.addCase(fetchMore.fulfilled, (state, action) => {
      state.items.push(...action.payload);
    });
  },
});

export const likedSongsActions = {
  ...likedSongsSlice.actions,
  fetchLikeSongs,
  fetchMore,
};

export default likedSongsSlice.reducer;
