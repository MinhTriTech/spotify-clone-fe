import { createSlice } from '@reduxjs/toolkit';

// Initial state with a default value for the playlist
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

// Exporting actions and reducer for use in the store
export const editPlaylistModalActions = editPlaylistModalSlice.actions;

export default editPlaylistModalSlice.reducer;
