import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import AcilisAnimasyonu from './components/AcilisAnimasyonu';
import HosGeldinKarti from './components/HosGeldinKarti';
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
  return <div style={{ background: '#0a0a0a', minHeight: '100vh' }} />;
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
  const [menuAcik, setMenuAcik]           = useState(false);
  const [acilisGoster, setAcilisGoster]   = useState(true);
  const [kartGoster, setKartGoster]       = useState(false);
  const [kullanici, setKullanici]         = useState(undefined);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setKullanici(u || null));
    return unsub;
  }, []);

  useEffect(() => {
    const noMenu = (e) => { const t = e.target.tagName; if (t !== 'INPUT' && t !== 'TEXTAREA' && t !== 'SELECT') e.preventDefault(); };
    const noCopy = (e) => { const t = e.target.tagName; if (t !== 'INPUT' && t !== 'TEXTAREA') e.preventDefault(); };
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

  if (kullanici === undefined) return null;

  const misafirSecti = localStorage.getItem('glamworld_misafir_secti') === 'true';

  const animasyonuGizle = () => setAcilisGoster(false);

  const kartAc = () => {
    if (!kullanici && !misafirSecti) setKartGoster(true);
  };

  const misafirSec = () => {
    try { localStorage.setItem('glamworld_misafir_secti', 'true'); } catch {}
    setKartGoster(false);
  };

  return (
    <BrowserRouter basename="/glamworld">
      {acilisGoster && (kullanici === null || kullanici === undefined) && !misafirSecti && (
        <AcilisAnimasyonu onBitti={animasyonuGizle} onKartGoster={kartAc} />
      )}
      {kartGoster && !kullanici && (
        <HosGeldinKarti onMisafir={misafirSec} />
      )}
      <AltinCerceve />
      <UstSerit />
      <AnaMenu onMenuClick={() => setMenuAcik(true)} />
      <SolMenuPencere acik={menuAcik} onKapat={() => setMenuAcik(false)} />
      <Icerik />
    </BrowserRouter>
  );
}

export default App;
