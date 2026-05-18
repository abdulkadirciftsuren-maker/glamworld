import { useEffect, useRef, useState } from 'react';

export default function SehirSec({ deger, onDegisim }) {
  const inputRef = useRef(null);
  const [konumAliniyor, setKonumAliniyor] = useState(false);

  useEffect(() => {
    if (!inputRef.current || !window.google?.maps?.places) return;
    const ac = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ['(regions)'],
      fields: ['name', 'formatted_address'],
    });
    ac.addListener('place_changed', () => {
      const p = ac.getPlace();
      if (p?.formatted_address) onDegisim(p.formatted_address);
      else if (p?.name) onDegisim(p.name);
    });
    return () => window.google.maps.event.clearInstanceListeners(ac);
  }, []);

  const konumAl = () => {
    if (!navigator.geolocation) { alert('Konum servisi desteklenmiyor'); return; }
    setKonumAliniyor(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const r = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&accept-language=tr`);
          const d = await r.json();
          const s = d.address?.city || d.address?.town || d.address?.village || d.address?.county || d.display_name?.split(',')[0];
          if (s) onDegisim(s);
          else alert('Şehir bulunamadı, manuel yaz');
        } catch { alert('Konum bilgisi alınamadı'); }
        setKonumAliniyor(false);
      },
      (err) => {
        setKonumAliniyor(false);
        if (err.code === 1) alert('Konum izni verilmedi');
        else alert('Konum alınamadı');
      },
      { timeout: 10000 }
    );
  };

  const inp = {width:'100%',padding:'12px 14px 12px 40px',background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,215,0,0.4)',borderRadius:12,color:'#FFD700',fontSize:14,outline:'none',boxSizing:'border-box',transition:'all .2s'};

  return (
    <div style={{marginBottom:4}}>
      <div style={{display:'flex',gap:8}}>
        <div style={{flex:1,position:'relative'}}>
          <span style={{position:'absolute',left:12,top:'50%',transform:'translateY(-50%)',color:'rgba(255,215,0,0.5)',fontSize:16,pointerEvents:'none'}}>🌍</span>
          <input ref={inputRef} type="text" placeholder="Şehir yaz... (örn: Berlin, İstanbul, Bad Tölz)" value={deger||''} onChange={e=>onDegisim(e.target.value)} style={inp} onFocus={e=>{e.target.style.borderColor='#FFD700';e.target.style.boxShadow='0 0 12px rgba(255,215,0,0.2)';}} onBlur={e=>{e.target.style.borderColor='rgba(255,215,0,0.4)';e.target.style.boxShadow='none';}} />
        </div>
        <button type="button" onClick={konumAl} disabled={konumAliniyor} title="Konumumu kullan" style={{background:'rgba(255,215,0,0.1)',border:'1px solid rgba(255,215,0,0.4)',borderRadius:12,padding:'0 14px',color:'#FFD700',fontSize:20,cursor:konumAliniyor?'wait':'pointer',opacity:konumAliniyor?0.6:1,minWidth:48,transition:'all .2s'}}>
          {konumAliniyor?'⏳':'📍'}
        </button>
      </div>
      <p style={{color:'rgba(255,215,0,0.5)',fontSize:11,margin:'5px 0 0 4px',fontStyle:'italic'}}>Yaz veya 📍 ile otomatik al</p>
    </div>
  );
}
