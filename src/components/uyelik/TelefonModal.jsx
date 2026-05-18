import { useState, useRef, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ULKELER, ulkeKoduTespitEt } from '../../utils/ulkeler';
import UlkeSecModal from './UlkeSecModal';

export default function TelefonModal({ acik, onKapat }) {
  const [adim, setAdim] = useState('telefon');
  const [seciliUlke, setSeciliUlke] = useState(ULKELER[0]);
  const [ulkeModalAcik, setUlkeModalAcik] = useState(false);
  const [telefon, setTelefon] = useState('');
  const [kod, setKod] = useState('');
  const [hata, setHata] = useState('');
  const [yukleniyor, setYukleniyor] = useState(false);
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!acik) { setAdim('telefon'); setTelefon(''); setKod(''); setHata(''); return; }
    ulkeKoduTespitEt().then(u => setSeciliUlke(u));
  }, [acik]);

  useEffect(() => {
    if (acik && !window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'rc-container', { size: 'invisible' });
      } catch {}
    }
    return () => {
      if (window.recaptchaVerifier) {
        try { window.recaptchaVerifier.clear(); window.recaptchaVerifier = null; } catch {}
      }
    };
  }, [acik]);

  if (!acik) return null;

  const smsSend = async () => {
    setHata('');
    if (!telefon || telefon.replace(/\D/g,'').length < 7) { setHata('Geçerli telefon numarası gir'); return; }
    setYukleniyor(true);
    try {
      const num = `${seciliUlke.telKod}${telefon.replace(/\s/g,'')}`;
      confirmRef.current = await signInWithPhoneNumber(auth, num, window.recaptchaVerifier);
      setAdim('kod');
    } catch (e) {
      if (e.code === 'auth/invalid-phone-number') setHata('Geçersiz numara');
      else if (e.code === 'auth/too-many-requests') setHata('Çok fazla deneme');
      else if (e.code === 'auth/operation-not-allowed') setHata('Telefon girişi Firebase Console\'dan aktif edilmeli');
      else setHata('SMS gönderilemedi: ' + e.message);
    } finally { setYukleniyor(false); }
  };

  const codeVerify = async () => {
    setHata('');
    if (!kod || kod.length !== 6) { setHata('6 haneli kodu gir'); return; }
    setYukleniyor(true);
    try {
      const sonuc = await confirmRef.current.confirm(kod);
      const user = sonuc.user;
      const ref = doc(db, 'kullanicilar', user.uid);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, { uid: user.uid, telefon: user.phoneNumber||'', hesapTuru: 'musteri', kayitYolu: 'telefon', kayitTarihi: new Date().toISOString(), aktifMi: true });
      }
      setAdim('basarili');
      setTimeout(() => onKapat(), 1500);
    } catch (e) {
      if (e.code === 'auth/invalid-verification-code') setHata('Yanlış kod');
      else setHata('Doğrulama hatası');
    } finally { setYukleniyor(false); }
  };

  const inp = {padding:'12px 14px',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,215,0,0.4)',borderRadius:10,color:'#FFD700',fontSize:14,outline:'none',boxSizing:'border-box'};
  const btn = {width:'100%',padding:14,background:'linear-gradient(135deg,#FFD700,#FFA500)',border:'none',borderRadius:50,color:'#1a1a1a',fontSize:15,fontWeight:600,cursor:'pointer'};

  return (
    <div onClick={onKapat} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.9)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center',padding:20,backdropFilter:'blur(10px)'}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(135deg,#0a0a0a,#1a1a1a)',border:'2px solid rgba(255,215,0,0.5)',borderRadius:20,width:'100%',maxWidth:420,padding:'28px 24px',position:'relative'}}>
        <button onClick={onKapat} style={{position:'absolute',top:12,right:12,background:'transparent',border:'2px solid #FFD700',borderRadius:'50%',width:32,height:32,color:'#FFD700',fontSize:18,cursor:'pointer',lineHeight:1}}>×</button>
        <h2 style={{color:'#FFD700',fontFamily:'Cormorant Garamond,serif',fontSize:22,textAlign:'center',margin:'0 0 16px'}}>
          {adim==='telefon'?'Telefon ile Giriş':adim==='kod'?'Doğrulama Kodu':'Giriş Başarılı'}
        </h2>
        {adim==='telefon' && (<>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:13,textAlign:'center',margin:'0 0 20px'}}>Telefon numarana SMS göndereceğiz</p>
          <div style={{display:'flex',gap:8,marginBottom:12}}>
            <button type="button" onClick={()=>setUlkeModalAcik(true)} style={{...inp,display:'flex',alignItems:'center',gap:6,minWidth:95,cursor:'pointer',justifyContent:'center',padding:'12px 10px',background:'rgba(0,0,0,0.4)'}}><span style={{fontSize:18}}>{seciliUlke.bayrak}</span><span style={{fontSize:13}}>{seciliUlke.telKod}</span><span style={{fontSize:10,opacity:.6}}>▼</span></button>
            <input type="tel" placeholder="123 456 7890" value={telefon} onChange={e=>setTelefon(e.target.value)} style={{...inp,flex:1}} />
          </div>
          {hata && <p style={{color:'#ff6b6b',fontSize:12,textAlign:'center',margin:'0 0 12px'}}>{hata}</p>}
          <button onClick={smsSend} disabled={yukleniyor} style={{...btn,opacity:yukleniyor?0.6:1}}>{yukleniyor?'Gönderiliyor...':'SMS Gönder'}</button>
          <div id="rc-container"></div>
        </>)}
        {adim==='kod' && (<>
          <p style={{color:'rgba(255,255,255,0.7)',fontSize:13,textAlign:'center',margin:'0 0 20px'}}>{seciliUlke.telKod}{telefon} numarasına gelen 6 haneli kodu gir</p>
          <input type="text" placeholder="000000" value={kod} onChange={e=>setKod(e.target.value.replace(/\D/g,'').slice(0,6))} maxLength={6} autoFocus style={{...inp,width:'100%',fontSize:20,textAlign:'center',letterSpacing:8,fontWeight:600,marginBottom:12}} />
          {hata && <p style={{color:'#ff6b6b',fontSize:12,textAlign:'center',margin:'0 0 12px'}}>{hata}</p>}
          <button onClick={codeVerify} disabled={yukleniyor} style={{...btn,opacity:yukleniyor?0.6:1}}>{yukleniyor?'Doğrulanıyor...':'Onayla'}</button>
        </>)}
        {adim==='basarili' && <div style={{textAlign:'center',padding:'20px 0'}}><div style={{fontSize:48,marginBottom:12}}>✅</div><p style={{color:'#FFD700',fontSize:14}}>Giriş başarılı! Yönlendiriliyorsun...</p></div>}
      </div>
      <UlkeSecModal acik={ulkeModalAcik} secili={seciliUlke} onSec={u=>setSeciliUlke(u)} onKapat={()=>setUlkeModalAcik(false)} />
    </div>
  );
}
