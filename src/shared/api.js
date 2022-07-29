import axios from 'axios';

const api = axios.create({
  baseURL: 'http://15.164.221.163:8080',
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    accept: 'application/json,'
  }
});

api.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem('TOKEN'); // localStorage에 TOKEN 저장
  config.headers.common['Authorization'] = `${accessToken}`; // Header에 토큰을 넣어서 보내준다.
  return config;
});

export const authApi = {
  // 회원 가입
  signup: (user) => api.post('/api/signup', user),

  // 로그인
  login: (user) => api.post('/api/login', user)
};

export const postApi = {
  // main 페이지에 게시물 받아오기
  postsMain: () => api.get('/api/posts'),

  // 카테고리별 게시물 받아오기
  categoryPosts: (stack) => api.get(`/api/${stack}`),

  // 마이페이지 게시물 받아오기
  myPosts: () => api.get('/api/mypage'),

  // 상세 게시글 불러오기
  detailPost: (postId) => api.get(`/api/detail/${postId}`),

  // 게시글 작성
  postAdd: (post) => api.post('/api/post', post),

  // 게시글 수정
  postEdit: (postId, post) => api.put(`/api/${postId}`, post),

  // 게시글 삭제
  postDelete: (postId) => api.delete(`/api/${postId}`),

  // 댓글 작성
  addComment: (comment) => api.post('/api/comment', comment),

  // 댓글 수정
  editComment: (commentId, comment) =>
    api.put(`/api/comment/${commentId}`, comment),

  // 댓글 삭제
  deleteComment: (commentId) => api.delete(`/api/comment/${commentId}`)
};
