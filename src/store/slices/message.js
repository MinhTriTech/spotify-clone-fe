import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { messageService } from '../../services/message';

const initialState = {
  messList: [],
  loading: false,
  status: "idle",
};

export const fetchChatRooms = createAsyncThunk(
  'message/fetchChatRooms',
  async () => {
    const response = await messageService.fetchChatRooms();
    return response;
  }
);


const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatRooms.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(fetchChatRooms.fulfilled, (state, action) => {
      state.messList = action.payload;
      state.loading = false;
      state.status = "succeeded";
    });
  },
});

export const messageActions = {
  fetchChatRooms,
  
  ...messageSlice.actions,
};

export default messageSlice.reducer;
