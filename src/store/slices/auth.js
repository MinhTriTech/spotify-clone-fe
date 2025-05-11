import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { register, login, logout, loginWithGoogle, fetchUserApi } from '../../services/auth';

import { uiActions } from './ui'

const initialState = {
  user: null,
  role: false,
};

export const handleRegister = createAsyncThunk('auth/register', async (userData) => {
  const response = await register(userData);
  return response;
});

export const handleLogin = createAsyncThunk(
  'auth/login',
  async (userData, { dispatch }) => {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await login(userData);
      return response;
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  }
);

export const handleLoginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (token, { dispatch }) => {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await loginWithGoogle(token);
      console.log(response);
      
      return response;
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  }
);

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (userData, { dispatch }) => {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await fetchUserApi(userData);
      return response;
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  }
);

export const handleLogout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    dispatch(uiActions.setLoading(true));
    try {
      const response = await logout();
      return response;
    } finally {
      dispatch(uiActions.setLoading(false));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.user_info.is_staff;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.user_info.is_staff;
      })
      .addCase(handleLogout.fulfilled, (state, action) => {
        state.user = null;
        state.role = false;
      })
      .addCase(handleLoginWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.is_staff;
      })
  },
});

export default authSlice.reducer;




