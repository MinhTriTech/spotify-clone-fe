import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { userService } from '../../services/users';
import { playlistService } from '../../services/playlists';

const initialState = {
  tracks: [],
  playlist: null,
  loading: true,
  canEdit: false,
  following: false,
  songsOfFeaturePlaylists: [],
  songsOfLikedSongs: [],
  order: 'ALL',
  view: 'LIST',
};

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async (id) => {
    const response = await playlistService.getPlaylist(id);
    return response.data;
  }
);

export const refreshPlaylist = createAsyncThunk(
  'playlist/refreshPlaylist',
  async (id) => {
    const response = await playlistService.getPlaylist(id);
    return response.data;
  }
);

export const fetchSongsOfFeaturedPlaylists = createAsyncThunk(
  'home/fetchSongsOfFeaturedPlaylists',
  async (id) => {
    const response = await playlistService.getSongsOfFeaturedPlaylists(id);
    return response.data;
  }
);

export const getSongsOfLikedSongs = createAsyncThunk('home/getSongsOfLikedSongs', async () => {
  const response = await playlistService.getSongsOfLikedSongs();
  return response.data;
});

export const refreshTracks = createAsyncThunk(
  'playlist/refreshTracks',
  async (id) => {
    try {
      const { data } = await playlistService.getPlaylistItems(id);
      const ids = data.items.map((item) => item.track.id);

      const { data: saved } = await (ids.length
        ? userService.checkSavedTracks(ids).catch(() => ({ data: [] }))
        : Promise.resolve({ data: [] }));

      const itemsWithSave = data.items.map((item, index) => ({
        ...item,
        saved: saved[index],
      }));

      return itemsWithSave;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
);

export const getNextTracks = createAsyncThunk(
  'playlist/getNextTracks',
  async (_params, { getState }) => {
    const { playlist, tracks } = getState().playlist;

    const { data } = await playlistService.getPlaylistItems(playlist.id, {
      offset: tracks.length,
      limit: 50,
    });

    const ids = data.items.map((item) => item.track.id);

    const { data: saved } = await (ids.length
      ? userService.checkSavedTracks(ids).catch(() => ({ data: [] }))
      : Promise.resolve({ data: [] }));

    const itemsWithSave = data.items.map((item, index) => ({
      ...item,
      saved: saved[index],
    }));

    return itemsWithSave;
  }
);

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
        state.loading = true;
        state.view = 'LIST';
      }
    },
    removeTrack(state, action) {
      state.tracks = state.tracks.filter((track) => track.song_id !== action.payload.id);
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload.playlist;
      state.tracks = action.payload.songs;
      state.canEdit = action.payload.is_owner;
      state.loading = false;
    });
    builder.addCase(refreshTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
    });
    builder.addCase(refreshPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload.playlist;
    });
    builder.addCase(getNextTracks.fulfilled, (state, action) => {
      state.tracks = [...state.tracks, ...action.payload];
    });
    builder.addCase(fetchSongsOfFeaturedPlaylists.fulfilled, (state, action) => {
      state.songsOfFeaturePlaylists = action.payload;
    });
    builder.addCase(getSongsOfLikedSongs.fulfilled, (state, action) => {
      state.songsOfLikedSongs = action.payload;
    });
  },
});

export const playlistActions = {
  fetchPlaylist,
  refreshTracks,
  getNextTracks,
  refreshPlaylist,
  fetchSongsOfFeaturedPlaylists,
  getSongsOfLikedSongs,
  ...playlistSlice.actions,
};

export default playlistSlice.reducer;
