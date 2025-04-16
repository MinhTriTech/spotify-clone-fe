import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { authService } from '../../services/auth'; // Dịch vụ liên quan đến auth

// Lấy token từ localStorage với hạn sử dụng (nếu có)
const getFromLocalStorageWithExpiry = (key) => {
  const item = localStorage.getItem(key);
  if (!item) return null;
  const parsedItem = JSON.parse(item);
  const now = new Date();
  if (now.getTime() > parsedItem.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return parsedItem.value;
};

const initialState = {
  user: undefined,
  requesting: true,
  playerLoaded: false,
  token: getFromLocalStorageWithExpiry('access_token') || undefined,
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async () => {
  const response = await authService.fetchUser();
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRequesting(state, action) {
      state.requesting = action.payload.requesting;
    },
    setToken(state, action) {
      state.token = action.payload.token;
    },
    setPlayerLoaded(state, action) {
      state.playerLoaded = action.payload.playerLoaded;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.requesting = false;
    });
  },
});

export const authActions = { ...authSlice.actions, fetchUser };

export default authSlice.reducer;
