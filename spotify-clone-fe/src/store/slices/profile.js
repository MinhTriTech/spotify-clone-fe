import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { playlistService } from '../../services/playlists';

const initialState = {
  songs: [],
  user: null,
  artists: [],
  playlists: [],
  following: false,
};

const fetchMyArtists = createAsyncThunk(
  'profile/fetchMyArtists',
  async (_, api) => {
    const response = await userService.fetchFollowedArtists({ limit: 50 });
    return response.data.artists.items;
  }
);

const fetchPlaylists = createAsyncThunk(
  'profile/fetchMyPlaylists',
  async (id, api) => {
    const response = await playlistService.getPlaylists(id, { limit: 50 });
    return response.data.items;
  }
);

const fetchMyTracks = createAsyncThunk(
  'profile/fetchMyTracks',
  async (_, api) => {
    const response = await userService.fetchTopTracks({
      limit: 50,
      timeRange: 'short_term',
    });
    const tracks = response.data.items;

    const saved = await userService
      .checkSavedTracks(tracks.map((t) => t.id))
      .then((res) => res.data);

    return tracks.map((track, i) => {
      return {
        ...track,
        saved: saved[i],
      };
    });
  }
);

const fetchCurrentUserData = createAsyncThunk(
  'profile/fetchCurrentUserData',
  async (_, api) => {
    const promises = [
      userService.fetchFollowedArtists({ limit: 10 }),
      userService.fetchTopTracks({
        limit: 10,
        timeRange: 'short_term',
      }),
    ];

    const responses = await Promise.all(promises).then((res) => res.map((r) => r.data));
    const [artistsResponse, tracksResponse] = responses;

    const artists = artistsResponse.artists.items;
    const tracks = tracksResponse.items;

    const saved = await userService
      .checkSavedTracks(tracks.map((t) => t.id))
      .then((res) => res.data);

    const tracksWithSave = tracks.map((track, i) => {
      return {
        ...track,
        saved: saved[i],
      };
    });

    return [artists, tracksWithSave];
  }
);

const fetchUser = createAsyncThunk(
  'profile/fetchUser',
  async (id, api) => {
    const { auth } = api.getState();
    const user = auth.user;

    if (user && user.id === id) {
      api.dispatch(fetchCurrentUserData());
    }

    const promises = [
      userService.getUser(id),
      playlistService.getPlaylists(id, { limit: 10 }),
      user && user.id === id
        ? userService.checkFollowingUsers([id]).catch(() => {
            return { data: [true] };
          })
        : Promise.resolve({ data: [true] }),
    ];
    const responses = await Promise.all(promises);
    const [userData, playlistsData, following] = responses;

    return [
      userData.data,
      playlistsData.data.items,
      following.data[0],
    ];
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = null;
      state.following = false;
      state.playlists = [];
      state.artists = [];
      state.songs = [];
    },
    setLinkedStateForTrack: (state, action) => {
      state.songs = state.songs.map((track) => {
        if (track.id === action.payload.id) {
          return {
            ...track,
            saved: action.payload.saved,
          };
        }
        return track;
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload[0];
      state.playlists = action.payload[1];
      state.following = action.payload[2];
    });
    builder.addCase(fetchMyArtists.fulfilled, (state, action) => {
      state.artists = action.payload;
    });
    builder.addCase(fetchCurrentUserData.fulfilled, (state, action) => {
      state.artists = action.payload[0];
      state.songs = action.payload[1];
    });
    builder.addCase(fetchPlaylists.fulfilled, (state, action) => {
      state.playlists = action.payload.filter((p) => p.public);
    });
    builder.addCase(fetchMyTracks.fulfilled, (state, action) => {
      state.songs = action.payload;
    });
  },
});

export const profileActions = {
  fetchUser,
  fetchPlaylists,
  fetchMyArtists,
  fetchMyTracks,
  ...profileSlice.actions,
};

export default profileSlice.reducer;
