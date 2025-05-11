import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlist: null,
};

const deletePlaylistModalSlice = createSlice({
  name: 'deletePlaylistModal',
  initialState,
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload.playlist;
    },
  },
});

export const deletePlaylistModalActions = deletePlaylistModalSlice.actions;

export default deletePlaylistModalSlice.reducer;
