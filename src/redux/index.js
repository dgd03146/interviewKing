import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import layoutSlice from './layout-slice';
import postsReducer from './posts-slice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    layout: layoutSlice,
    auth: authReducer
  }
});

export default store;
