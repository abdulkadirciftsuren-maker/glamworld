import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { kullaniciProfilOku } from './utils/kullaniciProfili';
import AcilisAnimasyonu from './components/AcilisAnimasyonu';
import HosGeldinKarti from './components/HosGeldinKarti';
import GeriButon from './components/GeriButon';
import UstSerit from './components/UstSerit';
import AnaMenu from './components/AnaMenu';
import IkonSeridi from './components/IkonSeridi';
import SolMenuPencere from './components/SolMenuPencere';
import SwipeNavigator from './components/SwipeNavigator';
import AltinCerceve from './components/AltinCerceve';
import Login from './components/uyelik/Login';
import SignUp from './components/uyelik/SignUp';
import PirlantaPazari from './sayfalar/PirlantaPazari';
import Tanisma from './sayfalar/Tanisma';
import CanliYayinlar from './sayfalar/CanliYayinlar';
import Harita from './sayfalar/Harita';
import Egitimler from './sayfalar/Egitimler';
import ProfilMusteri from './sayfalar/ProfilMusteri';
import ProfilErkek from './sayfalar/ProfilErkek';
import ProfilKadin from './sayfalar/ProfilKadin';
import ProfilTarafsiz from './sayfalar/ProfilTarafsiz';
import AnaSayfa from './sayfalar/AnaSayfa';
import { useRotaHafiza } from './utils/rotaHafiza';
import './App.css';

function DevWidgetRouteGuard() {
  const { pathname } = useLocation();
  if (pathname === '/') return null;
  return <style>{'.dev-widget,.dev-widget-mini{display:none!important}'}</style>;
}

function RotaHafizaKontrol() {
  useRotaHafiza();
  return null;
}

function GirisKontrol({ kullanici, acilisGoster, kartGoster, setKartGoster }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (!kullanici && !acilisGoster && pathname === '/') {
      setKartGoster(true);
    } else if (pathname !== '/') {
      setKartGoster(false);
    }
  }, [pathname, kullanici, acilisGoster, setKartGoster]);

  if (!kartGoster || !!kullanici || pathname !== '/') return null;
  return <HosGeldinKarti onKapat={() => setKartGoster(false)} />;
}

function IkonSeridiKontrol({ kartGoster, kullaniciProfili }) {
  const { pathname } = useLocation();
  if (kartGoster || pathname === '/giris' || pathname === '/uye-ol') return null;
  return <IkonSeridi kullaniciProfili={kullaniciProfili} />;
}

function Icerik() {
  return (
    <>
      <Routes>
        <Route path="/"                element={<AnaSayfa />}       />
        <Route path="/giris"           element={<Login />}          />
        <Route path="/uye-ol"          element={<SignUp />}         />
        <Route path="/pirlanta-pazari" element={<PirlantaPazari />} />
        <Route path="/tanisma"         element={<Tanisma />}        />
        <Route path="/canli-yayinlar"  element={<CanliYayinlar />}  />
        <Route path="/harita"          element={<Harita />}         />
        <Route path="/egitimler"       element={<Egitimler />}      />
        <Route path="/profil/musteri"  element={<ProfilMusteri />}  />
        <Route path="/profil/erkek"    element={<ProfilErkek />}    />
        <Route path="/profil/kadin"    element={<ProfilKadin />}    />
        <Route path="/profil/tarafsiz" element={<ProfilTarafsiz />} />
      </Routes>
      <GeriButon />
    </>
  );
}

function App() {
  const [menuAcik, setMenuAcik]       = useState(false);
  const [acilisGoster, setAcilisGoster] = useState(true);
  const [kartGoster, setKartGoster]   = useState(false);
  const [kullanici, setKullanici]     = useState(undefined);
  const [kullaniciProfili, setKullaniciProfili] = useState({ hesapTuru: 'musteri', cinsiyet: 'tarafsiz' });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      setKullanici(u || null);
      if (u) {
        const profil = await kullaniciProfilOku(u.uid);
        setKullaniciProfili(profil);
      } else {
        setKullaniciProfili({ hesapTuru: 'musteri', cinsiyet: 'tarafsiz' });
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    const noMenu = (e) => { const t=e.target.tagName; if(t!=='INPUT'&&t!=='TEXTAREA'&&t!=='SELECT') e.preventDefault(); };
    const noCopy = (e) => { const t=e.target.tagName; if(t!=='INPUT'&&t!=='TEXTAREA') e.preventDefault(); };
    const noDrag = (e) => { if(e.target.tagName==='IMG') e.preventDefault(); };
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

  return (
    <BrowserRouter basename="/glamworld">
      <SwipeNavigator kullaniciProfili={kullaniciProfili}>
        {acilisGoster && (
          <AcilisAnimasyonu
            onBitti={() => setAcilisGoster(false)}
            onKartGoster={() => setKartGoster(true)}
            kullanici={kullanici}
          />
        )}
        <RotaHafizaKontrol />
        <GirisKontrol
          kullanici={kullanici}
          acilisGoster={acilisGoster}
          kartGoster={kartGoster}
          setKartGoster={setKartGoster}
        />
        <DevWidgetRouteGuard />
        <AltinCerceve />
        <UstSerit />
        <AnaMenu onMenuClick={() => setMenuAcik(true)} />
        <IkonSeridiKontrol kartGoster={kartGoster} kullaniciProfili={kullaniciProfili} />
        <SolMenuPencere acik={menuAcik} onKapat={() => setMenuAcik(false)} />
        <Icerik />
      </SwipeNavigator>
    </BrowserRouter>
  );
}

export default App;
