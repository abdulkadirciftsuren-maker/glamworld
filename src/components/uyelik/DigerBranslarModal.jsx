import { useEffect, useState, useMemo } from 'react';

const KAT = [
  { b:'Güzellik & Bakım', ikon:'💄', m:['Berber','Kuaför','Saç Stilisti','Sakal Sanatçısı','Makyaj Artisti','Gelin Makyajı Uzmanı','Kalıcı Makyaj Uzmanı','Estetisyen','Cilt Bakım Uzmanı','Yüz Bakımı Uzmanı','Manikür-Pedikür Uzmanı','Protez Tırnak Uzmanı','Lazer Epilasyon Uzmanı','Ağda Uzmanı','Microblading Uzmanı','Kirpik Lifting Uzmanı','Kaş Şekillendirme Uzmanı'] },
  { b:'Vücut & Wellness', ikon:'💆', m:['Masöz','Spa Terapisti','Aromaterapi Uzmanı','Refleksoloji Uzmanı','Selülit Uzmanı','Detoks Uzmanı','Hamam Operatörü','Sauna Operatörü','Hijyen Uzmanı'] },
  { b:'Sağlık', ikon:'🩺', m:['Doktor','Diş Hekimi','Estetik Cerrah','Dermatolog','Beslenme Uzmanı','Diyetisyen','Fizyoterapist','Psikolog','Psikiyatrist','Eczacı','Hemşire','Veteriner','Optisyen','Odyolog'] },
  { b:'Fitness & Spor', ikon:'💪', m:['Personal Trainer','Fitness Eğitmeni','Yoga Eğitmeni','Pilates Eğitmeni','Crossfit Koçu','Boks Antrenörü','Yüzme Eğitmeni','Dans Eğitmeni','Spor Hocası','Beslenme Koçu','Tenis Koçu','Futbol Koçu'] },
  { b:'Sanat & Yaratıcılık', ikon:'🎨', m:['Fotoğrafçı','Düğün Fotoğrafçısı','Videocu','Drone Pilotu','Ressam','Grafik Tasarımcı','Dövme Sanatçısı','Piercing Uzmanı','Henna Sanatçısı','Stil Danışmanı','Müzisyen','DJ','Şarkıcı','Animatör','Kişisel Alışveriş Danışmanı'] },
  { b:'Mühendislik & Teknik', ikon:'⚙️', m:['Mühendis','İnşaat Mühendisi','Makine Mühendisi','Elektrik Mühendisi','Bilgisayar Mühendisi','Yazılımcı','Web Geliştirici','Mobil Geliştirici','UI/UX Tasarımcı','Veri Bilimci','Siber Güvenlik Uzmanı','Mimar','İç Mimar','Peyzaj Mimarı','Müteahhit','Tesisatçı','Elektrikçi','Marangoz','Boyacı','Fayansçı','Demirci','Cam Ustası','Çatı Ustası'] },
  { b:'Hukuk & Danışmanlık', ikon:'⚖️', m:['Avukat','Hukuk Danışmanı','Noter','Mali Müşavir','Muhasebeci','Vergi Danışmanı','İş Danışmanı','Yatırım Danışmanı','Sigorta Danışmanı','Emlak Danışmanı','Emlak Değerleme Uzmanı'] },
  { b:'Eğitim & Akademi', ikon:'🎓', m:['Öğretmen','Anaokulu Öğretmeni','İlkokul Öğretmeni','Lise Öğretmeni','Üniversite Hocası','Akademisyen','Özel Ders Öğretmeni','Yabancı Dil Hocası','Müzik Öğretmeni','Yaşam Koçu','Kariyer Koçu','Eğitim Danışmanı'] },
  { b:'Yemek & Gastronomi', ikon:'👨‍🍳', m:['Şef','Pasta Şefi','Aşçı','Garson','Barmen','Sommelier','Restoran İşletmecisi','Catering Uzmanı','Kahveci','Pastacı','Fırıncı','Helvacı'] },
  { b:'Ticaret & Satış', ikon:'🚗', m:['Galerici','Oto Satış Uzmanı','Emlakçı','Mağaza İşletmecisi','Pazarlama Uzmanı','Satış Müdürü','E-ticaret Uzmanı','İhracat Uzmanı','İthalat Uzmanı','Kuyumcu','Antikacı'] },
  { b:'Maneviyat & Yaşam', ikon:'🔮', m:['Astrolog','Numerolog','Fal Bakıcısı','Hipnoterapi Uzmanı','Enerji Şifacısı','Reiki Uzmanı','Meditasyon Eğitmeni','Tasavvuf Uzmanı'] },
  { b:'Hizmet & Bakım', ikon:'🧹', m:['Temizlik Uzmanı','Ev Hizmetleri','Çocuk Bakıcısı','Yaşlı Bakıcısı','Pet Bakıcısı','Hayvan Eğitmeni','Bahçıvan','Çiçekçi','Düğün Organizatörü','Event Planner','Şoför','Kurye'] },
];

