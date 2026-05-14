import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import DevWidget from './components/DevWidget';
import GeriButon from './components/GeriButon';
import Pirlanta from './components/Pirlanta';
import UstSerit from './components/UstSerit';
import Login from './components/uyelik/Login';
import SignUp from './components/uyelik/SignUp';
import './App.css';

function Anasayfa() {
  const navigate = useNavigate();
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
        <div style={{ marginTop: 32, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/giris')} style={{ padding: '12px 32px', background: 'transparent', border: '2px solid #FFD700', borderRadius: 999, color: '#FFD700', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Giriş Yap
          </button>
          <button onClick={() => navigate('/uye-ol')} style={{ padding: '12px 32px', background: 'linear-gradient(135deg,#FFD700,#FFA500)', border: 'none', borderRadius: 999, color: '#000', fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>
            Üye Ol
          </button>
        </div>
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
  useEffect(() => {
    const noMenu = (e) => {
      const t = e.target.tagName;
      if (t !== 'INPUT' && t !== 'TEXTAREA' && t !== 'SELECT') e.preventDefault();
    };
    const noCopy = (e) => {
      const t = e.target.tagName;
      if (t !== 'INPUT' && t !== 'TEXTAREA') e.preventDefault();
    };
    const noDrag = (e) => {
      if (e.target.tagName === 'IMG') e.preventDefault();
    };
    document.addEventListener('contextmenu', noMenu);
    document.addEventListener('copy', noCopy);
    document.addEventListener('cut', noCopy);
    document.addEventListener('dragstart', noDrag);
    return () => {
      document.removeEventListener('contextmenu', noMenu);
      document.removeEventListener('copy', noCopy);
      document.removeEventListener('cut', noCopy);
      document.removeEventListener('dragstart', noDrag);
    };
  }, []);

  return (
    <BrowserRouter basename="/glamworld">
      <UstSerit />
      <Icerik />
    </BrowserRouter>
  );
}

export default App;
