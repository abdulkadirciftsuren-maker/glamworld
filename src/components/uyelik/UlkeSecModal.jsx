import { useState, useMemo, useEffect } from 'react';
import { ULKELER } from '../../utils/ulkeler';

export default function UlkeSecModal({ acik, secili, onSec, onKapat }) {
  const [arama, setArama] = useState('');

  useEffect(() => { if (!acik) setArama(''); }, [acik]);

  const filtre = useMemo(() => {
    if (!arama.trim()) return ULKELER;
    const a = arama.toLowerCase().trim();
    return ULKELER.filter(u => u.isim.toLowerCase().includes(a) || u.telKod.includes(a) || u.kod.toLowerCase().includes(a));
  }, [arama]);

  if (!acik) return null;

  return (
    <div onClick={onKapat} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.92)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center',padding:16,backdropFilter:'blur(12px)'}}>
      <div onClick={e=>e.stopPropagation()} style={{background:'linear-gradient(135deg,#0a0a0a,#1a1a1a)',border:'2px solid rgba(255,215,0,0.5)',borderRadius:20,width:'100%',maxWidth:420,maxHeight:'80vh',display:'flex',flexDirection:'column',boxShadow:'0 0 50px rgba(255,215,0,0.25)'}}>
        <div style={{padding:'18px 20px 10px',borderBottom:'1px solid rgba(255,215,0,0.15)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <h2 style={{color:'#FFD700',fontFamily:'Cormorant Garamond,serif',fontSize:22,margin:0}}>Ülke Seç</h2>
          <button onClick={onKapat} style={{background:'transparent',border:'2px solid #FFD700',borderRadius:'50%',width:32,height:32,color:'#FFD700',fontSize:16,cursor:'pointer',lineHeight:1}}>×</button>
        </div>
        <div style={{padding:'10px 16px'}}>
          <input type="text" placeholder="🔍 Ülke ara (Almanya, +49, DE...)" value={arama} onChange={e=>setArama(e.target.value)} autoFocus style={{width:'100%',padding:'10px 12px',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,215,0,0.3)',borderRadius:10,color:'#FFD700',fontSize:14,outline:'none',boxSizing:'border-box'}} />
        </div>
        <div style={{flex:1,overflowY:'auto',padding:'0 10px 14px'}}>
          {filtre.length === 0 ? (
            <p style={{color:'rgba(255,215,0,0.6)',textAlign:'center',padding:20,fontSize:13}}>"{arama}" bulunamadı</p>
          ) : filtre.map(u => (
            <button key={u.kod} type="button" onClick={() => { onSec(u); onKapat(); }}
              style={{display:'flex',alignItems:'center',width:'100%',padding:'11px 12px',background:secili?.kod===u.kod?'rgba(255,215,0,0.15)':'transparent',border:secili?.kod===u.kod?'1px solid #FFD700':'1px solid transparent',borderRadius:10,color:'#FFD700',cursor:'pointer',fontSize:14,marginBottom:3,gap:12,textAlign:'left'}}>
              <span style={{fontSize:20}}>{u.bayrak}</span>
              <span style={{flex:1}}>{u.isim}</span>
              <span style={{fontSize:12,color:'rgba(255,215,0,0.7)',fontWeight:600}}>{u.telKod}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
