import { useState } from 'react';

const SEVIYELER = [
  {id:'yeni',ad:'Yeni Başlayan',sure:'0-2 yıl',p:1,renk:'#90EE90',txt:'Yola yeni çıktın. GLAMWORLD seninle büyüyecek, kapasiteni göstereceğin sahne sende.'},
  {id:'deneyimli',ad:'Deneyimli',sure:'3-5 yıl',p:2,renk:'#87CEEB',txt:'Yolun büyük kısmını gördün. Müşteri çekmeye hazırsın, GLAMWORLD seni öne çıkaracak.'},
  {id:'uzman',ad:'Uzman',sure:'6-10 yıl',p:3,renk:'#FFD700',txt:'Alanında uzmansın. GLAMWORLD\'de seçkin sınıftasın, yüksek puanlı müşteriler senin.'},
  {id:'usta',ad:'Usta',sure:'10+ yıl',p:4,renk:'#FF69B4',txt:'Mesleğinin ustasısın. GLAMWORLD\'ün elite\'isin. Sen örnek alınacak figürsün.'},
];

export default function DeneyimSec({ deger, onDegisim }) {
  const [acikBalon, setAcikBalon] = useState(null);

  const sec = (id, ad) => {
    onDegisim(ad);
    setAcikBalon(id);
    setTimeout(() => setAcikBalon(s => s === id ? null : s), 4000);
  };

  return (
    <div style={{marginBottom:16}}>
      <label style={{display:'block',color:'#FFD700',fontSize:14,marginBottom:10,fontWeight:500}}>Deneyim Seviyen</label>
      <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:10}}>
        {SEVIYELER.map(d => {
          const sel = deger === d.ad;
          const ac = acikBalon === d.id;
          return (
            <div key={d.id} style={{position:'relative'}}>
              <button type="button" onClick={() => sec(d.id, d.ad)} style={{width:'100%',padding:'12px 8px',background:sel?'linear-gradient(135deg,rgba(255,215,0,0.2),rgba(74,144,226,0.1))':'rgba(0,0,0,0.4)',border:sel?`2px solid ${d.renk}`:'1px solid rgba(255,215,0,0.4)',borderRadius:12,display:'flex',flexDirection:'column',alignItems:'center',gap:4,cursor:'pointer',transition:'all .3s',minHeight:78,boxShadow:sel?`0 0 16px ${d.renk}44`:'none'}}>
                <span style={{display:'inline-flex',gap:2,fontSize:14}}>{Array(d.p).fill('💎')}</span>
                <span style={{color:sel?d.renk:'#FFD700',fontSize:13,fontWeight:600,textAlign:'center'}}>{d.ad}</span>
                <span style={{color:'rgba(255,215,0,0.7)',fontSize:10}}>{d.sure}</span>
              </button>
              {ac && (
                <div style={{position:'absolute',top:'100%',left:0,right:0,marginTop:8,padding:'10px 12px',background:'linear-gradient(135deg,#1a1a1a,#0a0a0a)',border:`1px solid ${d.renk}`,borderRadius:10,boxShadow:`0 6px 20px ${d.renk}44`,zIndex:10}}>
                  <p style={{color:'#fff',fontSize:11.5,lineHeight:1.5,margin:0,fontStyle:'italic'}}>"{d.txt}"</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
