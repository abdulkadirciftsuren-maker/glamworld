import { useState, useEffect, useRef } from 'react';
import { useKartDisiTiklama } from '../../hooks/useKartDisiTiklama';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import DevWidget from '../DevWidget';
import Pirlanta from '../Pirlanta';
import SosyalButon from '../SosyalButon';
import AltinTozAtmosfer from '../AltinTozAtmosfer';
import Tooltip from '../Tooltip';
import { TelefonInput, SehirOnericisi } from './ProfesyonelAlanlar';
import DigerBranslarModal from './DigerBranslarModal';
import './SignUp.css';

const DNY = [{id:'yeni',ad:'Yeni Başlayan',sure:'0-2 yıl'},{id:'deneyimli',ad:'Deneyimli',sure:'3-5 yıl'},{id:'uzman',ad:'Uzman',sure:'6-10 yıl'},{id:'usta',ad:'Usta',sure:'10+ yıl'}];
const secS = {background:'rgba(255,215,0,0.15)',border:'2px solid #FFD700',boxShadow:'0 0 10px rgba(255,215,0,0.4)'};
const normS = {background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,215,0,0.4)'};
const btnBase = {borderRadius:10,padding:'7px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:3,cursor:'pointer',minHeight:56,transition:'all .2s'};

function SilverStar() {
  return (
    <svg viewBox="0 0 100 100" width="56" height="56" className="silver-star">
      <defs>
        <linearGradient id="sgr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8"/><stop offset="50%" stopColor="#C0C0C0"/><stop offset="100%" stopColor="#A0A0A0"/>
        </linearGradient>
      </defs>
      <polygon points="50,10 61,37 90,37 68,56 76,83 50,65 24,83 32,56 10,37 39,37" fill="url(#sgr)" stroke="#E8E8E8" strokeWidth="0.5"/>
      <polygon points="50,18 57,36 48,36" fill="#F0F0F0" opacity="0.7"/>
    </svg>
  );
}

function BlueDiamond() {
  return (
    <svg viewBox="0 0 100 100" width="56" height="56" className="blue-diamond">
      <defs>
        <linearGradient id="dgr" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB"/><stop offset="50%" stopColor="#1E90FF"/><stop offset="100%" stopColor="#0066CC"/>
        </linearGradient>
        <linearGradient id="dtop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#B0E0E6"/><stop offset="100%" stopColor="#4682B4"/>
        </linearGradient>
      </defs>
      <polygon points="25,35 75,35 65,20 35,20" fill="url(#dtop)" stroke="#fff" strokeWidth="0.5"/>
      <polygon points="25,35 50,85 15,40" fill="#4682B4" stroke="#fff" strokeWidth="0.5"/>
      <polygon points="75,35 50,85 85,40" fill="#4682B4" stroke="#fff" strokeWidth="0.5"/>
      <polygon points="25,35 75,35 50,85" fill="url(#dgr)" stroke="#fff" strokeWidth="0.5"/>
      <line x1="35" y1="25" x2="45" y2="30" stroke="#fff" strokeWidth="2" opacity="0.9"/>
    </svg>
  );
}

function hataMesaji(kod) {
  const m = {
    'auth/email-already-in-use': 'Bu e-posta zaten kayıtlı.',
    'auth/invalid-email': 'Geçersiz e-posta.',
    'auth/weak-password': 'Şifre en az 6 karakter.',
    'auth/too-many-requests': 'Çok fazla deneme.',
  };
  return m[kod] || 'Kayıt başarısız.';
}

const BOŞ_FORM = { isim:'', soyisim:'', email:'', sifre:'', sifreTekrar:'', telefon:'', cinsiyet:'', uzmanlik:'', sehir:'', deneyim:'', durum:'', sartlar:false };
const FORM_KEY = 'glamworld_form_data';

function formYukle() {
  try {
    const s = localStorage.getItem(FORM_KEY);
    if (s) {
      const p = JSON.parse(s);
      if (p.uzmanlik === 'Diğer') p.uzmanlik = '';
      return { ...BOŞ_FORM, ...p, sifre: '', sifreTekrar: '' };
    }
  } catch {}
  return BOŞ_FORM;
}

export default function SignUp() {
  const [hesapTuru, setHesapTuru] = useState(null);
  const [form, setForm] = useState(formYukle);
  const [hata, setHata] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const [seciliMeslek, setSeciliMeslek] = useState('');
  const [secDny, setSecDny] = useState('');
  const navigate = useNavigate();
  const [meslekModalAcik, setMeslekModalAcik] = useState(false);
  const kartRef = useRef(null);
  useKartDisiTiklama(kartRef, () => navigate('/'));

  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') navigate('/'); };
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('keydown', esc);
    };
  }, [navigate]);

  useEffect(() => {
    const { sifre, sifreTekrar, ...guvenli } = form;
    try { localStorage.setItem(FORM_KEY, JSON.stringify(guvenli)); } catch {}
  }, [form]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    if (form.uzmanlik === 'Diğer') setMeslekModalAcik(true);
  }, [form.uzmanlik]);

  const g = (alan) => (e) => setForm(f => ({ ...f, [alan]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const dogrula = () => {
    if (!hesapTuru) return 'Müşteri veya Profesyonel seç.';
    if (!form.isim || !form.isim.trim()) return 'İsim yazmalısın.';
    if (!form.soyisim || !form.soyisim.trim()) return 'Soyisim yazmalısın.';
    if (!form.email || !form.email.includes('@') || !form.email.includes('.')) return 'E-posta geçersiz (örn: ali@gmail.com)';
    if (!form.sifre || form.sifre.length < 6) return 'Şifre en az 6 karakter olmalı.';
    if (form.sifre !== form.sifreTekrar) return 'Şifreler aynı değil, kontrol et.';
    if (!form.sartlar) return 'Kullanım şartlarını kabul etmelisin.';
    return null;
  };

  const kayitOl = async (e) => {
    e.preventDefault();
    const hataMsg = dogrula();
    if (hataMsg) { setHata(hataMsg); return; }
    setYukleniyor(true); setHata('');
    try {
      const s = await createUserWithEmailAndPassword(auth, form.email, form.sifre);
      await updateProfile(s.user, { displayName: `${form.isim} ${form.soyisim}` });
      await setDoc(doc(db, 'kullanicilar', s.user.uid), {
        isim: form.isim, soyisim: form.soyisim, email: form.email,
        telefon: form.telefon, cinsiyet: form.cinsiyet, hesapTuru,
        ...(hesapTuru === 'profesyonel' ? { uzmanlik: form.uzmanlik, sehir: form.sehir, deneyim: form.deneyim, durum: form.durum } : {}),
        olusturuldu: new Date().toISOString(),
      });
      try { localStorage.removeItem(FORM_KEY); } catch {}
      window.location.href = '/glamworld/';
    } catch (err) { setHata(hataMesaji(err.code)); }
    finally { setYukleniyor(false); }
  };

  const googleKayit = async () => {
    setYukleniyor(true); setHata('');
    try { await signInWithPopup(auth, new GoogleAuthProvider()); try { localStorage.removeItem(FORM_KEY); } catch {} window.location.href = '/glamworld/'; }
    catch (err) { if (err.code !== 'auth/popup-closed-by-user') setHata(hataMesaji(err.code)); }
    finally { setYukleniyor(false); }
  };

  const yakinda = () => setHata('Bu yöntem yakında aktif olacak.');

  return (
    <div className="signup-sayfa" onContextMenu={(e) => e.preventDefault()} style={{ position:'fixed', inset:0, overflowY:'auto', overflowX:'hidden', WebkitOverflowScrolling:'touch' }}>
      <style>{`.pa-uzm-grid{gap:6px!important}.pa-uzm-kart{min-height:70px!important;padding:8px 4px!important}.pa-uzm-ikon svg{width:18px!important;height:18px!important}.pa-uzm-nm{font-size:11px!important}`}</style>
      <AltinTozAtmosfer />
      <button className="kapat-btn kapat-tooltip" onClick={() => navigate('/')} data-tip="Kapat">&#x2715;</button>

      <div className="signup-kart" ref={kartRef} style={{ zIndex: 2 }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12 }}>
          <Pirlanta renk="gumus" boyut={22} />
          <h1 className="signup-logo">GLAMWORLD</h1>
          <Pirlanta renk="mavi" boyut={22} />
        </div>
        <h2 className="signup-baslik">Üye Ol</h2>

        <div className="hesap-secim-baslik">Hesap türünü seç:</div>
        <div className="uyelik-secim">
          <Tooltip text="Müşteri Üyelik" position="top" style={{ width: '100%', display: 'flex' }}>
            <button type="button" className={`uyelik-kart silver-card${hesapTuru==='musteri'?' secili':''}`} onClick={() => setHesapTuru('musteri')}>
              <SilverStar />
              <div className="kart-baslik-silver">Müşteri</div>
              <div className="kart-aciklama">Randevu al, profesyonelleri keşfet</div>
              <div className="kart-etiket-silver">Ücretsiz</div>
              {hesapTuru === 'musteri' && <span className="secim-isareti">Seçildi</span>}
            </button>
          </Tooltip>
          <Tooltip text="Pırlanta Üye - Profesyonel" position="top" style={{ width: '100%', display: 'flex' }}>
            <button type="button" className={`uyelik-kart gold-card${hesapTuru==='profesyonel'?' secili':''}`} onClick={() => setHesapTuru('profesyonel')}>
              <span className="kart-etiket-pirlanta">Pırlanta Üye</span>
              <BlueDiamond />
              <div className="kart-baslik-gold">Profesyonel</div>
              <div className="kart-aciklama">Profil oluştur, gelir takibi</div>
              <div className="kart-etiket-gold">Ücretsiz başla</div>
              {hesapTuru === 'profesyonel' && <span className="secim-isareti">Seçildi</span>}
            </button>
          </Tooltip>
        </div>

        <div className="sosyal-grid">
          <div className="sosyal-ust">
            <SosyalButon tip="google"  mod="uye" onClick={googleKayit} />
            <SosyalButon tip="telefon" mod="uye" onClick={yakinda} />
          </div>
        </div>

        <div className="ayrac">veya</div>

        <form onSubmit={kayitOl}>
          <div className="iki-sutun">
            <div className="signup-alan"><label>İsim</label><input type="text" value={form.isim} onChange={g('isim')} autoComplete="given-name" /></div>
            <div className="signup-alan"><label>Soyisim</label><input type="text" value={form.soyisim} onChange={g('soyisim')} autoComplete="family-name" /></div>
          </div>
          <div className="signup-alan"><label>E-posta</label><input type="email" value={form.email} onChange={g('email')} autoComplete="email" /></div>
          <div className="iki-sutun">
            <div className="signup-alan"><label>Şifre</label><input type="password" value={form.sifre} onChange={g('sifre')} autoComplete="new-password" /></div>
            <div className="signup-alan"><label>Şifre Tekrar</label><input type="password" value={form.sifreTekrar} onChange={g('sifreTekrar')} autoComplete="new-password" /></div>
          </div>
          <div className="signup-alan"><label>Telefon</label><TelefonInput value={form.telefon} onChange={g('telefon')} /></div>
          <div className="signup-alan">
            <label>Cinsiyet</label>
            <div className="cinsiyet-secim">
              {['Erkek','Kadın','Belirtmek İstemiyorum'].map(c => (
                <label key={c} className={`cinsiyet-label${form.cinsiyet===c?' aktif':''}`}>
                  <input type="radio" name="cinsiyet" value={c} checked={form.cinsiyet===c} onChange={g('cinsiyet')} />
                  {c}
                </label>
              ))}
            </div>
          </div>

          {hesapTuru === 'profesyonel' && (
            <div className="prof-alanlar">
              <div style={{marginBottom:16}}>
                <label style={{display:'block',color:'#FFD700',fontSize:14,marginBottom:10,fontWeight:500}}>Mesleğin</label>
                <button type="button" onClick={() => setMeslekModalAcik(true)} style={{width:'100%',padding:'16px 20px',background:seciliMeslek?'linear-gradient(135deg,rgba(255,215,0,0.15),rgba(74,144,226,0.1))':'rgba(0,0,0,0.4)',border:seciliMeslek?'2px solid #FFD700':'1px solid rgba(255,215,0,0.4)',borderRadius:14,color:'#FFD700',fontSize:16,fontWeight:500,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'space-between',transition:'all .3s',boxShadow:seciliMeslek?'0 0 20px rgba(255,215,0,0.3)':'none'}}>
                  <span style={{display:'flex',alignItems:'center',gap:10}}><span style={{fontSize:22}}>{seciliMeslek?'💎':'✨'}</span><span>{seciliMeslek||'Meslek Seç'}</span></span>
                  <span style={{fontSize:18,color:'rgba(255,215,0,0.6)'}}>›</span>
                </button>
              </div>
              <div className="signup-alan">
                <label>Şehir</label>
                <SehirOnericisi value={form.sehir} onChange={g('sehir')} />
              </div>
              <div className="signup-alan">
                <label>Deneyim</label>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:6}}>
                  {DNY.map(d => {
                    const sel = secDny===d.id;
                    return <button key={d.id} type="button" onClick={() => {setSecDny(d.id);setForm(f=>({...f,deneyim:d.ad}));}} style={{...btnBase,...(sel?secS:normS),minHeight:54}}><span style={{fontSize:12,color:'#FFD700',fontWeight:600}}>{d.ad}</span><span style={{fontSize:10,color:'rgba(255,215,0,0.7)'}}>{d.sure}</span></button>;
                  })}
                </div>
              </div>
              <div className="calisma-durumu">
                {['Çalışıyor','Kendi işi','İş arıyor'].map(d => (
                  <label key={d} className="radio-label"><input type="radio" name="durum" value={d} checked={form.durum===d} onChange={g('durum')} /> {d}</label>
                ))}
              </div>
            </div>
          )}

          <label className="sartlar-satir">
            <input type="checkbox" checked={form.sartlar} onChange={g('sartlar')} />
            <span>Kullanım Şartları ve Gizlilik Politikası'nı kabul ediyorum</span>
          </label>

          {hata && <p className="signup-hata">{hata}</p>}

          <button type="submit" disabled={yukleniyor || !hesapTuru} className="signup-ana-btn">
            {yukleniyor ? 'Kaydediliyor...' : (hesapTuru ? 'Üye Ol' : 'Önce hesap türünü seç')}
          </button>
        </form>

        <p className="signup-alt-link">Zaten hesabın var mı? <Link to="/giris">Giriş Yap</Link></p>
      </div>

      <DevWidget sayfa="Üye Ol" />
      <DigerBranslarModal
        acik={meslekModalAcik}
        onKapat={() => setMeslekModalAcik(false)}
        onSec={(meslek) => {
          setSeciliMeslek(meslek);
          setMeslekModalAcik(false);
          setForm(f => ({ ...f, uzmanlik: meslek }));
        }}
      />
    </div>
  );
}
