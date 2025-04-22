import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light',
  accessibility: {
    fontSize: 'medium',
    highContrast: false,
  },
};

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setFontSize: (state, action) => {
      state.accessibility.fontSize = action.payload;
    },
    toggleHighContrast: (state) => {
      state.accessibility.highContrast = !state.accessibility.highContrast;
    },
  },
});

export const { toggleTheme, setFontSize, toggleHighContrast } = preferencesSlice.actions;
export default preferencesSlice.reducer;