import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import DevWidget from '../DevWidget';

const shimmerCSS = `
  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

function AuthChoice() {
  const [secim, setSecim] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [hata, setHata] = useState('');
  const navigate = useNavigate();

  const devam = async () => {
    if (!secim) { setHata('Lütfen bir hesap türü seçin.'); return; }
    const kullanici = auth.currentUser;
    if (!kullanici) { navigate('/giris'); return; }
    setYukleniyor(true); setHata('');
    try {
      await setDoc(doc(db, 'kullanicilar', kullanici.uid), {
        hesapTuru: secim,
        email: kullanici.email,
        displayName: kullanici.displayName || '',
        olusturuldu: new Date().toISOString(),
      }, { merge: true });
      navigate('/');
    } catch (err) {
      setHata('Bilgiler kaydedilemedi. Tekrar deneyin.');
    } finally {
      setYukleniyor(false);
    }
  };

  return (
    <div style={s.sayfa}>
      <style>{shimmerCSS}</style>

      <button style={s.kapatBtn} onClick={() => navigate('/')}>&#x2715;</button>

      <div style={s.kart}>
        <h1 style={s.logo}>GLAMWORLD</h1>
        <h2 style={s.baslik}>Hesap Türünü Seç</h2>
        <p style={s.aciklama}>Devam etmek için hesap türünü belirle.</p>

        <div style={s.kartlar}>
          <button
            onClick={() => setSecim('musteri')}
            style={{ ...s.secimKarti, ...(secim === 'musteri' ? s.secimSecili : {}) }}
          >
            <div style={s.kartIkon}>&#9733;</div>
            <div style={s.kartBaslik}>Müşteri</div>
            <div style={s.kartAciklama}>Randevu al, profesyonelleri keşfet, içerik izle</div>
            <div style={s.kartFiyat}>Ücretsiz</div>
          </button>

          <button
            onClick={() => setSecim('profesyonel')}
            style={{ ...s.secimKarti, ...(secim === 'profesyonel' ? s.secimSecili : {}) }}
          >
            <div style={s.kartIkon}>&#9670;</div>
            <div style={s.kartBaslik}>Profesyonel</div>
            <div style={s.kartAciklama}>Profil oluştur, randevu al, gelir takibi yap</div>
            <div style={s.kartFiyat}>Ücretsiz başla</div>
          </button>
        </div>

        {hata && <p style={s.hata}>{hata}</p>}

        <button
          onClick={devam}
          disabled={yukleniyor || !secim}
          style={{ ...s.devamBtn, ...((!secim || yukleniyor) ? s.devamBtnDisabled : {}) }}
        >
          {yukleniyor ? 'Kaydediliyor...' : 'Devam Et'}
        </button>
      </div>

      <DevWidget sayfa="Hesap Seçimi" />
    </div>
  );
}

const s = {
  sayfa: { background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, position: 'relative' },
  kapatBtn: { position: 'fixed', top: 16, right: 16, width: 44, height: 44, background: 'rgba(255,215,0,0.1)', border: '1.5px solid #FFD700', borderRadius: '50%', color: '#FFD700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', zIndex: 100 },
  kart: { background: 'rgba(255,215,0,0.04)', border: '1px solid rgba(255,215,0,0.2)', borderRadius: 16, padding: '40px 32px', width: '100%', maxWidth: 480, animation: 'fadeIn 0.4s ease' },
  logo: { color: '#FFD700', fontFamily: 'Georgia, serif', fontSize: '1.8rem', textAlign: 'center', margin: '0 0 6px', letterSpacing: 3 },
  baslik: { color: '#fff', textAlign: 'center', fontSize: '1.2rem', fontWeight: 400, margin: '0 0 8px' },
  aciklama: { color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontSize: '0.9rem', margin: '0 0 28px' },
  kartlar: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 },
  secimKarti: { background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,215,0,0.2)', borderRadius: 12, padding: '20px 14px', cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' },
  secimSecili: { background: 'rgba(255,215,0,0.1)', border: '1.5px solid #FFD700', boxShadow: '0 0 20px rgba(255,215,0,0.15)' },
  kartIkon: { fontSize: '1.8rem', color: '#FFD700' },
  kartBaslik: { color: '#FFD700', fontWeight: 700, fontSize: '1rem' },
  kartAciklama: { color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', lineHeight: 1.4 },
  kartFiyat: { color: 'rgba(255,215,0,0.7)', fontSize: '0.82rem', marginTop: 4 },
  hata: { color: '#ff6b6b', fontSize: '0.85rem', margin: '0 0 10px', textAlign: 'center' },
  devamBtn: { background: 'linear-gradient(90deg,#FFD700,#FFA500,#FFD700)', backgroundSize: '200% auto', animation: 'shimmer 2.5s linear infinite', border: 'none', borderRadius: 10, color: '#0a0a0a', cursor: 'pointer', fontSize: '1rem', fontWeight: 700, padding: 14, width: '100%' },
  devamBtnDisabled: { opacity: 0.5, cursor: 'not-allowed', animation: 'none', background: 'rgba(255,215,0,0.3)' },
};

export default AuthChoice;
