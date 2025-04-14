import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { playlistService } from '../../services/playlists';

// Redux
import { useAppDispatch, useAppSelector } from '../../store/store';
import { message } from 'antd';

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
  async (id, { getState }) => {
    const { auth } = getState();
    const { user } = auth;

    const promises = [
      playlistService.getPlaylist(id),
      playlistService.getPlaylistItems(id),
      user ? userService.checkFollowedPlaylist(id) : Promise.resolve({ data: [false] }),
    ];

    const responses = await Promise.all(promises);
    const playlist = responses[0].data;
    const { items } = responses[1].data;
    const [following] = responses[2].data;

    const ids = items.map((item) => item.track.id);
    const artistsIds = items.map((item) => item.track.artists[0].id);

    const isMine = user?.id === playlist.owner?.id;
    const canEdit = isMine || playlist.collaborative;

    const extraPromises = [
      userService.getUser(playlist.owner.id),
      ids.length && user
        ? userService.checkSavedTracks(items.map((item) => item.track.id)).catch(() => ({ data: [] }))
        : Promise.resolve({ data: [] }),
      isMine
        ? ids.length
          ? playlistService
              .getRecommendations({
                seed_tracks: ids.slice(0, 5).join(',') || undefined,
                seed_artists: artistsIds.slice(0, 5).join(',') || undefined,
                limit: 25,
              })
              .then((res) => ({ data: res.data.tracks }))
          : userService.fetchTopTracks({ limit: 25, timeRange: 'short_term' }).then((res) => ({
              data: res.data.items,
            }))
        : Promise.resolve({ data: [] }),
    ];

    const extraResponses = await Promise.all(extraPromises);

    const owner = extraResponses[0].data;
    const saved = extraResponses[1].data;
    const recommendations = extraResponses[2].data;

    const itemsWithSave = items.map((item, index) => ({
      ...item,
      saved: saved[index],
    }));

    return [playlist, itemsWithSave, following, canEdit, owner, recommendations];
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
  extraReducers: (builder) => {
    builder.addCase(fetchPlaylist.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPlaylist.fulfilled, (state, action) => {
      state.playlist = action.payload[0];
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
