import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  language: 'en',
  isModalOpen: false,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload.language;
    },
    openLanguageModal(state) {
      state.isModalOpen = true;
    },
    closeLanguageModal(state, action) {
      state.isModalOpen = false;
      if (action.payload && action.payload.language) {
        state.language = action.payload.language;
      }
    },
  },
});

export const languageActions = languageSlice.actions;

export default languageSlice.reducer;
