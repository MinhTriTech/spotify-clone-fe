import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userService } from '../../services/users';
import { searchService } from '../../services/search';

const initialState = {
  songs: [],
  playlists: [],
  artists: [],
  albums: [],
  loading: true,
  section: 'ALL',
  songsTotal: 0,
};

const fetchArtists = createAsyncThunk('search/fetchArtists', async (query) => {
  const response = await querySearch({ q: query, type: 'artist', limit: 50 });
  return response.data.artists.items;
});

const fetchAlbums = createAsyncThunk('search/fetchAlbums', async (query) => {
  const response = await querySearch({ q: query, type: 'album', limit: 50 });
  return response.data.albums.items;
});

const fetchPlaylists = createAsyncThunk('search/fetchPlaylists', async (query) => {
  const response = await querySearch({ q: query, type: 'playlist', limit: 50 });
  return response.data.playlists.items;
});

const fetchMoreSongs = createAsyncThunk('search/fetchMoreSongs', async (query, { getState }) => {
  const state = getState();
  const { songs } = state.search;

  const response = await querySearch({
    q: query,
    limit: 50,
    type: 'track',
    offset: songs.length,
  });

  const tracks = response.data.tracks.items;

  const extraRequests = [
    userService.checkSavedTracks(tracks.map((t) => t.id)).catch(() => ({ data: [] })),
  ];

  await Promise.all(extraRequests);

  const saves = (await extraRequests[0]).data;

  return tracks.map((track, index) => ({
    ...track,
    saved: saves[index],
  }));
});

const fetchSearch = createAsyncThunk('search/fetchSearch', async (query) => {
  const response = await searchService.fetchSearch(query);
  return response;
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSection(state, action) {
      state.section = action.payload;
    },
    setSavedStateForTrack(state, action) {
      const { id, saved } = action.payload;
      const track = state.songs.find((t) => t.id === id);
      if (track) {
        track.saved = saved;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.songs = action.payload.songs?.length > 0 ? action.payload.songs : [];
      state.artists = action.payload.artists.length > 0 ? action.payload.artists : [];
      state.albums = action.payload.albums.length > 0 ? action.payload.albums : [];
      state.playlists = action.payload.playlists.length > 0 ? action.payload.playlists : [];
      state.songsTotal = action.payload.songs?.length;
      state.loading = false;
    });
    builder.addCase(fetchSearch.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(fetchArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      state.playlists = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMoreSongs.fulfilled, (state, action) => {
      state.songs = [...state.songs, ...action.payload];
      state.loading = false;
    });
  },
});

export const searchActions = {
  fetchSearch,
  fetchArtists,
  fetchAlbums,
  fetchPlaylists,
  fetchMoreSongs,
  ...searchSlice.actions,
};

export default searchSlice.reducer;
