import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AcilisAnimasyonu from './components/AcilisAnimasyonu';
import DevWidget from './components/DevWidget';
import GeriButon from './components/GeriButon';
import UstSerit from './components/UstSerit';
import AnaMenu from './components/AnaMenu';
import SolMenuPencere from './components/SolMenuPencere';
import AltinCerceve from './components/AltinCerceve';
import Login from './components/uyelik/Login';
import SignUp from './components/uyelik/SignUp';
import './App.css';

function AnaSayfa() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }} />
  );
}

function Icerik() {
  return (
    <>
      <Routes>
        <Route path="/"       element={<AnaSayfa />} />
        <Route path="/giris"  element={<Login />}    />
        <Route path="/uye-ol" element={<SignUp />}   />
      </Routes>
      <GeriButon />
      <DevWidget sayfa="Sayfa" />
    </>
  );
}

function App() {
  const [menuAcik, setMenuAcik] = useState(false);
  const [acilisGoster, setAcilisGoster] = useState(true);

  useEffect(() => {
    const noMenu = (e) => {
      const t = e.target.tagName;
      if (t !== 'INPUT' && t !== 'TEXTAREA' && t !== 'SELECT') e.preventDefault();
    };
    const noCopy = (e) => {
      const t = e.target.tagName;
      if (t !== 'INPUT' && t !== 'TEXTAREA') e.preventDefault();
    };
    const noDrag = (e) => { if (e.target.tagName === 'IMG') e.preventDefault(); };
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
      {acilisGoster && <AcilisAnimasyonu onBitti={() => setAcilisGoster(false)} />}
      <AltinCerceve />
      <UstSerit />
      <AnaMenu onMenuClick={() => setMenuAcik(true)} />
      <SolMenuPencere acik={menuAcik} onKapat={() => setMenuAcik(false)} />
      <Icerik />
    </BrowserRouter>
  );
}

export default App;
