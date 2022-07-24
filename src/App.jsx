import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Header from './layout/Header';
import Container from './layout/Container';
import Login from './pages/authentication/login/Login';
import SignUp from './pages/authentication/signUp/SignUp';
import Footer from './layout/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
