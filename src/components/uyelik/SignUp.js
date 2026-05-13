import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase';

const shimmerCSS = `
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
`;

function hataMesaji(kod) {
  const mesajlar = {
    'auth/email-already-in-use': 'Bu e-posta adresi zaten kayıtlı.',
    'auth/invalid-email': 'Geçersiz e-posta adresi.',
    'auth/weak-password': 'Şifre en az 6 karakter olmalı.',
    'auth/too-many-requests': 'Çok fazla deneme. Lütfen bekleyin.',
  };
  return mesajlar[kod] || 'Kayıt başarısız. Tekrar deneyin.';
}

function SignUp() {
  const [form, setForm] = useState({ adSoyad: '', email: '', sifre: '', sifreTekrar: '' });
  const [hata, setHata] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const navigate = useNavigate();

  const guncelle = (alan) => (e) => setForm({ ...form, [alan]: e.target.value });

  const dogrula = () => {
    if (!form.adSoyad || !form.email || !form.sifre || !form.sifreTekrar)
      return 'Lütfen tüm alanları doldurun.';
    if (form.sifre.length < 6)
      return 'Şifre en az 6 karakter olmalı.';
    if (form.sifre !== form.sifreTekrar)
      return 'Şifreler eşleşmiyor.';
    return null;
  };

  const emailKayit = async (e) => {
    e.preventDefault();
    const dogrulamaHatasi = dogrula();
    if (dogrulamaHatasi) { setHata(dogrulamaHatasi); return; }
    setYukleniyor(true); setHata('');
    try {
      const sonuc = await createUserWithEmailAndPassword(auth, form.email, form.sifre);
      await updateProfile(sonuc.user, { displayName: form.adSoyad });
      navigate('/hesap-secimi');
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
      navigate('/hesap-secimi');
    } catch (err) {
      setHata(hataMesaji(err.code));
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={s.sayfa}>
      <style>{shimmerCSS}</style>
      <div style={s.kart}>

        <h1 style={s.logo}>GLAMWORLD</h1>
        <h2 style={s.baslik}>Üye Ol</h2>

        <form onSubmit={emailKayit} style={s.form}>
          {[
            { alan: 'adSoyad', etiket: 'Ad Soyad', tip: 'text', auto: 'name' },
            { alan: 'email', etiket: 'E-posta', tip: 'email', auto: 'email' },
            { alan: 'sifre', etiket: 'Şifre', tip: 'password', auto: 'new-password' },
            { alan: 'sifreTekrar', etiket: 'Şifre Tekrar', tip: 'password', auto: 'new-password' },
          ].map(({ alan, etiket, tip, auto }) => (
            <div key={alan} style={s.alan}>
              <label style={s.etiket}>{etiket}</label>
              <input
                type={tip}
                value={form[alan]}
                onChange={guncelle(alan)}
                style={s.input}
                autoComplete={auto}
              />
            </div>
          ))}

          {hata && <p style={s.hata}>{hata}</p>}

          <button type="submit" disabled={yukleniyor} style={s.anaButon}>
            {yukleniyor ? 'Kaydediliyor...' : 'Üye Ol'}
          </button>
        </form>

        <div style={s.ayirici}>
          <span style={s.cizgi} />
          <span style={s.veya}>veya</span>
          <span style={s.cizgi} />
        </div>

        <button onClick={googleKayit} disabled={yukleniyor} style={s.sosyal}>
          Google ile Üye Ol
        </button>
        <button
          onClick={() => setHata('Telefon ile kayıt yakında aktif olacak.')}
          style={{ ...s.sosyal, marginTop: 10 }}
        >
          Telefon ile Üye Ol
        </button>

        <p style={s.altLink}>
          Zaten hesabın var mı?{' '}
          <Link to="/giris" style={s.link}>Giriş Yap</Link>
        </p>
      </div>
    </div>
  );
}

const s = {
  sayfa: { background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 },
  kart: { background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 16, padding: '40px 32px', width: '100%', maxWidth: 400 },
  logo: { color: '#FFD700', fontFamily: 'Georgia, serif', fontSize: '1.8rem', textAlign: 'center', margin: '0 0 6px', letterSpacing: 3 },
  baslik: { color: '#fff', textAlign: 'center', fontSize: '1.1rem', fontWeight: 400, margin: '0 0 28px' },
  form: { display: 'flex', flexDirection: 'column', gap: 14 },
  alan: { display: 'flex', flexDirection: 'column', gap: 6 },
  etiket: { color: 'rgba(255,215,0,0.8)', fontSize: '0.85rem' },
  input: { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,215,0,0.3)', borderRadius: 8, color: '#fff', fontSize: '1rem', padding: '12px 14px', outline: 'none' },
  hata: { color: '#ff6b6b', fontSize: '0.85rem', margin: 0, textAlign: 'center' },
  anaButon: { background: 'linear-gradient(90deg,#FFD700,#FFA500,#FFD700)', backgroundSize: '200% auto', animation: 'shimmer 2.5s linear infinite', border: 'none', borderRadius: 10, color: '#0a0a0a', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, marginTop: 6, padding: 14, width: '100%' },
  ayirici: { alignItems: 'center', display: 'flex', gap: 10, margin: '20px 0 14px' },
  cizgi: { background: 'rgba(255,215,0,0.2)', flex: 1, height: 1 },
  veya: { color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem' },
  sosyal: { background: 'transparent', border: '1px solid rgba(255,215,0,0.35)', borderRadius: 10, color: '#FFD700', cursor: 'pointer', fontSize: '0.95rem', padding: 13, width: '100%' },
  altLink: { color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', marginTop: 20, textAlign: 'center' },
  link: { color: '#FFD700', textDecoration: 'none', fontWeight: 600 },
};

export default SignUp;
