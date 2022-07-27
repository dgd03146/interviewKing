import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
  try {
    // 모든 게시물 받아오기
    const response = await axios.get('http://15.164.221.163:8080/api/posts');
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});

export const getMyPosts = createAsyncThunk('posts/getMyPosts', async () => {
  try {
    // 모든 게시물 받아오기
    const response = await axios.get('http://15.164.221.163:8080/api/mypage');
    return response.data;
  } catch (error) {
    console.log(error.response);
  }
});

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
      stack: 'React',
      title: 'React의 개념과 장점, 그리고 컴포넌트란 무엇인가요?',
      likes: 1,
      companyname: 'samsung',
      date: '2022-07-25'
    },
    {
      postId: 4,
      stack: 'react',
      title: 'React의 개념과 장점, 그리고 컴포넌트란 무엇인가요?',
      likes: 1,
      companyname: 'samsung',
      date: '2022-07-25'
    }
  ],
  myPosts: [],
  isEdit: false
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    add(state, action) {
      state.posts = [action.payload, ...state.posts];
    },
    edit(state, action) {},
    delete(state, action) {},
    isEdit(state) {
      state.isEdit = true;
    },
    notisEdit(state) {
      state.isEdit = false;
    }
  },
  extraReducers: {
    [getAllPosts.fulfilled]: (state, action) => {
      state.posts = [...action.payload];
    },
    [getMyPosts.fulfilled]: (state, action) => {
      state.myPosts = [...action.payload];
    }
  }
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
