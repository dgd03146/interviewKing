import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoggedIn: false, user: {} };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {},
    logOut(state) {},
    setUser(state, action) {}
  }
});

export const authActions = authSlice.actions;
export default authActions.reducer;
