import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function Profil() {
  const navigate = useNavigate();
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) { navigate('/', { replace: true }); return; }
    getDoc(doc(db, 'kullanicilar', auth.currentUser.uid))
      .then(s => { if (s.exists()) setProfil(s.data()); })
      .catch(() => {});
  }, [navigate]);

  return (
    <div style={{minHeight:'100vh',padding:'80px 20px 40px',maxWidth:600,margin:'0 auto',color:'#FFD700'}}>
      <h1 style={{fontFamily:'Cormorant Garamond,serif',fontSize:34,textAlign:'center',marginBottom:24,textShadow:'0 0 20px rgba(255,215,0,0.4)'}}>Profilim</h1>
      {profil ? (
        <div style={{background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,215,0,0.3)',borderRadius:20,padding:28,textAlign:'center',boxShadow:'0 0 30px rgba(255,215,0,0.1)'}}>
          <p style={{fontSize:22,fontWeight:600,marginBottom:8}}>{profil.isim} {profil.soyisim}</p>
          <p style={{fontSize:14,opacity:.7,marginBottom:4}}>{profil.email}</p>
          <p style={{fontSize:14,opacity:.7}}>{profil.hesapTuru === 'profesyonel' || profil.hesapTuru === 'Profesyonel' ? `Profesyonel${profil.meslek ? ' — ' + profil.meslek : ''}` : 'Müşteri'}</p>
        </div>
      ) : (
        <p style={{textAlign:'center',opacity:.5}}>Yükleniyor...</p>
      )}
      <p style={{textAlign:'center',marginTop:40,fontSize:13,opacity:.4,fontStyle:'italic'}}>Profil sayfası yakında genişleyecek...</p>
    </div>
  );
}
