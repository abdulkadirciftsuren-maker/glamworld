import { useState, useEffect } from 'react';
import { modalAc, modalKapat } from '../../utils/geriYonetimi';

const KATEGORILER = [
  { baslik:'Güzellik & Bakım', branslar:['Saç Tasarımı','Renklendirme','Saç Bakımı','Saç Kaynak','Sakal Tasarımı','Tıraş','Yüz Bakımı','Anti-Aging','Lazer Epilasyon','Ağda','Cilt Temizliği','Akne Tedavisi'] },
  { baslik:'Tırnak & El-Ayak', branslar:['Klasik Manikür','Jel Manikür','Protez Tırnak','Pedikür','Refleksoloji','El Bakımı'] },
  { baslik:'Makyaj & Sanat',   branslar:['Gelin Makyajı','Profesyonel Makyaj','Air Brush','Kalıcı Makyaj','Microblading','Lifting Kirpik','Kirpik Lamination','Kaş Şekillendirme'] },
  { baslik:'Vücut Bakımı',     branslar:['İsveç Masajı','Tay Masajı','Aromaterapi','Sıcak Taş Masajı','Selülit Tedavisi','Detoks','Hamam','Sauna'] },
  { baslik:'Sağlık & Wellness',branslar:['Estetik Diş','Diyetisyen','Beslenme Koçu','Fizyoterapist','Spor Terapisi','Psikolog'] },
  { baslik:'Fitness & Spor',   branslar:['Personal Trainer','Yoga Eğitmeni','Pilates','Crossfit Koçu','Boks Eğitmeni','Yüzme Eğitmeni'] },
  { baslik:'Sanat & Yaratıcılık',branslar:['Dövme Sanatçısı','Piercing','Henna Sanatçısı','Fotoğrafçı','Stil Danışmanı','Kişisel Alışveriş'] },
  { baslik:'Eğitim & Danışmanlık',branslar:['Yaşam Koçu','Astrolog','Numerolog','Dans Eğitmeni','Özel Ders','Müzik Eğitmeni'] },
];

export default function DigerBranslarModal({ acik, onKapat, onSec }) {
  useEffect(() => {
    if (!acik) return;
    modalAc('diger-branslar-modal', onKapat);
    return () => modalKapat('diger-branslar-modal');
  }, [acik, onKapat]);
  const [arama, setArama] = useState('');

  if (!acik) return null;

  const filtre = KATEGORILER.map(k => ({
    ...k,
    branslar: k.branslar.filter(b => b.toLowerCase().includes(arama.toLowerCase())),
  })).filter(k => k.branslar.length > 0);

  return (
    <div onClick={onKapat} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:99999, display:'flex', alignItems:'center', justifyContent:'center', padding:20, backdropFilter:'blur(10px)' }}>
      <div onClick={e => e.stopPropagation()} style={{ background:'linear-gradient(135deg,#0a0a0a,#1a1a1a)', border:'2px solid rgba(255,215,0,0.5)', borderRadius:20, width:'100%', maxWidth:500, maxHeight:'85vh', display:'flex', flexDirection:'column', boxShadow:'0 0 40px rgba(255,215,0,0.3)' }}>

        <div style={{ padding:'16px 20px', borderBottom:'1px solid rgba(255,215,0,0.2)', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <h2 style={{ color:'#FFD700', fontFamily:'Cormorant Garamond,serif', fontSize:22, margin:0 }}>Tüm Branşlar</h2>
          <button onClick={onKapat} style={{ background:'transparent', border:'2px solid #FFD700', borderRadius:'50%', width:34, height:34, color:'#FFD700', fontSize:18, cursor:'pointer', lineHeight:1 }}>×</button>
        </div>

        <div style={{ padding:'10px 20px' }}>
          <input type="text" placeholder="Branş ara..." value={arama} onChange={e => setArama(e.target.value)} style={{ width:'100%', padding:'8px 12px', background:'rgba(0,0,0,0.4)', border:'1px solid rgba(255,215,0,0.3)', borderRadius:10, color:'#FFD700', fontSize:14, outline:'none', boxSizing:'border-box' }} />
        </div>

        <div style={{ flex:1, overflowY:'auto', padding:'0 20px 20px' }}>
          {filtre.length === 0 ? (
            <p style={{ color:'rgba(255,215,0,0.6)', textAlign:'center', padding:20 }}>Sonuç bulunamadı</p>
          ) : filtre.map(kat => (
            <div key={kat.baslik} style={{ marginBottom:14 }}>
              <h3 style={{ color:'#FFD700', fontSize:12, fontWeight:600, letterSpacing:'1px', textTransform:'uppercase', marginBottom:6, opacity:0.7 }}>{kat.baslik}</h3>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:5 }}>
                {kat.branslar.map(b => (
                  <button key={b} onClick={() => { onSec(b); onKapat(); }} style={{ background:'rgba(255,215,0,0.07)', border:'1px solid rgba(255,215,0,0.25)', borderRadius:8, padding:'9px 10px', color:'#fff', fontSize:12, textAlign:'left', cursor:'pointer' }}>
                    {b}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
