import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { register, login, getUser } from '../../services/auth';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const handleRegister = createAsyncThunk('auth/register', async (userData) => {
  const response = await register(userData);
  return response;
});

export const handleLogin = createAsyncThunk('auth/login', async (userData) => {
  const response = await login(userData);

  return response;
});


// Xóa sau khi test
export const handleGetUser = createAsyncThunk('auth/getUser', async () => {
  const response = await getUser();

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
        state.loading = true;
        state.error = null;
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Xóa sau khi test
      .addCase(handleGetUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;  // Cập nhật thông tin người dùng từ getUser
      })
      .addCase(handleGetUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;




