import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { albumsService } from '../../services/albums';
import { playlistService } from '../../services/playlists';

import { LIKED_SONGS_IMAGE } from '../../constants/spotify';

const initialState = {
  myAlbums: [],
  myArtists: [],
  myPlaylists: [],
  search: '',
  view: 'LIST',
  orderBy: 'default',
  filter: 'ALL',
};

export const fetchMyPlaylists = createAsyncThunk('yourLibrary/fetchMyPlaylists', async () => {
  const response = await playlistService.getMyPlaylists({ limit: 50 });
  return response.data.items;
});

export const fetchMyAlbums = createAsyncThunk('yourLibrary/fetchTopTracks', async () => {
  const response = await albumsService.fetchSavedAlbums({ limit: 50 });
  return response.data.items.map((item) => item.album);
});

export const fetchMyArtists = createAsyncThunk('yourLibrary/fetchMyArtists', async () => {
  const response = await userService.fetchFollowedArtists({ limit: 50 });
  return response.data.artists.items;
});

const yourLibrarySlice = createSlice({
  name: 'yourLibrary',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload.filter;
    },
    setSearch(state, action) {
      state.search = action.payload.search;
    },
    setView(state, action) {
      state.view = action.payload.view;
    },
    setOrderBy(state, action) {
      state.orderBy = action.payload.orderBy;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyPlaylists.fulfilled, (state, action) => {
      state.myPlaylists = action.payload;
    });
    builder.addCase(fetchMyAlbums.fulfilled, (state, action) => {
      state.myAlbums = action.payload;
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
    (state) => state.yourLibrary.myAlbums,
    (state) => state.yourLibrary.myArtists,
    (state) => state.yourLibrary.myPlaylists,
  ],
  (user, filter, myAlbums, myArtists, myPlaylists) => {
    if (filter === 'ALBUMS') return myAlbums;
    if (filter === 'ARTISTS') return myArtists;
    if (filter === 'PLAYLISTS') return myPlaylists;

    if (!user) return [];
    if (!myAlbums.length && !myArtists.length && !myPlaylists.length) return [];

    const likedSongs = {
      id: 'liked-songs',
      name: 'Liked Songs',
      snapshot_id: '',
      collaborative: false,
      public: false,
      description: '',
      href: '',
      type: 'playlist',
      tracks: { href: '', total: 0 },
      external_urls: { spotify: '' },
      followers: { href: '', total: 0 },
      uri: `spotify:user:${user?.id}:collection`,
      images: [{ url: LIKED_SONGS_IMAGE, width: 300, height: 300 }],
      owner: user,
    };

    return [
      myPlaylists.slice(0, 3),
      likedSongs,
      myAlbums.slice(0, 2),
      myPlaylists.slice(3, 6),
      myArtists.slice(0, 1),
      myAlbums.slice(2, 5),
      myArtists.slice(1, 2),
      myPlaylists.slice(6, 10),
      myAlbums.slice(5, 9),
      myArtists.slice(2, 6),
      myPlaylists.slice(10, 15),
      myAlbums.slice(9, 13),
      myArtists.slice(6, 10),
      myPlaylists.slice(15, 20),
      myAlbums.slice(13, 17),
      myArtists.slice(10, 14),
      myPlaylists.slice(20, 25),
      myAlbums.slice(17, 21),
      myArtists.slice(14, 18),
      myPlaylists.slice(25, 30),
      myAlbums.slice(21, 25),
      myArtists.slice(18, 22),
      myPlaylists.slice(30, 35),
      myAlbums.slice(25, 43),
      myPlaylists.slice(35),
      myArtists.slice(22),
      myAlbums.slice(43),
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
  fetchMyAlbums,
  fetchMyArtists,
  fetchMyPlaylists,
  ...yourLibrarySlice.actions,
};

export default yourLibrarySlice.reducer;
