import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { rozetAl, MUSTERI_ROZETI } from '../utils/meslekRozetleri';

export default function ProfilRozet({ boyut = 44, onTik }) {
  const [profil, setProfil] = useState(null);

  useEffect(() => {
    if (!auth.currentUser) return;
    getDoc(doc(db, 'kullanicilar', auth.currentUser.uid))
      .then(s => { if (s.exists()) setProfil(s.data()); })
      .catch(() => {});
  }, []);

  const rozet = profil ? rozetAl(profil.meslek, profil.hesapTuru) : MUSTERI_ROZETI;
  const harf = (profil?.isim || profil?.displayName || auth.currentUser?.displayName || profil?.email || 'K').charAt(0).toUpperCase();
  console.log('[ROZET] Baş harf:', harf, 'İsim:', profil?.isim, 'displayName:', auth.currentUser?.displayName);

  const btnStyle = {
    width: boyut, height: boyut, borderRadius: '50%',
    background: `linear-gradient(135deg, ${rozet.renk}, ${rozet.renk2})`,
    border: '2px solid #FFD700',
    cursor: 'pointer', fontWeight: 700,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    boxShadow: '0 0 14px rgba(255,215,0,0.4)',
    transition: 'all .3s ease', position: 'relative',
    textShadow: '0 1px 2px rgba(0,0,0,0.5)', padding: 0,
  };

  if (profil?.fotoUrl) {
    return (
      <button onClick={onTik} style={{...btnStyle,background:`url(${profil.fotoUrl}) center/cover no-repeat, ${rozet.renk}`,border:`2px solid ${rozet.renk2}`}} title={profil.meslek||'Profil'} />
    );
  }

  return (
    <button onClick={onTik} style={btnStyle} title={profil?.meslek||'Profil'}
      onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.08)';e.currentTarget.style.boxShadow=`0 0 20px ${rozet.renk2}`;}}
      onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='0 0 14px rgba(255,215,0,0.4)';}}>
      <span style={{color:'#fff',fontSize:boyut*0.4}}>{harf}</span>
      {profil?.meslek && rozet.ikon && (
        <span style={{position:'absolute',bottom:-2,right:-2,background:'#0a0a0a',border:'1.5px solid #FFD700',borderRadius:'50%',width:boyut*0.4,height:boyut*0.4,display:'flex',alignItems:'center',justifyContent:'center',fontSize:boyut*0.2}}>
          {rozet.ikon}
        </span>
      )}
    </button>
  );
}
