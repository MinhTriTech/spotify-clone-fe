import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  queue: [],
};

// ✅ Mock fetchQueue
export const fetchQueue = createAsyncThunk('queue/fetchQueue', async () => {
  // 🔧 Dữ liệu giả lập danh sách nhạc trong hàng chờ
  const mockQueue = Array.from({ length: 5 }, (_, i) => ({
    id: `mock-track-${i + 1}`,
    name: `Mock Track ${i + 1}`,
    uri: `spotify:track:mock-track-${i + 1}`,
    artists: [{ id: 'mock-artist', name: 'Mock Artist' }],
    album: {
      id: 'mock-album',
      name: 'Mock Album',
      images: [{ url: 'https://via.placeholder.com/300' }],
    },
  }));

  return mockQueue;
});

const queueSlice = createSlice({
  name: 'queue',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchQueue.fulfilled, (state, action) => {
      state.queue = action.payload;
    });
  },
});

export const queueActions = {
  fetchQueue,
  ...queueSlice.actions,
};

export default queueSlice.reducer;
