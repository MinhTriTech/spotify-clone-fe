import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

import { libraryService } from '../../services/library';

import { LIKED_SONGS_IMAGE } from '../../constants/spotify';

const initialState = {
  myLikeSongs: [],
  myArtists: [],
  myPlaylists: [],
  view: 'LIST',
  orderBy: 'default',
  filter: 'ALL',
};

export const fetchMyLikeSongs = createAsyncThunk('yourLibrary/fetchMyLikeSongs', async () => {
  const response = await libraryService.getMyLikeSongs();
  return response.data;
});

export const fetchMyPlaylists = createAsyncThunk('yourLibrary/fetchMyPlaylists', async () => {
  const response = await libraryService.getMyPlaylists();
  return response.data;
});

export const fetchMyArtists = createAsyncThunk('yourLibrary/fetchMyArtists', async () => {
  const response = await libraryService.getFollowedArtists();
  return response.data;
});

const yourLibrarySlice = createSlice({
  name: 'yourLibrary',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload.filter;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyLikeSongs.fulfilled, (state, action) => {
      state.myLikeSongs = action.payload;
    });
    builder.addCase(fetchMyPlaylists.fulfilled, (state, action) => {
      state.myPlaylists = action.payload;
    });
    builder.addCase(fetchMyArtists.fulfilled, (state, action) => {
      state.myArtists = action.payload;
    });
  },
});

export const getLibraryItems = createSelector(
  [
    (state) => state.auth.user,
    (state) => state.yourLibrary.filter,
    (state) => state.yourLibrary.myLikeSongs,
    (state) => state.yourLibrary.myArtists,
    (state) => state.yourLibrary.myPlaylists,
  ],
  (user, filter, myLikeSongs, myArtists, myPlaylists) => {
    if (filter === 'ARTISTS') return myArtists;
    if (filter === 'PLAYLISTS') return myPlaylists;
    
    if (!user) return [];
    if (!myArtists.length && !myPlaylists.length) return [];

    const likedSongs = {
      id: 'liked-songs',
      title: 'Liked Songs',
      type: 'playlist',
      image: LIKED_SONGS_IMAGE,
      context: myLikeSongs,
    };

    return [
      likedSongs,
      myPlaylists.slice(0, 3),
      myPlaylists.slice(3, 6),
      myArtists.slice(0, 1),
      myArtists.slice(1, 2),
      myPlaylists.slice(6, 10),
      myArtists.slice(2, 6),
      myPlaylists.slice(10, 15),
      myArtists.slice(6, 10),
      myPlaylists.slice(15, 20),
      myArtists.slice(10, 14),
      myPlaylists.slice(20, 25),
      myArtists.slice(14, 18),
      myPlaylists.slice(25, 30),
      myArtists.slice(18, 22),
      myPlaylists.slice(30, 35),
      myPlaylists.slice(35),
      myArtists.slice(22),
    ]
      .filter((r) => r)
      .flat();
  }
);

export const getUserPlaylists = createSelector(
  [(state) => state.yourLibrary.myPlaylists, (state) => state.auth.user],
  (playlists, user) => {
    return playlists.filter((playlist) => playlist.owner?.id === user?.id);
  }
);

export const yourLibraryActions = {
  fetchMyLikeSongs,
  fetchMyPlaylists,
  fetchMyArtists,
  ...yourLibrarySlice.actions,
};

export default yourLibrarySlice.reducer;
