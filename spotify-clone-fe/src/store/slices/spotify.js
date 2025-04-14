import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

// Services
import { userService } from '../../services/users';
import { playerService } from '../../services/player';

const initialState = {
  state: null,
  deviceId: null,
  activeDevice: null,
  liked: false,
  player: null,
  devices: [],
  activeDeviceType: 'Computer',
};

export const setState = createAsyncThunk(
  'spotify/setState',
  async ({ state: spotifyState }, { getState, dispatch }) => {
    if (!spotifyState) return null;
    const state = getState();
    const currentSong = spotifyState?.track_window.current_track;

    if (currentSong?.id !== state.spotify.state?.track_window.current_track.id) {
      const playing = !spotifyState.paused;
      const song = spotifyState.track_window.current_track;
      document.title =
        song && playing ? `${song.name} • ${song.artists[0].name}` : 'Spotify Web Player';
      if (currentSong) dispatch(fetchLikedSong(currentSong.id));
    }
    return spotifyState;
  }
);

export const fetchLikedSong = createAsyncThunk(
  'spotify/fetchLikedSong',
  async (id) => {
    const liked = await userService.checkSavedTracks([id]);
    return liked.data[0];
  }
);

export const fetchDevices = createAsyncThunk('spotify/fetchDevices', async () => {
  const response = await playerService.getAvailableDevices();
  return response.devices;
});

const spotifySlice = createSlice({
  name: 'spotify',
  initialState,
  reducers: {
    setLiked(state, action) {
      state.liked = action.payload.liked;
    },
    setDeviceId(state, action) {
      state.deviceId = action.payload.deviceId;
    },
    setPlayer(state, action) {
      state.player = action.payload.player;
    },
    setActiveDevice(state, action) {
      state.activeDevice = action.payload.activeDevice;
      state.activeDeviceType = action.payload.type || 'Computer';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setState.fulfilled, (state, action) => {
      state.state = action.payload;
    });
    builder.addCase(fetchLikedSong.fulfilled, (state, action) => {
      state.liked = action.payload;
    });
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.devices = action.payload;
    });
  },
});

export const getCurrentDevice = createSelector(
  [(state) => state.spotify.devices],
  (devices) => {
    return devices.find((device) => device.is_active);
  }
);

export const isActiveOnOtherDevice = createSelector(
  [(state) => state.spotify.deviceId, (state) => state.spotify.activeDevice],
  (deviceId, activeDeviceId) => {
    return deviceId && activeDeviceId && deviceId !== activeDeviceId;
  }
);

export const getOtherDevices = createSelector(
  [(state) => state.spotify.devices],
  (devices) => {
    return devices.filter((device) => !device.is_active);
  }
);

export const spotifyActions = { ...spotifySlice.actions, setState, fetchDevices };

export default spotifySlice.reducer;
