import { createSlice, createSelector } from '@reduxjs/toolkit';

// Initial state for the UI slice
const initialState = {
  queueCollapsed: true,
  devicesCollapsed: true,
  detailsCollapsed: true,
  libraryCollapsed: true,
  loginTooltipOpen: false,
  loginButtonOpen: false,
  loginModalItem: null, 
  loginModalMain: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleLoginModalMain(state) {
      state.loginModalMain = !state.loginModalMain;
    },
    openLoginButton(state) {
      state.loginButtonOpen = true;
      state.loginModalItem = null;
      state.loginTooltipOpen = false;
    },
    closeLoginButton(state) {
      state.loginButtonOpen = false;
    },
    openLoginModal(state, action) {
      state.loginModalItem = action.payload;
      state.loginButtonOpen = false;
      state.loginTooltipOpen = false;
    },
    closeLoginModal(state) {
      state.loginModalItem = null;
    },
    openLoginTooltip(state) {
      state.loginTooltipOpen = true;
      state.loginModalItem = null;
      state.loginButtonOpen = false;
    },
    closeLoginTooltip(state) {
      state.loginTooltipOpen = false;
    },
    collapseDetails(state) {
      state.detailsCollapsed = true;
    },
    toggleDetails(state) {
      state.queueCollapsed = true;
      state.libraryCollapsed = true;
      state.devicesCollapsed = true;
      state.detailsCollapsed = !state.detailsCollapsed;
    },
    collapseLibrary(state) {
      state.libraryCollapsed = true;
    },
    openLibrary(state) {
      state.libraryCollapsed = false;
    },
    toggleLibrary(state) {
      state.libraryCollapsed = !state.libraryCollapsed;
    },
    collapseQueue(state) {
      state.queueCollapsed = true;
    },
    toggleQueue(state) {
      state.detailsCollapsed = true;
      state.libraryCollapsed = true;
      state.devicesCollapsed = true;
      state.queueCollapsed = !state.queueCollapsed;
    },
    collapseDevices(state) {
      state.devicesCollapsed = true;
    },
    toggleDevices(state) {
      state.detailsCollapsed = true;
      state.libraryCollapsed = true;
      state.queueCollapsed = true;
      state.devicesCollapsed = !state.devicesCollapsed;
    },
  },
});

// Selector to check if the right layout is open
export const isRightLayoutOpen = createSelector(
  [
    (state) => state.ui.queueCollapsed,
    (state) => state.ui.devicesCollapsed,
    (state) => state.ui.detailsCollapsed,
  ],
  (queueCollapsed, devicesCollapsed, detailsCollapsed) => {
    return !queueCollapsed || !devicesCollapsed || !detailsCollapsed;
  }
);

// Selector to get the state of the library collapsed based on user state
export const getLibraryCollapsed = createSelector(
  [(state) => state.ui.libraryCollapsed, (state) => state.auth.user],
  (libraryCollapsed, user) => {
    return !user ? false : libraryCollapsed;
  }
);

// Export actions from the slice
export const uiActions = uiSlice.actions;

// Default export of the reducer
export default uiSlice.reducer;
