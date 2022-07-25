import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  posts: [],
  myPosts: []
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    add(state, action) {},
    edit(state, action) {},
    delete(state, action) {}
  }
});

export const postsActions = postsSlice.actions;
export default postsSlice.reducer;
