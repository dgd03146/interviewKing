import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../shared/api';

const initialState = {
  isLoggedIn: false,
  user: {
    loginId: 'test111',
    username: '사용자이름'
  }
};

export const postUser = createAsyncThunk('user/postUser', async (user) => {
  try {
    const response = await authApi.login(user);
    console.log(response.data, 'response.data');
    alert('로그인이 완료되었습니다.');
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
