import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { playlistService } from '../../services/playlists';

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

export const fetchPlaylist = createAsyncThunk(
  'playlist/fetchPlaylist',
  async (id, thunkAPI) => {
    try {
      const response = await playlistService.getPlaylist(id);
      return response.data; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);


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

export const refreshPlaylist = createAsyncThunk(
  'playlist/refreshPlaylist',
  async (id) => {
    const { data } = await playlistService.getPlaylist(id);
    return data;
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload;
      state.tracks = action.payload[1];
      state.following = action.payload[2];
      state.canEdit = action.payload[3];
      state.user = action.payload[4];
      state.recommedations = action.payload[5];
      state.loading = false;
    });
    builder.addCase(refreshTracks.fulfilled, (state, action) => {
      state.tracks = action.payload;
    });
    builder.addCase(refreshPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload;
    });
    builder.addCase(getNextTracks.fulfilled, (state, action) => {
      state.tracks = [...state.tracks, ...action.payload];
    });
  },
});

export const playlistActions = {
  fetchPlaylist,
  refreshTracks,
  getNextTracks,
  refreshPlaylist,
  ...playlistSlice.actions,
};

export default playlistSlice.reducer;
