import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  top: null,
  songs: [],
  artists: [],
  albums: [],
  playlists: [],
  loading: true,
  section: 'ALL',
  songsTotal: 0,
};

// 🔍 Mock data generators
const mockTrack = (id) => ({
  id: `track-${id}`,
  name: `Mock Song ${id}`,
  saved: false,
  artists: [{ name: `Artist ${id}` }],
  album: { images: [{ url: 'https://via.placeholder.com/150' }] },
});

const mockArtist = (id) => ({
  id: `artist-${id}`,
  name: `Mock Artist ${id}`,
  images: [{ url: 'https://via.placeholder.com/150' }],
});

const mockAlbum = (id) => ({
  id: `album-${id}`,
  name: `Mock Album ${id}`,
  images: [{ url: 'https://via.placeholder.com/150' }],
});

const mockPlaylist = (id) => ({
  id: `playlist-${id}`,
  name: `Mock Playlist ${id}`,
  images: [{ url: 'https://via.placeholder.com/150' }],
});

export const fetchSearch = createAsyncThunk('search/fetchSearch', async (query) => {
  const songs = Array.from({ length: 5 }, (_, i) => mockTrack(i + 1));
  const artists = Array.from({ length: 5 }, (_, i) => mockArtist(i + 1));
  const albums = Array.from({ length: 5 }, (_, i) => mockAlbum(i + 1));
  const playlists = Array.from({ length: 5 }, (_, i) => mockPlaylist(i + 1));
  const top = songs[0];

  return [top, [songs, 50], artists, albums, playlists];
});

export const fetchArtists = createAsyncThunk('search/fetchArtists', async (query) => {
  return Array.from({ length: 10 }, (_, i) => mockArtist(i + 10));
});

export const fetchAlbums = createAsyncThunk('search/fetchAlbums', async (query) => {
  return Array.from({ length: 10 }, (_, i) => mockAlbum(i + 10));
});

export const fetchPlaylists = createAsyncThunk('search/fetchPlaylists', async (query) => {
  return Array.from({ length: 10 }, (_, i) => mockPlaylist(i + 10));
});

export const fetchSongs = createAsyncThunk('search/fetchSongs', async (query) => {
  const songs = Array.from({ length: 10 }, (_, i) => mockTrack(i + 10));
  return [songs, 100];
});

export const fetchMoreSongs = createAsyncThunk('search/fetchMoreSongs', async (query, { getState }) => {
  const { songs } = getState().search;
  const newSongs = Array.from({ length: 5 }, (_, i) => mockTrack(songs.length + i + 1));
  return newSongs;
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSection(state, action) {
      state.section = action.payload;
    },
    setSavedStateForTrack(state, action) {
      const track = state.songs.find((t) => t.id === action.payload.id);
      if (track) {
        track.saved = action.payload.saved;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.top = action.payload[0];
      state.songs = action.payload[1][0];
      state.songsTotal = action.payload[1][1];
      state.artists = action.payload[2];
      state.albums = action.payload[3];
      state.playlists = action.payload[4];
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
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      state.songs = action.payload[0];
      state.songsTotal = action.payload[1];
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
  fetchSongs,
  fetchMoreSongs,
  ...searchSlice.actions,
};

export default searchSlice.reducer;
