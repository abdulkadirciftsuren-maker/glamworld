import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

export default function SifreSifirlaModal({ acik, onKapat }) {
  const [email, setEmail] = useState('');
  const [durum, setDurum] = useState('');
  const [hata, setHata] = useState('');

  if (!acik) return null;

  const gonder = async () => {
    if (!email || !email.includes('@')) {
      setDurum('hata'); setHata('Geçerli e-posta yaz'); return;
    }
    setDurum('gonderiliyor'); setHata('');
    try {
      await sendPasswordResetEmail(auth, email);
      setDurum('basarili');
    } catch (e) {
      setDurum('hata');
      if (e.code === 'auth/user-not-found')   setHata('Bu e-posta kayıtlı değil');
      else if (e.code === 'auth/invalid-email') setHata('Geçersiz e-posta');
      else setHata('Hata oluştu, tekrar dene');
    }
  };

  const kapat = () => { setEmail(''); setDurum(''); setHata(''); onKapat(); };

  return (
    <div onClick={kapat} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.9)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center',padding:20,backdropFilter:'blur(10px)'}}>
      <div onClick={e => e.stopPropagation()} style={{background:'linear-gradient(135deg,#0a0a0a,#1a1a1a)',border:'2px solid rgba(255,215,0,0.5)',borderRadius:20,width:'100%',maxWidth:420,padding:'32px 28px',boxShadow:'0 0 40px rgba(255,215,0,0.25)',position:'relative'}}>

        <button onClick={kapat} style={{position:'absolute',top:12,right:12,background:'transparent',border:'2px solid #FFD700',borderRadius:'50%',width:32,height:32,color:'#FFD700',fontSize:18,cursor:'pointer',lineHeight:1}}>×</button>

        <h2 style={{color:'#FFD700',fontFamily:'Cormorant Garamond,serif',fontSize:24,textAlign:'center',margin:'0 0 8px'}}>Şifremi Unuttum</h2>

        {durum !== 'basarili' ? (
          <>
            <p style={{color:'rgba(255,255,255,0.7)',fontSize:13,textAlign:'center',margin:'0 0 20px',lineHeight:1.5}}>
              E-posta adresini yaz, sıfırlama linki gönderelim.
            </p>
            <input type="email" placeholder="E-posta adresin" value={email} onChange={e => setEmail(e.target.value)} autoFocus onKeyDown={e => e.key === 'Enter' && gonder()} style={{width:'100%',padding:'12px 14px',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,215,0,0.4)',borderRadius:10,color:'#FFD700',fontSize:14,outline:'none',marginBottom:10,boxSizing:'border-box'}} />
            {hata && <p style={{color:'#ff6b6b',fontSize:12,margin:'0 0 10px',textAlign:'center'}}>{hata}</p>}
            <button onClick={gonder} disabled={durum === 'gonderiliyor'} style={{width:'100%',padding:14,background:'linear-gradient(135deg,#FFD700,#FFA500)',border:'none',borderRadius:50,color:'#1a1a1a',fontSize:16,fontWeight:600,cursor:durum==='gonderiliyor'?'wait':'pointer',opacity:durum==='gonderiliyor'?0.6:1}}>
              {durum === 'gonderiliyor' ? 'Gönderiliyor...' : 'Sıfırlama Linki Gönder'}
            </button>
          </>
        ) : (
          <div style={{textAlign:'center',padding:'12px 0'}}>
            <div style={{fontSize:44,marginBottom:12}}>✉️</div>
            <h3 style={{color:'#FFD700',fontSize:18,margin:'0 0 10px'}}>E-posta Gönderildi</h3>
            <p style={{color:'rgba(255,255,255,0.7)',fontSize:13,margin:'0 0 20px',lineHeight:1.6}}>
              <strong style={{color:'#FFD700'}}>{email}</strong> adresine sıfırlama linki gönderildi.<br/>
              Spam klasörünü de kontrol et.
            </p>
            <button onClick={kapat} style={{padding:'12px 32px',background:'linear-gradient(135deg,#FFD700,#FFA500)',border:'none',borderRadius:50,color:'#1a1a1a',fontSize:14,fontWeight:600,cursor:'pointer'}}>Tamam</button>
          </div>
        )}
      </div>
    </div>
  );
}
