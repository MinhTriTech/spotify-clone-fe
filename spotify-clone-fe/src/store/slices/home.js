import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  topTracks: [],
  newReleases: [],
  madeForYou: [],
  featurePlaylists: [],
  rankings: [],
  trending: [],
  recentlyPlayed: [],
  section: 'ALL',
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setSection(state, action) {
      state.section = action.payload;
    },

    // Các hàm set mock thủ công nếu cần
    setTopTracks(state, action) {
      state.topTracks = action.payload;
    },
    setNewReleases(state, action) {
      state.newReleases = action.payload;
    },
    setMadeForYou(state, action) {
      state.madeForYou = action.payload;
    },
    setFeaturePlaylists(state, action) {
      state.featurePlaylists = action.payload;
    },
    setRankings(state, action) {
      state.rankings = action.payload;
    },
    setTrending(state, action) {
      state.trending = action.payload;
    },
    setRecentlyPlayed(state, action) {
      state.recentlyPlayed = action.payload;
    },
  },
});

export const homeActions = homeSlice.actions;
export default homeSlice.reducer;
