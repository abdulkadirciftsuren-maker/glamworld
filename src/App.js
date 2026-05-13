import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import DevWidget from './components/DevWidget';
import GeriButon from './components/GeriButon';
import Pirlanta from './components/Pirlanta';
import Login from './components/uyelik/Login';
import SignUp from './components/uyelik/SignUp';
import './App.css';

function Anasayfa() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <header style={{ textAlign: 'center', padding: '60px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
          <Pirlanta renk="beyaz" boyut={32} />
          <h1 style={{ color: '#FFD700', fontFamily: 'Georgia, serif', fontSize: '2.5rem', margin: 0 }}>
            GLAMWORLD
          </h1>
          <Pirlanta renk="beyaz" boyut={32} />
        </div>
        <p style={{ color: 'rgba(255,215,0,0.6)', marginTop: 8 }}>
          Dünyanın Her Yerinden Profesyoneller Bir Arada
        </p>
      </header>
      <DevWidget sayfa="Anasayfa" />
    </div>
  );
}

function Icerik() {
  const konum = useLocation();
  const anasayfada = konum.pathname === '/';
  return (
    <>
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/giris" element={<Login />} />
        <Route path="/uye-ol" element={<SignUp />} />
      </Routes>
      {!anasayfada && <GeriButon />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter basename="/glamworld">
      <Icerik />
    </BrowserRouter>
  );
}

export default App;
