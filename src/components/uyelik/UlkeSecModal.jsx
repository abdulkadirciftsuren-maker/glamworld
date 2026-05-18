import { useState, useMemo, useEffect } from 'react';
import { ULKELER, ulkeRengi } from '../../utils/ulkeler';

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
        <div style={{padding:'12px 18px 14px',borderBottom:'1px solid rgba(255,215,0,0.1)'}}>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',fontSize:16,pointerEvents:'none',color:'rgba(255,215,0,0.6)'}}>🔍</span>
            <input type="text" placeholder="Ülke ara... (Almanya, +49, DE)" value={arama} onChange={e=>setArama(e.target.value)} autoFocus style={{width:'100%',padding:'12px 14px 12px 42px',background:'rgba(0,0,0,0.5)',border:'2px solid rgba(255,215,0,0.5)',borderRadius:12,color:'#FFD700',fontSize:15,outline:'none',boxSizing:'border-box',boxShadow:'0 0 12px rgba(255,215,0,0.15)',fontWeight:500}} />
          </div>
          <p style={{color:'rgba(255,215,0,0.5)',fontSize:11,margin:'7px 4px 0',fontStyle:'italic'}}>🌍 {ULKELER.length} ülke arasından bul</p>
        </div>
        <div style={{flex:1,overflowY:'auto',padding:'0 10px 14px'}}>
          {filtre.length === 0 ? (
            <p style={{color:'rgba(255,215,0,0.6)',textAlign:'center',padding:20,fontSize:13}}>"{arama}" bulunamadı</p>
          ) : filtre.map(u => {
            const r = ulkeRengi(u.kod);
            return (
              <button key={u.kod} type="button" onClick={() => { onSec(u); onKapat(); }}
                style={{display:'flex',alignItems:'center',width:'100%',padding:'9px 12px',background:secili?.kod===u.kod?'rgba(255,215,0,0.15)':'transparent',border:secili?.kod===u.kod?'1px solid #FFD700':'1px solid transparent',borderRadius:10,cursor:'pointer',marginBottom:3,gap:12,textAlign:'left',transition:'all .15s'}}>
                <div style={{width:36,height:36,borderRadius:'50%',background:r,border:'1.5px solid rgba(255,215,0,0.7)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,boxShadow:`0 0 6px ${r}44`}}>
                  <span style={{color:'#fff',fontSize:10,fontWeight:700,textShadow:'0 1px 2px rgba(0,0,0,0.6)'}}>{u.telKod}</span>
                </div>
                <div style={{flex:1,display:'flex',flexDirection:'column',gap:1}}>
                  <span style={{color:'#FFD700',fontSize:13,fontWeight:500}}>{u.isim}</span>
                  <span style={{color:'rgba(255,215,0,0.5)',fontSize:10}}>{u.kod}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
