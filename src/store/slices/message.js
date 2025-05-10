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
      updateMessageList: (state, action) => {
        const { message, room_id, sender_id } = action.payload;
        const updatedTime = new Date().toISOString();

        const index = state.messList.findIndex(item => item.id === parseInt(room_id));

        if (index !== -1) {
          state.messList[index].last_message.content = message;
          state.messList[index].last_message.timestamp = updatedTime;
          state.messList[index].last_message.sender_id = sender_id;
        }

        state.messList.sort((a, b) => new Date(b.last_message.timestamp) - new Date(a.last_message.timestamp));
      },
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
