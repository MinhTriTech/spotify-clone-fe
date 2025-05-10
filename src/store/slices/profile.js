import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userService } from '../../services/users';

const initialState = {
  user: null,
  playlists: [],
};

const fetchUser = createAsyncThunk(
  'profile/fetchUser',
  async (id) => {
    const response = await userService.getUser(id);
    return response.data;
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
      state.playlists = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.playlists = action.payload.playlists;
    });
  },
});

export const profileActions = {
  fetchUser,
  ...profileSlice.actions,
};

export default profileSlice.reducer;
