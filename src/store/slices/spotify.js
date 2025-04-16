import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  state: null,
  deviceId: null,
  activeDevice: null,
  liked: false,
  player: null,
  devices: [],
  activeDeviceType: 'Computer',
};

// Placeholder thunk to simulate device fetching
export const fetchDevices = createAsyncThunk('spotify/fetchDevices', async () => {
  return [];
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
    setState(state, action) {
      state.state = action.payload;
    },
  },
  extraReducers: (builder) => {
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

export const spotifyActions = { ...spotifySlice.actions, fetchDevices };

export default spotifySlice.reducer;