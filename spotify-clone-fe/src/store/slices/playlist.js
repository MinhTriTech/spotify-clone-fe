import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  recommedations: [],
  tracks: [],
  playlist: null,
  loading: true,
  canEdit: false,
  following: false,
  order: 'ALL',
  view: 'LIST',
};

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    setPlaylist(state, action) {
      state.playlist = action.payload.playlist;
      if (!action.payload.playlist) {
        state.tracks = [];
        state.following = false;
        state.canEdit = false;
        state.user = null;
        state.loading = true;
        state.view = 'LIST';
      }
    },
    removeTrack(state, action) {
      state.tracks = state.tracks.filter((track) => track.track.id !== action.payload.id);
    },
    setTrackLikeState(state, action) {
      state.tracks = state.tracks.map((track) =>
        track.track.id === action.payload.id ? { ...track, saved: action.payload.saved } : track
      );
    },
    setView(state, action) {
      state.view = action.payload.view;
    },
    setOrder(state, action) {
      state.order = action.payload.order;
    },
    reorderTracks(state, action) {
      const tracks = [...state.tracks];
      const [track] = tracks.splice(action.payload.from, 1);
      tracks.splice(action.payload.to, 0, track);
      state.tracks = tracks;
    },
    resetOrder(state, action) {
      state.order = action.payload.order || 'ALL';
    },
    removeTrackFromRecommendations(state, action) {
      state.recommedations = state.recommedations.filter((track) => track.id !== action.payload.id);
    },
  },
});

export const playlistActions = {
  ...playlistSlice.actions,
};

export default playlistSlice.reducer;