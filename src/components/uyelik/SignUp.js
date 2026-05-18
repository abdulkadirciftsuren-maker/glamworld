import { useState, useEffect, useRef } from 'react';
import { useKartDisiTiklama } from '../../hooks/useKartDisiTiklama';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import DevWidget from '../DevWidget';
import Pirlanta from '../Pirlanta';
import SosyalButon from '../SosyalButon';
import AltinTozAtmosfer from '../AltinTozAtmosfer';
import Tooltip from '../Tooltip';
import DigerBranslarModal from './DigerBranslarModal';
import SehirSec from './SehirSec';
import TelefonUlkeBtn from './TelefonUlkeBtn';
import { ULKELER, ulkeKoduTespitEt } from '../../utils/ulkeler';
import UlkeSecModal from './UlkeSecModal';
import DeneyimSec from './DeneyimSec';
import LuksYukleme from '../LuksYukleme';
import './SignUp.css';
const DNY=[{id:'yeni',ad:'Yeni Başlayan',sure:'0-2 yıl'},{id:'deneyimli',ad:'Deneyimli',sure:'3-5 yıl'},{id:'uzman',ad:'Uzman',sure:'6-10 yıl'},{id:'usta',ad:'Usta',sure:'10+ yıl'}];const secS={background:'rgba(255,215,0,0.15)',border:'2px solid #FFD700',boxShadow:'0 0 10px rgba(255,215,0,0.4)'};const normS={background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,215,0,0.4)'};const btnBase={borderRadius:10,padding:'7px 4px',display:'flex',flexDirection:'column',alignItems:'center',gap:3,cursor:'pointer',minHeight:56,transition:'all .2s'};
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
  const navigate = useNavigate();
  const [meslekModalAcik, setMeslekModalAcik] = useState(false);
  const [seciliUlkeTel, setSeciliUlkeTel] = useState(ULKELER[0]);
  const [ulkeModalAcik, setUlkeModalAcik] = useState(false);
  const [sg1, setSg1] = useState(false);
  const [sg2, setSg2] = useState(false);
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
  useEffect(() => { const b=ULKELER.find(u=>u.kod===localStorage.getItem('glamworld_ulke_kod')); if(b){console.log('[SIGNUP] Ülke:',b.isim);setSeciliUlkeTel(b);return;} let c=false; ulkeKoduTespitEt().then(u=>{if(!c)setSeciliUlkeTel(u);}); return()=>{c=true;}; }, []);

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
      try { await updateProfile(s.user, { displayName: `${form.isim} ${form.soyisim}` }); } catch {}
      try {
        await setDoc(doc(db, 'kullanicilar', s.user.uid), {
          isim: form.isim, soyisim: form.soyisim, email: form.email, telefon: form.telefon ? `${seciliUlkeTel.telKod}${form.telefon}` : '',
          cinsiyet: form.cinsiyet, hesapTuru, meslek: seciliMeslek||null,
          ...(hesapTuru === 'profesyonel' ? { uzmanlik: form.uzmanlik, sehir: form.sehir, deneyim: form.deneyim, durum: form.durum } : {}),
          kayitTarihi: new Date().toISOString(), kayitYolu: 'email', aktifMi: true,
        });
      } catch (eF) { console.log('[UYE-OL] Firestore hatası (auth tamam):', eF.message); }
      try { localStorage.removeItem(FORM_KEY); } catch {}
      window.location.href = '/glamworld/';
    } catch (err) {
      setYukleniyor(false);
      if (err.code === 'auth/email-already-in-use') setHata('Bu e-posta zaten kayıtlı.');
      else if (err.code === 'auth/network-request-failed') setHata('İnternet bağlantısı yok.');
      else setHata(hataMesaji(err.code));
    }
  };

  const googleKayit = async () => {
    setYukleniyor(true); setHata('');
    try {
      const gp = new GoogleAuthProvider(); gp.setCustomParameters({prompt:'select_account'});
      const r = await signInWithPopup(auth, gp); const u = r.user;
      const ref = doc(db,'kullanicilar',u.uid); const snap = await getDoc(ref);
      if (!snap.exists()) { const ad=(u.displayName||'').split(' '); await setDoc(ref,{uid:u.uid,isim:ad[0]||'',soyisim:ad.slice(1).join(' ')||'',email:u.email||'',fotoUrl:u.photoURL||'',hesapTuru:hesapTuru||'musteri',meslek:seciliMeslek||null,kayitYolu:'google',kayitTarihi:new Date().toISOString(),aktifMi:true}); }
      try { localStorage.removeItem(FORM_KEY); } catch {}
      window.location.href = '/glamworld/';
    } catch (err) {
      setYukleniyor(false);
      if(err.code==='auth/popup-closed-by-user'||err.code==='auth/popup-blocked')return;
      setHata(hataMesaji(err.code));
    }
  };

  return (
    <div className="signup-sayfa" onContextMenu={(e) => e.preventDefault()} style={{ position:'fixed', inset:0, overflowY:'auto', overflowX:'hidden', WebkitOverflowScrolling:'touch' }}>
      <style>{`.pa-uzm-grid{gap:6px!important}.pa-uzm-kart{min-height:70px!important;padding:8px 4px!important}.pa-uzm-ikon svg{width:18px!important;height:18px!important}.pa-uzm-nm{font-size:11px!important}`}</style>
      {yukleniyor && <LuksYukleme mesaj="Hesabın oluşturuluyor..." />}
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
          <div className="sosyal-ust" style={{opacity:hesapTuru?1:0.4,transition:'opacity .2s'}}>
            <SosyalButon tip="google"  mod="uye" onClick={hesapTuru?googleKayit:()=>setHata('Önce Müşteri veya Profesyonel seç')} />
            <div style={{position:'relative',display:'inline-block'}}>
              <SosyalButon tip="telefon" mod="uye" onClick={hesapTuru?()=>alert('Telefon ile giriş yakında aktif olacak. Google veya Email ile devam edebilirsin.'):()=>setHata('Önce Müşteri veya Profesyonel seç')} />
              <span style={{position:'absolute',top:-8,right:-8,background:'linear-gradient(135deg,#FFD700,#FFA500)',color:'#1a1a1a',fontSize:9,fontWeight:700,padding:'3px 8px',borderRadius:10,pointerEvents:'none'}}>YAKINDA</span>
            </div>
          </div>
          {!hesapTuru && <p style={{color:'rgba(255,215,0,0.65)',fontSize:11,textAlign:'center',margin:'4px 0 0',fontStyle:'italic'}}>Müşteri veya Profesyonel seç</p>}
        </div>

        <div className="ayrac">veya</div>

        <form onSubmit={kayitOl}>
          <div className="iki-sutun">
            <div className="signup-alan"><label>İsim</label><input type="text" name="given-name" value={form.isim} onChange={g('isim')} autoComplete="given-name" /></div>
            <div className="signup-alan"><label>Soyisim</label><input type="text" name="family-name" value={form.soyisim} onChange={g('soyisim')} autoComplete="family-name" /></div>
          </div>
          <div className="signup-alan"><label>E-posta</label><input type="email" name="email" value={form.email} onChange={g('email')} autoComplete="email" /></div>
          <div className="iki-sutun">
            <div className="signup-alan"><label>Şifre</label><div style={{position:'relative'}}><input type={sg1?'text':'password'} value={form.sifre} onChange={g('sifre')} autoComplete="new-password" style={{width:'100%',boxSizing:'border-box',paddingRight:40}} /><button type="button" onClick={()=>setSg1(!sg1)} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'#FFD700',cursor:'pointer',fontSize:15}}>{sg1?'🙈':'👁'}</button></div></div>
            <div className="signup-alan"><label>Şifre Tekrar</label><div style={{position:'relative'}}><input type={sg2?'text':'password'} value={form.sifreTekrar} onChange={g('sifreTekrar')} autoComplete="new-password" style={{width:'100%',boxSizing:'border-box',paddingRight:40}} /><button type="button" onClick={()=>setSg2(!sg2)} style={{position:'absolute',right:10,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',color:'#FFD700',cursor:'pointer',fontSize:15}}>{sg2?'🙈':'👁'}</button></div></div>
          </div>
          <div className="signup-alan"><label>Telefon</label>
            <div style={{display:'flex',gap:8}}>
              <TelefonUlkeBtn ulke={seciliUlkeTel} onClick={()=>setUlkeModalAcik(true)} />
              <input type="tel" name="tel" autoComplete="tel" value={form.telefon} onChange={g('telefon')} style={{flex:1,padding:'12px 14px',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,215,0,0.4)',borderRadius:12,color:'#FFD700',fontSize:14,outline:'none'}} />
            </div></div>
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
              <SehirSec deger={form.sehir} onDegisim={(v)=>setForm(f=>({...f,sehir:v}))} />
              <DeneyimSec deger={form.deneyim} onDegisim={(v)=>setForm(f=>({...f,deneyim:v}))} />
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
          {hata && hata.includes('kayıtlı') && <button type="button" onClick={() => navigate('/giris')} style={{display:'block',margin:'4px auto 8px',background:'linear-gradient(135deg,#FFD700,#FFA500)',border:'none',borderRadius:20,padding:'8px 20px',color:'#1a1a1a',fontSize:13,fontWeight:600,cursor:'pointer'}}>Giriş Yap'a Geç →</button>}

          <button type="submit" disabled={yukleniyor || !hesapTuru} className="signup-ana-btn">
            {yukleniyor ? 'Kaydediliyor...' : (hesapTuru ? 'Üye Ol' : 'Önce hesap türünü seç')}
          </button>
        </form>

        <p className="signup-alt-link">Zaten hesabın var mı? <Link to="/giris">Giriş Yap</Link></p>
      </div>

      <DevWidget sayfa="Üye Ol" />
      <UlkeSecModal acik={ulkeModalAcik} secili={seciliUlkeTel} onSec={u=>setSeciliUlkeTel(u)} onKapat={()=>setUlkeModalAcik(false)} />
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
