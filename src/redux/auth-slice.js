import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = { isLoggedIn: false, user: {} };

export const addUser = createAsyncThunk('user/addUser', async (user) => {
  console.log(user, 'user');
  const response = await axios.post('http://localhost:8080/api/signup', user);
  console.log(response, 'response');
  return response.data;
});

export const postUser = createAsyncThunk('user/postUser', async (user) => {
  const response = await axios.post('http://localhost:8080/api/login', user);
  console.log(response, 'response');
  return response.data;
});

// export const getUser = createAsyncThunk('user/getUser', async () => {
//   const response = await axios.get('http://localhost:5001/users');
//   console.log(response.data);
//   return response.data;
// });

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {},
    logOut(state) {},
    setUser(state, action) {}
  },
  extraReducers: {
    [addUser.fulfilled]: (state, action) => {},
    [postUser.fulfilled]: (state, action) => {}
    // [getUser.fulfilled]: (state, action) => {
    //   state.user = { ...action.payload };
    // }
  }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
