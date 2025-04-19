import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { register, login, fetchUserApi } from '../../services/auth';

const initialState = {
  user: undefined,
  error: null,
  role: null,
  loading: false,
};

export const handleRegister = createAsyncThunk('auth/register', async (userData) => {
  const response = await register(userData);
  return response;
});

export const handleLogin = createAsyncThunk('auth/login', async (userData) => {
  const response = await login(userData);
  return response;
});

export const fetchUser = createAsyncThunk('auth/fetchUser', async (userData) => {
  const response = await fetchUserApi(userData);
  return response;
});


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.pending, (state) => {
        
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        
      })
      .addCase(handleRegister.rejected, (state, action) => {
        
      })

      .addCase(handleLogin.pending, (state) => {
        state.loading = true; 
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.is_staff;
        state.loading = false; 
      })
      .addCase(handleLogin.rejected, (state, action) => {
        
      })

      .addCase(fetchUser.pending, (state) => {
        state.loading = true; 
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.role = action.payload.is_staff;
        state.loading = false; 
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false; 
      })
  },
});

export default authSlice.reducer;




