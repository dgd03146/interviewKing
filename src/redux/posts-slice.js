import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi, postApi } from '../shared/api';

// 메인페이지 모든 게시물 받아오기
export const getPostsMain = createAsyncThunk('posts/getPostsMain', async () => {
  try {
    const response = await postApi.postsMain();

    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});
// 카테고리별 게시물 받아오기
export const getCategoryPosts = createAsyncThunk(
  'posts/getCategoryPosts',
  async (stack) => {
    try {
      const response = await postApi.categoryPosts(stack);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

// 본인 게시물 받아오기
export const getMyPosts = createAsyncThunk('posts/getMyPosts', async () => {
  try {
    const response = await postApi.myPosts();
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});

// 상세 게시글 불러오기
export const getDetailPost = createAsyncThunk(
  'posts/getDetailPost',
  async (postId) => {
    try {
      const response = await postApi.detailPost(postId);

      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

const initialState = {
  posts: [],
  myPosts: [],
  detailPost: {
    // FIXME: ❌ DUMMY DATA
  },

  isEdit: false // 수정 중인지 check
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    isEdit(state) {
      state.isEdit = true;
    },
    notisEdit(state) {
      state.isEdit = false;
    }
  },
  extraReducers: {
    //FIXME:
    [getPostsMain.fulfilled]: (state, action) => {
      state.posts = [...action.payload];
    },
    [getCategoryPosts.fulfilled]: (state, action) => {
      state.posts = [...action.payload];
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.myPosts = [...action.payload];
    },
    [getDetailPost.fulfilled]: (state, action) => {
      state.detailPost = { ...action.payload };
    }
  }
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
