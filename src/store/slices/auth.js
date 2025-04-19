import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { register, login } from '../../services/auth';

const initialState = {
  user: undefined,
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
        state.user = action.payload;
        state.role = action.payload.is_staff;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        
      })
  },
});

export default authSlice.reducer;




