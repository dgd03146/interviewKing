import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { isLoggedIn: false, user: {} };

export const postUser = createAsyncThunk('user/postUser', async (user) => {
  console.log(user);
  try {
    const response = await axios.post(
      'http://15.164.221.163:8080/api/login',
      user
    );
    console.log(response.data, 'response.data');
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {},
    logOut(state) {},
    setUser(state, action) {}
  },
  extraReducers: {
    [postUser.fulfilled]: (state, action) => {
      state.user = { ...action.payload }; // user 정보 저장
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
