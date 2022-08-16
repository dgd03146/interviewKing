import { createSlice } from '@reduxjs/toolkit';

const initialState = { isMain: false };

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    isMained(state) {
      state.isMain = true;
    },
    notisMained(state) {
      state.isMain = false;
    }
  }
});

export const layoutActions = layoutSlice.actions;
export default layoutSlice.reducer;
