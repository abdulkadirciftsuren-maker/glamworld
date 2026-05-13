import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import DevWidget from '../DevWidget';
import Tooltip from '../Tooltip';
import './Login.css';

function hataMesaji(kod) {
  const m = {
    'auth/user-not-found': 'Bu e-posta kayıtlı değil.',
    'auth/wrong-password': 'Şifre yanlış.',
    'auth/invalid-email': 'Geçersiz e-posta adresi.',
    'auth/too-many-requests': 'Çok fazla deneme. Lütfen bekleyin.',
    'auth/invalid-credential': 'E-posta veya şifre hatalı.',
  };
  return m[kod] || 'Giriş başarısız. Tekrar deneyin.';
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.8 2.5 30.2 0 24 0 14.6 0 6.6 5.4 2.7 13.3l7.8 6.1C12.4 13.1 17.8 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"/>
      <path fill="#FBBC05" d="M10.5 28.6A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.1.8-4.6l-7.8-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.5 10.7l8-6.1z"/>
      <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.2 0-11.5-4.2-13.4-9.8l-8 6.1C6.5 42.6 14.6 48 24 48z"/>
    </svg>
  );
}

function Login() {
  const [email, setEmail] = useState('');
  const [sifre, setSifre] = useState('');
  const [beniHatirla, setBeniHatirla] = useState(false);
  const [hata, setHata] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const escDinle = (e) => { if (e.key === 'Escape') navigate('/'); };
    document.addEventListener('keydown', escDinle);
    return () => document.removeEventListener('keydown', escDinle);
  }, [navigate]);

  const emailGiris = async (e) => {
    e.preventDefault();
    if (!email || !sifre) { setHata('Lütfen tüm alanları doldurun.'); return; }
    setYukleniyor(true); setHata('');
    try {
      await signInWithEmailAndPassword(auth, email, sifre);
      navigate('/');
    } catch (err) {
      setHata(hataMesaji(err.code));
    } finally {
      setYukleniyor(false);
    }
  };

  const googleGiris = async () => {
    setYukleniyor(true); setHata('');
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate('/');
    } catch (err) {
      setHata(hataMesaji(err.code));
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div className="login-sayfa">
      <Tooltip text="Kapat" position="bottom">
        <button className="kapat-btn" onClick={() => navigate('/')}>&#x2715;</button>
      </Tooltip>

      <div className="login-kart">
        <h1 className="login-logo">GLAMWORLD</h1>
        <h2 className="login-baslik">Hoş Geldin</h2>

        <form onSubmit={emailGiris}>
          <div className="login-alan">
            <label>E-posta</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <div className="login-alan">
            <label>Şifre</label>
            <input
              type="password"
              value={sifre}
              onChange={e => setSifre(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <div className="alt-secenekler">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={beniHatirla}
                onChange={e => setBeniHatirla(e.target.checked)}
              />
              Beni Hatırla
            </label>
            <Link to="/sifremi-unuttum" className="unuttu-link">Şifremi Unuttum</Link>
          </div>

          {hata && <p className="login-hata">{hata}</p>}

          <button type="submit" disabled={yukleniyor} className="login-ana-btn">
            {yukleniyor ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="login-ayirici">
          <span className="cizgi" />
          <span className="veya">veya</span>
          <span className="cizgi" />
        </div>

        <div className="sosyal-buton-grup">
          <Tooltip text="Google hesabınla giriş yap" position="top">
            <button onClick={googleGiris} disabled={yukleniyor} className="google-btn">
              <GoogleLogo />
              Google ile Giriş Yap
            </button>
          </Tooltip>
          <Tooltip text="Telefon numaranla giriş yap (yakında aktif)" position="top">
            <button
              onClick={() => setHata('Telefon ile giriş yakında aktif olacak.')}
              className="telefon-btn"
            >
              Telefon ile Giriş Yap
            </button>
          </Tooltip>
        </div>

        <p className="login-alt-link">
          Üye değil misin? <Link to="/uye-ol">Üye Ol</Link>
        </p>
      </div>

      <DevWidget sayfa="Giriş Yap" />
    </div>
  );
}

export default Login;
