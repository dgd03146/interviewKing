import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Main from './pages/main/Main';
import Header from './layout/Header';
import Container from './layout/Container';
import Login from './pages/authentication/login/Login';
import SignUp from './pages/authentication/signUp/SignUp';
import Footer from './layout/Footer';
import Post from './pages/post/Post';
import PostAdd from './pages/postAdd/PostAdd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { layoutActions } from './redux/layout-slice';
import MyPage from './pages/myPage/MyPage';
import { getUser } from './redux/auth-slice';

function App() {
  const isMain = useSelector((state) => state.layout.isMain);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const navigate = useNavigate();
  const isToken = localStorage.getItem('TOKEN') ? true : false;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    // 토큰이 있고 로그인 상태가 사라졌을때 => 새로고침했을때
    if (isToken && !isLoggedIn) {
      dispatch(getUser()); // user정보 요청해서 redux에 user 저장
    }
  }, []);

  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/postAdd" element={<PostAdd />} />
          <Route path="/myPage" element={<MyPage />} />
        </Routes>
      </Container>
      {isMain && <Footer />}
    </div>
  );
}

export default App;
