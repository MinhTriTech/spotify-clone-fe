import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  playlist: null,
};

const editPlaylistModalSlice = createSlice({
  name: 'editPlaylistModal',
  initialState,
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload.playlist;
    },
  },
});

export const editPlaylistModalActions = editPlaylistModalSlice.actions;

export default editPlaylistModalSlice.reducer;
