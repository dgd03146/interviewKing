import './App.css';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  const isMain = useSelector((state) => state.layout.isMain);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layoutActions.isMained());
  }, []);

  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/postAdd" element={<PostAdd />} />
        </Routes>
      </Container>
      {isMain && <Footer />}
    </div>
  );
}

export default App;
