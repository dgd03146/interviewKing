import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  commentLoading: true,
  comments: [],
  iscommentEdit: false
};

// 모든 댓글 받기
export const getComments = createAsyncThunk(
  'comments/getComments',
  async () => {
    try {
      const response = await axios.get(
        'http://15.164.221.163:8080/api/comments'
      );
      console.log(response.data, 'response.data');
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    // 로딩 스피너
    [getComments.pending]: (state) => {
      state.commentLoading = true;
    },
    [getComments.fulfilled]: (state, action) => {
      state.commentLoading = false;
      state.comments = [...action.payload];
    },
    [getComments.rejected]: (state) => {
      state.commentLoading = false;
    }
  }
});

export const commentsActions = commentsSlice.actions;
export default commentsSlice.reducer;
