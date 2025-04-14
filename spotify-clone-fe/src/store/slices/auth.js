import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Utils
import axios from '../../axios';
// import login from '../../utils/spotify/login'; // ❌ Gỡ hoàn toàn

// Services
import { authService } from '../../services/auth';
import { getFromLocalStorageWithExpiry } from '../../utils/localstorage';

const initialState = {
  user: undefined,
  requesting: true,
  playerLoaded: false,
  token: getFromLocalStorageWithExpiry('access_token') || undefined,
};

export const loginToSpotify = createAsyncThunk(
  'auth/loginToSpotify',
  async (_anonymous, api) => {
    const userToken = getFromLocalStorageWithExpiry('access_token');
    const anonymousToken = getFromLocalStorageWithExpiry('public_access_token');

    let token = userToken || anonymousToken;

    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      if (userToken) api.dispatch(fetchUser());
      return { token, loaded: false };
    }

    // Không gọi login nữa – giữ hệ thống ở trạng thái "không đăng nhập"
    console.warn('Spotify login bị vô hiệu hóa. Đang chạy không cần token.');

    return { token: null, loaded: false };
  }
);

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
    builder.addCase(loginToSpotify.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.requesting = !action.payload.loaded;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.requesting = false;
    });
  },
});

export const authActions = { ...authSlice.actions, loginToSpotify, fetchUser };

export default authSlice.reducer;
