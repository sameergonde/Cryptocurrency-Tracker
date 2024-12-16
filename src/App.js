import { styled } from '@mui/system';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';

const AppContainer = styled('div')({
  backgroundColor: '#14161a',
  color: 'white',
  minHeight: '100vh',
});

function App() {
  return (
    <BrowserRouter>
      <AppContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} exact />
          <Route path="/coins/:id" element={<CoinPage />} exact />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
