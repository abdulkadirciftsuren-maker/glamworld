import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import DevWidget from '../DevWidget';
import Tooltip from '../Tooltip';
import './SignUp.css';

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

function SilverStar() {
  return (
    <svg viewBox="0 0 100 100" width="60" height="60" className="silver-star">
      <defs>
        <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8"/>
          <stop offset="50%" stopColor="#C0C0C0"/>
          <stop offset="100%" stopColor="#A0A0A0"/>
        </linearGradient>
      </defs>
      <polygon
        points="50,10 61,37 90,37 68,56 76,83 50,65 24,83 32,56 10,37 39,37"
        fill="url(#silverGrad)" stroke="#E8E8E8" strokeWidth="0.5"
      />
      <polygon points="50,18 57,36 48,36" fill="#F0F0F0" opacity="0.7"/>
    </svg>
  );
}

function BlueDiamond() {
  return (
    <svg viewBox="0 0 100 100" width="60" height="60" className="blue-diamond">
      <defs>
        <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB"/>
          <stop offset="50%" stopColor="#1E90FF"/>
          <stop offset="100%" stopColor="#0066CC"/>
        </linearGradient>
        <linearGradient id="topGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B0E0E6"/>
          <stop offset="100%" stopColor="#4682B4"/>
        </linearGradient>
      </defs>
      <polygon points="25,35 75,35 65,20 35,20" fill="url(#topGrad)" stroke="#fff" strokeWidth="0.5"/>
      <polygon points="25,35 50,85 15,40" fill="#4682B4" stroke="#fff" strokeWidth="0.5"/>
      <polygon points="75,35 50,85 85,40" fill="#4682B4" stroke="#fff" strokeWidth="0.5"/>
      <polygon points="25,35 75,35 50,85" fill="url(#diamondGrad)" stroke="#fff" strokeWidth="0.5"/>
      <line x1="35" y1="25" x2="45" y2="30" stroke="#fff" strokeWidth="2" opacity="0.8"/>
    </svg>
  );
}

function hataMesaji(kod) {
  const m = {
    'auth/email-already-in-use': 'Bu e-posta zaten kayıtlı.',
    'auth/invalid-email': 'Geçersiz e-posta adresi.',
    'auth/weak-password': 'Şifre en az 6 karakter olmalı.',
    'auth/too-many-requests': 'Çok fazla deneme. Lütfen bekleyin.',
  };
  return m[kod] || 'Kayıt başarısız. Tekrar deneyin.';
}

