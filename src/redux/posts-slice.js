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
      const response = await postApi.get(postId);
      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);

const initialState = {
  posts: [
    {
      postId: 1,
      stack: 'React',
      title: 'React의 개념과 장점, 그리고 컴포넌트란 무엇인가요?',
      content:
        'React는 UI를 구축을 위한 자바스크립트 프론트엔드 라이브러리 입니다. 주로 Single Page Application를 만들 때 사용됩니다. React의 장점에는 virtual DOM을 사용해서 어플리케이션의 성능을 향상시키고, 클라이언트 사이드 렌더링이 가능합니다. 또한 다른 프레임워크와도 사용이 가능하며, 컴포넌트의 가독성을 높이며 유지보수가 쉽습니다. 여기서 컴포넌트란, 레고 블록과 같이 작은 단위로 만들어서 그것을 조립하는 것처럼 개발하는 방법입니다. 컴포넌트를 사용한다면 캡슐화, 확장성, 결합성, 재사용성과 같은 이점이 있습니다.',
      likes: 1,
      companyname: 'samsung',
      date: '2022-07-25'
    },
    {
      postId: 2,
      stack: 'React',
      title: 'React의 개념과 장점, 그리고 컴포넌트란 무엇인가요?',
      likes: 1,
      companyname: 'samsung',
      date: '2022-07-25'
    },
    {
      postId: 3,
      stack: 'JavaScript',
      title: 'React의 개념과 장점, 그리고 컴포넌트란 무엇인가요?',
      likes: 1,
      companyname: 'samsung',
      date: '2022-07-25'
    },
    {
      postId: 4,
      stack: 'HTML',
      title: 'React의 개념과 장점, 그리고 컴포넌트란 무엇인가요?',
      likes: 1,
      companyname: 'samsung',
      date: '2022-07-25'
    }
  ],
  myPosts: [
    {
      postId: 1,
      stack: 'React',
      title: '이거 할게 너무 많아',
      content: '너무 많은디?',
      companyname: '삼성',
      date: '2022-07-28 05:23'
    },
    {
      postId: 2,
      stack: 'Spring',
      title: '이거 할게 너무 많아',
      content: '너무 많은디?',
      companyname: '삼성',
      date: '2022-07-28 05:23'
    },
    {
      postId: 3,
      stack: 'JavaScript',
      title: '이거 할게 너무 많아',
      content: '너무 많은디?',
      companyname: '삼성',
      date: '2022-07-28 05:23'
    }
  ],
  detailPost: {
    // FIXME: ❌ DUMMY DATA
    postId: 1,
    username: 'TEST',
    title: '혼자서 하니까 너무 싫다.',
    content: '혼자서해야한다고? 이걸 다?',
    stack: 'REACT',
    date: '2022-07-28',
    companyname: 'SAMSUNG',
    comments: [
      {
        loginId: 'test111',
        comment: '테스트하는 댓글내용',
        date: '댓글 작성시간',
        username: 'test111'
      },
      {
        loginId: 'test222',
        comment: '테스트하는 댓글내용',
        date: '댓글 작성시간',
        username: 'test222'
      },
      {
        loginId: 'test333',
        comment: '테스트하는 댓글내용',
        date: '댓글 작성시간',
        username: 'test333'
      }
    ]
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