const TOPLAM = KAT.reduce((s, k) => s + k.m.length, 0);

export default function DigerBranslarModal({ acik, onKapat, onSec }) {
  const [arama, setArama] = useState('');

  useEffect(() => { if (!acik) setArama(''); }, [acik]);

  const filtre = useMemo(() => {
    if (!arama.trim()) return KAT;
    const ara = arama.toLowerCase().trim();
    return KAT.map(k => ({ ...k, m: k.m.filter(m => m.toLowerCase().includes(ara)) })).filter(k => k.m.length > 0);
  }, [arama]);

  if (!acik) return null;

  return (
    <div onClick={onKapat} style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.92)',zIndex:99999,display:'flex',alignItems:'center',justifyContent:'center',padding:16,backdropFilter:'blur(12px)',WebkitBackdropFilter:'blur(12px)'}}>
      <div onClick={e => e.stopPropagation()} style={{background:'linear-gradient(135deg,#0a0a0a 0%,#1a1a1a 100%)',border:'2px solid rgba(255,215,0,0.5)',borderRadius:24,width:'100%',maxWidth:520,maxHeight:'88vh',display:'flex',flexDirection:'column',boxShadow:'0 0 60px rgba(255,215,0,0.25),0 0 120px rgba(74,144,226,0.1)'}}>

        <div style={{padding:'24px 24px 16px',borderBottom:'1px solid rgba(255,215,0,0.15)',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
          <div>
            <h2 style={{color:'#FFD700',fontFamily:'Cormorant Garamond,serif',fontSize:26,fontWeight:600,margin:0,letterSpacing:.5,textShadow:'0 0 12px rgba(255,215,0,0.3)'}}>Mesleğini Seç</h2>
            <p style={{color:'rgba(255,215,0,0.6)',fontSize:12,margin:'4px 0 0',fontStyle:'italic'}}>{TOPLAM}+ meslek arasından bul</p>
          </div>
          <button onClick={onKapat} style={{background:'transparent',border:'2px solid #FFD700',borderRadius:'50%',width:38,height:38,color:'#FFD700',fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>×</button>
        </div>

        <div style={{padding:'14px 24px 0'}}>
          <div style={{position:'relative'}}>
            <span style={{position:'absolute',left:14,top:'50%',transform:'translateY(-50%)',color:'rgba(255,215,0,0.5)',fontSize:16,pointerEvents:'none'}}>🔍</span>
            <input type="text" placeholder="Meslek ara... (örn: Doktor, Berber)" value={arama} onChange={e => setArama(e.target.value)} autoFocus style={{width:'100%',padding:'11px 14px 11px 42px',background:'rgba(0,0,0,0.5)',border:'1px solid rgba(255,215,0,0.3)',borderRadius:12,color:'#FFD700',fontSize:14,outline:'none',boxSizing:'border-box'}} />
          </div>
        </div>

        <div style={{flex:1,overflowY:'auto',overflowX:'hidden',padding:'14px 24px 24px',WebkitOverflowScrolling:'touch'}}>
          {filtre.length === 0 ? (
            <div style={{textAlign:'center',padding:'40px 20px',color:'rgba(255,215,0,0.6)'}}>
              <div style={{fontSize:40,marginBottom:12}}>🔍</div>
              <p style={{margin:0,fontSize:14}}>"{arama}" için meslek bulunamadı</p>
            </div>
          ) : filtre.map(kat => (
            <div key={kat.b} style={{marginBottom:20}}>
              <h3 style={{color:'#FFD700',fontSize:12,fontWeight:600,letterSpacing:'1.2px',textTransform:'uppercase',marginBottom:8,marginTop:0,opacity:.85,display:'flex',alignItems:'center',gap:8}}>
                <span style={{fontSize:15}}>{kat.ikon}</span>{kat.b}
                <span style={{fontSize:10,fontWeight:400,color:'rgba(255,215,0,0.5)',marginLeft:'auto'}}>{kat.m.length}</span>
              </h3>
              <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:5}}>
                {kat.m.map(m => (
                  <button key={m} type="button" onClick={() => { onSec(m); onKapat(); }}
                    style={{background:'rgba(255,215,0,0.06)',border:'1px solid rgba(255,215,0,0.25)',borderRadius:10,padding:'9px 11px',color:'#fff',fontSize:12.5,textAlign:'left',cursor:'pointer',transition:'all .2s',lineHeight:1.3}}>
                    {m}
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