export default function SignUp() {
  const [form, setForm] = useState({ isim: '', soyisim: '', email: '', sifre: '', sifreTekrar: '', telefon: '' });
  const [hesapTuru, setHesapTuru] = useState('');
  const [sartlar, setSartlar] = useState(false);
  const [hata, setHata] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const escDinle = (e) => { if (e.key === 'Escape') navigate('/'); };
    document.addEventListener('keydown', escDinle);
    return () => document.removeEventListener('keydown', escDinle);
  }, [navigate]);

  const guncelle = (alan) => (e) => setForm({ ...form, [alan]: e.target.value });

  const dogrula = () => {
    if (!form.isim || !form.soyisim || !form.email || !form.sifre || !form.sifreTekrar)
      return 'Lütfen tüm alanları doldurun.';
    if (form.sifre.length < 6) return 'Şifre en az 6 karakter olmalı.';
    if (form.sifre !== form.sifreTekrar) return 'Şifreler eşleşmiyor.';
    if (!hesapTuru) return 'Lütfen hesap türü seçin.';
    if (!sartlar) return 'Kullanım şartlarını kabul etmelisiniz.';
    return null;
  };

  const kayitOl = async (e) => {
    e.preventDefault();
    const hataMsg = dogrula();
    if (hataMsg) { setHata(hataMsg); return; }
    setYukleniyor(true); setHata('');
    try {
      const sonuc = await createUserWithEmailAndPassword(auth, form.email, form.sifre);
      await updateProfile(sonuc.user, { displayName: `${form.isim} ${form.soyisim}` });
      await setDoc(doc(db, 'kullanicilar', sonuc.user.uid), {
        isim: form.isim, soyisim: form.soyisim,
        email: form.email, telefon: form.telefon,
        hesapTuru, olusturuldu: new Date().toISOString(),
      });
      navigate('/');
    } catch (err) {
      setHata(hataMesaji(err.code));
    } finally {
      setYukleniyor(false);
    }
  };

  const googleKayit = async () => {
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
    <div className="signup-sayfa">
      <Tooltip text="Kapat" position="bottom">
        <button className="kapat-btn" onClick={() => navigate('/')}>&#x2715;</button>
      </Tooltip>

      <div className="signup-kart">
        <h1 className="signup-logo">GLAMWORLD</h1>
        <h2 className="signup-baslik">Üye Ol</h2>

        <form onSubmit={kayitOl}>
          <div className="iki-sutun">
            <div className="signup-alan">
              <label>İsim</label>
              <input type="text" value={form.isim} onChange={guncelle('isim')} autoComplete="given-name" />
            </div>
            <div className="signup-alan">
              <label>Soyisim</label>
              <input type="text" value={form.soyisim} onChange={guncelle('soyisim')} autoComplete="family-name" />
            </div>
          </div>

          <div className="signup-alan">
            <label>E-posta</label>
            <input type="email" value={form.email} onChange={guncelle('email')} autoComplete="email" />
          </div>

          <div className="iki-sutun">
            <div className="signup-alan">
              <label>Şifre</label>
              <input type="password" value={form.sifre} onChange={guncelle('sifre')} autoComplete="new-password" />
            </div>
            <div className="signup-alan">
              <label>Şifre Tekrar</label>
              <input type="password" value={form.sifreTekrar} onChange={guncelle('sifreTekrar')} autoComplete="new-password" />
            </div>
          </div>

          <div className="signup-alan">
            <label>Telefon</label>
            <input type="tel" value={form.telefon} onChange={guncelle('telefon')} autoComplete="tel" />
          </div>

          {/* Hesap türü seçimi */}
          <div className="uyelik-secim">
            <Tooltip text="Müşteri Üyelik - Ücretsiz" position="top">
              <button type="button"
                className={`uyelik-kart silver-card${hesapTuru === 'musteri' ? ' secili' : ''}`}
                onClick={() => setHesapTuru('musteri')}
              >
                <SilverStar />
                <div className="kart-baslik-silver">Müşteri</div>
                <div className="kart-aciklama">Randevu al, profesyonelleri keşfet, içerik izle</div>
                <div className="kart-etiket-silver">Ücretsiz</div>
              </button>
            </Tooltip>

            <Tooltip text="Pırlanta Üye - Profesyonel" position="top">
              <button type="button"
                className={`uyelik-kart gold-card${hesapTuru === 'profesyonel' ? ' secili' : ''}`}
                onClick={() => setHesapTuru('profesyonel')}
              >
                <BlueDiamond />
                <div className="kart-etiket-pirlanta">Pırlanta Üye</div>
                <div className="kart-baslik-gold">Profesyonel</div>
                <div className="kart-aciklama">Profil oluştur, randevu al, gelir takibi yap</div>
                <div className="kart-etiket-gold">Ücretsiz başla</div>
              </button>
            </Tooltip>
          </div>

          <label className="sartlar-satir">
            <input type="checkbox" checked={sartlar} onChange={e => setSartlar(e.target.checked)} />
            <span>
              <a href="/sartlar" target="_blank" rel="noreferrer">Kullanım Şartları</a> ve{' '}
              <a href="/gizlilik" target="_blank" rel="noreferrer">Gizlilik Politikası</a>'nı kabul ediyorum
            </span>
          </label>

          {hata && <p className="signup-hata">{hata}</p>}

          <button type="submit" disabled={yukleniyor} className="signup-ana-btn">
            {yukleniyor ? 'Üye olunuyor...' : 'Üye Ol'}
          </button>
        </form>

        <div className="signup-ayirici">
          <span className="cizgi" /><span className="veya">veya</span><span className="cizgi" />
        </div>

        <Tooltip text="Google hesabınla üye ol" position="top">
          <button onClick={googleKayit} disabled={yukleniyor} className="google-btn">
            <GoogleLogo /> Google ile Üye Ol
          </button>
        </Tooltip>
        <Tooltip text="Telefon numaranla üye ol (yakında aktif)" position="top">
          <button onClick={() => setHata('Telefon ile kayıt yakında aktif olacak.')} className="telefon-btn">
            Telefon ile Üye Ol
          </button>
        </Tooltip>

        <p className="signup-alt-link">
          Zaten hesabın var mı? <Link to="/giris">Giriş Yap</Link>
        </p>
      </div>

      <DevWidget sayfa="Üye Ol" />
    </div>
  );
}
