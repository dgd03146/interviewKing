import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Header from './layout/Header';
import Container from './layout/Container';

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
