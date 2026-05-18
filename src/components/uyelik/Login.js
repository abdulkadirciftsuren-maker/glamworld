import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useKartDisiTiklama } from '../../hooks/useKartDisiTiklama';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import DevWidget from '../DevWidget';
import Pirlanta from '../Pirlanta';
import SosyalButon from '../SosyalButon';
import AltinTozAtmosfer from '../AltinTozAtmosfer';
import SifreSifirlaModal from './SifreSifirlaModal';
import TelefonModal from './TelefonModal';
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
  const [sifreModalAcik, setSifreModalAcik] = useState(false);
  const [sifreGoster, setSifreGoster] = useState(false);
  const navigate = useNavigate();
  const kartRef = useRef(null);
  useKartDisiTiklama(kartRef, () => navigate('/'));

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') navigate('/'); };
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('keydown', esc);
    };
  }, [navigate]);

  const emailGiris = async (e) => {
    e.preventDefault();
    if (!email || !sifre) { setHata('Lütfen tüm alanları doldurun.'); return; }
    setYukleniyor(true); setHata('');
    try {
      await signInWithEmailAndPassword(auth, email, sifre);
      navigate('/', { replace: true });
    } catch (err) { setHata(hataMesaji(err.code)); }
    finally { setYukleniyor(false); }
  };

  const googleGiris = async () => {
    setYukleniyor(true); setHata('');
    try {
      const r = await signInWithPopup(auth, new GoogleAuthProvider());
      const u = r.user;
      const ref = doc(db, 'kullanicilar', u.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        const ad = (u.displayName||'').split(' ');
        await setDoc(ref, { uid:u.uid, isim:ad[0]||'', soyisim:ad.slice(1).join(' ')||'', email:u.email||'', fotoUrl:u.photoURL||'', hesapTuru:'musteri', kayitYolu:'google', kayitTarihi:new Date().toISOString(), aktifMi:true });
      }
      navigate('/', { replace: true });
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user') setHata(hataMesaji(err.code));
    }
    finally { setYukleniyor(false); }
  };

  return (
    <div className="login-sayfa">
      <AltinTozAtmosfer />
      <style>{shimmerCSS}</style>
      <button className="kapat-btn kapat-tooltip" onClick={() => navigate('/')} data-tip="Kapat">&#x2715;</button>

      <div className="login-kart" ref={kartRef} style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>
          <Pirlanta renk="altin" boyut={22} />
          <h1 className="login-logo">GLAMWORLD</h1>
          <Pirlanta renk="altin" boyut={22} />
        </div>
        <h2 className="login-baslik">Hoş Geldin</h2>

        <div className="sosyal-grid">
          <div className="sosyal-ust">
            <SosyalButon tip="google"  mod="giris" onClick={googleGiris} />
            <div style={{position:'relative',display:'inline-block'}}>
              <SosyalButon tip="telefon" mod="giris" onClick={() => alert('Telefon ile giriş yakında aktif olacak. Google veya Email ile devam edebilirsin.')} />
              <span style={{position:'absolute',top:-8,right:-8,background:'linear-gradient(135deg,#FFD700,#FFA500)',color:'#1a1a1a',fontSize:9,fontWeight:700,padding:'3px 8px',borderRadius:10,pointerEvents:'none'}}>YAKINDA</span>
            </div>
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
            <div style={{position:'relative'}}>
              <input type={sifreGoster?'text':'password'} value={sifre} onChange={e=>setSifre(e.target.value)} autoComplete="current-password" style={{width:'100%',boxSizing:'border-box',paddingRight:44}} />
              <button type="button" onClick={()=>setSifreGoster(!sifreGoster)} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'#FFD700',cursor:'pointer',fontSize:16}}>{sifreGoster?'🙈':'👁'}</button>
            </div>
          </div>
          <div className="alt-secenekler">
            <label className="checkbox-label">
              <input type="checkbox" checked={beniHatirla} onChange={e => setBeniHatirla(e.target.checked)} />
              Beni Hatırla
            </label>
            <span onClick={() => setSifreModalAcik(true)} className="unuttu-link" style={{cursor:'pointer'}}>Şifremi Unuttum</span>
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
      <SifreSifirlaModal acik={sifreModalAcik} onKapat={() => setSifreModalAcik(false)} />
    </div>
  );
}
