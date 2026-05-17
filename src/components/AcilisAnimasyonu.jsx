import { useState, useEffect, useRef, useMemo } from 'react';
import { sesBaslat, sesBitir, sesDurumu } from '../utils/sesSistemi';
import './AcilisAnimasyonu.css';

function lsGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch {} }

const HARFLER = 'GLAMWORLD'.split('');

function PirlantaSVG({ s }) {
  return (
    <svg width={s} height={s} viewBox="0 0 100 100" className="aa-pirlanta">
      <defs>
        <linearGradient id="aapg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#87CEEB" />
          <stop offset="40%"  stopColor="#FFD700" />
          <stop offset="100%" stopColor="#4A90E2" />
        </linearGradient>
      </defs>
      <polygon points="25,35 75,35 65,18 35,18" fill="#B0E0E6" opacity="0.9" />
      <polygon points="25,35 50,85 12,42"        fill="#4682B4" />
      <polygon points="75,35 50,85 88,42"        fill="#4682B4" />
      <polygon points="25,35 75,35 50,85"        fill="url(#aapg)" />
      <line x1="36" y1="22" x2="48" y2="30" stroke="#fff" strokeWidth="2.5" opacity="0.9" />
    </svg>
  );
}

export default function AcilisAnimasyonu({ onBitti, onKartGoster, kullanici }) {
  const gosterildi = !!lsGet('glamworld_acilis_gosterildi');
  const kisa       = gosterildi;
  const showKart   = !kullanici;
  const [sahne, setSahne]         = useState(1);
  const [harfSayisi, setHarfSayisi] = useState(0);
  const ctxRef  = useRef(null);
  const isMobil = window.innerWidth <= 480;
  const hiz     = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0.2 : 1);

  const parcaciklar = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x:   2 + Math.random() * 96,
      y:   2 + Math.random() * 96,
      s:   2 + Math.random() * 3,
      d:   Math.random() * 2,
      dur: 1 + Math.random(),
    })), []
  );

  const bitir = () => {
    lsSet('glamworld_acilis_gosterildi', Date.now());
    if (ctxRef.current) { try { ctxRef.current.close(); } catch {} }
    onBitti();
  };

  useEffect(() => {
    const h = hiz.current;

    if (kisa) {
      const t = setTimeout(() => { bitir(); if (showKart) onKartGoster(); }, 1200 * h);
      return () => clearTimeout(t);
    }

    const t2 = setTimeout(() => setSahne(2), 2000 * h);
    const t3 = setTimeout(() => setSahne(3), 4000 * h);
    const t4 = setTimeout(() => {
      let i = 0;
      const iv = setInterval(() => {
        i++;
        setHarfSayisi(i);
        if (i >= HARFLER.length) clearInterval(iv);
      }, 150 * h);
    }, 4300 * h);
    const t5 = setTimeout(() => { bitir(); onKartGoster(); }, 6300 * h);

    return () => {
      [t2, t3, t4, t5].forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (kisa) { console.log('[GLAMSES] Kısa path, ses atlanıyor'); return; }
    console.log('[GLAMSES] AcilisAnimasyonu mount - durum:', sesDurumu());
    sesBaslat();
    return () => { sesBitir(); };
  }, [kisa]);

  const atla = () => { bitir(); onKartGoster(); };

  if (kisa) {
    return <div className="aa-overlay aa-kisa"><div className="aa-glamray" /></div>;
  }

  return (
    <div className="aa-overlay">
      <button className="aa-gec" onClick={atla} aria-label="Animasyonu atla">Geç →</button>
      <div style={{position:'fixed',top:10,right:70,background:'rgba(0,0,0,0.7)',color:'#FFD700',padding:'4px 8px',fontSize:'10px',borderRadius:'4px',zIndex:99999,fontFamily:'monospace',pointerEvents:'none'}}>
        SES: {sesDurumu().etkilesimYakalandi ? '✓' : 'BEKLİYOR'}
      </div>
      <div className="aa-parcaciklar">
        {parcaciklar.map(p => (
          <div key={p.id} className="aa-pirlilti" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.s}px`, height: `${p.s}px`,
            animationDelay: `${p.d}s`,
            animationDuration: `${p.dur}s`,
          }} />
        ))}
      </div>
      {sahne >= 2 && (
        <div className={`aa-p-wrap${sahne >= 3 ? ' aa-patlama' : ''}`}>
          <div className="aa-halka" />
          <PirlantaSVG s={isMobil ? 120 : 180} />
        </div>
      )}
      {sahne >= 3 && (
        <div className="aa-yazi-wrap">
          <div className="aa-yazi">
            {HARFLER.map((h, i) => (
              <span key={i} className={i < harfSayisi ? 'aa-h-a' : 'aa-h-g'}>{h}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
