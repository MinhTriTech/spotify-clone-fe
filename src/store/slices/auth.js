import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { register, login } from '../../services/auth';

const initialState = {
  user: null,
  requesting: false,
  error: null,
  role: null,
};

export const handleRegister = createAsyncThunk('auth/register', async (userData) => {
  const response = await register(userData);
  return response;
});

export const handleLogin = createAsyncThunk('auth/login', async (userData) => {
  const response = await login(userData);

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
        
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        
      })
      .addCase(handleLogin.rejected, (state, action) => {
        
      })
  },
});

export default authSlice.reducer;




