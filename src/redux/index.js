import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import layoutSlice from './layout-slice';
import postsReducer from './posts-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
    layout: layoutSlice
  }
});

export default store;
