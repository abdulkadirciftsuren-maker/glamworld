import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useKartDisiTiklama } from '../../hooks/useKartDisiTiklama';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import DevWidget from '../DevWidget';
import Pirlanta from '../Pirlanta';
import SosyalButon from '../SosyalButon';
import './Login.css';

const shimmerCSS = `@keyframes shimmer{0%{background-position:-200% center}100%{background-position:200% center}}`;

function hataMesaji(kod) {
  const m = {
    'auth/user-not-found': 'Bu e-posta kayıtlı değil.',
    'auth/wrong-password': 'Şifre yanlış.',
    'auth/invalid-email': 'Geçersiz e-posta.',
    'auth/too-many-requests': 'Çok fazla deneme.',
    'auth/invalid-credential': 'E-posta veya şifre hatalı.',
  };
  return m[kod] || 'Giriş başarısız.';
}

export default function Login() {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [beniHatirla, setBeniHatirla] = useState(false);
  const [hata, setHata] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const navigate = useNavigate();
  const kartRef = useRef(null);
  useKartDisiTiklama(kartRef, () => navigate('/'));

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') navigate('/'); };
    document.addEventListener('keydown', esc);
    window.history.pushState(null, '', window.location.pathname);
    const popstate = () => navigate('/');
    window.addEventListener('popstate', popstate);
    return () => {
      document.removeEventListener('keydown', esc);
      window.removeEventListener('popstate', popstate);
    };
  }, [navigate]);

  const emailGiris = async (e) => {
    e.preventDefault();
    if (!email || !sifre) { setHata('Lütfen tüm alanları doldurun.'); return; }
    setYukleniyor(true); setHata('');
    try {
      await signInWithEmailAndPassword(auth, email, sifre);
      window.location.href = '/glamworld/';
    } catch (err) { setHata(hataMesaji(err.code)); }
    finally { setYukleniyor(false); }
  };

  const googleGiris = async () => {
    setYukleniyor(true); setHata('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      window.location.href = '/glamworld/';
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') setHata(hataMesaji(err.code));
    }
    finally { setYukleniyor(false); }
  };

  const yakinda = () => setHata('Bu yöntem yakında aktif olacak.');

  return (
    <div className="login-sayfa">
      <style>{shimmerCSS}</style>
      <button className="kapat-btn kapat-tooltip" onClick={() => navigate('/')} data-tip="Kapat">&#x2715;</button>

      <div className="login-kart" ref={kartRef}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>
          <Pirlanta renk="altin" boyut={22} />
          <h1 className="login-logo">GLAMWORLD</h1>
          <Pirlanta renk="altin" boyut={22} />
        </div>
        <h2 className="login-baslik">Hoş Geldin</h2>

        <div className="sosyal-grid">
          <div className="sosyal-ust">
            <SosyalButon tip="google" mod="giris" onClick={googleGiris} />
            <SosyalButon tip="apple"  mod="giris" onClick={yakinda} />
          </div>
          <div className="sosyal-alt">
            <SosyalButon tip="facebook"  mod="giris" onClick={yakinda} />
            <SosyalButon tip="instagram" mod="giris" onClick={yakinda} />
            <SosyalButon tip="telefon"   mod="giris" onClick={yakinda} />
          </div>
        </div>

        <div className="ayrac">veya</div>

        <form onSubmit={emailGiris}>
          <div className="login-alan">
            <label>E-posta</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div className="login-alan">
            <label>Şifre</label>
            <input type="password" value={sifre} onChange={e => setSifre(e.target.value)} autoComplete="current-password" />
          </div>
          <div className="alt-secenekler">
            <label className="checkbox-label">
              <input type="checkbox" checked={beniHatirla} onChange={e => setBeniHatirla(e.target.checked)} />
              Beni Hatırla
            </label>
            <Link to="/sifremi-unuttum" className="unuttu-link">Şifremi Unuttum</Link>
          </div>
          {hata && <p className="login-hata">{hata}</p>}
          <button type="submit" disabled={yukleniyor} className="login-ana-btn">
            {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <p className="login-alt-link">
          Üye değil misin? <Link to="/uye-ol">Üye Ol</Link>
        </p>
      </div>

      <DevWidget sayfa="Giriş Yap" />
    </div>
  );
}
