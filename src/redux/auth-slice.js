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

export const postUser = createAsyncThunk(
  'user/postUser',
  async (user, thunkAPI) => {
    try {
      const response = await authApi.login(user);
      console.log(response, 'response입니다!');
      console.log(response.data, 'response.data');
      if (response.data) {
        thunkAPI.dispatch(authActions.login()); // login state true
        alert('로그인이 완료되었습니다.');
        localStorage.setItem('TOKEN', response.data); // 토큰 로컬 스토리지에 저장
      }
    } catch (error) {
      console.log(error.response, 'error');
    }
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  try {
    const response = await authApi.getUser();
    console.log(response.data, 'user정보 주세요');

    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.isLoggedIn = false;
    },
    setUser(state, action) {}
  },
  extraReducers: {
    [postUser.fulfilled]: (state, action) => {
      state.user = { ...action.payload }; // user 정보 저장
    },
    [getUser.fulfilled]: (state, action) => {
      state.user = { ...action.payload }; // user 정보 저장
    }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
