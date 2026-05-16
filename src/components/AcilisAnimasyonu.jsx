import { useState, useEffect, useRef } from 'react';
import Pirlanta from './Pirlanta';
import { altinTozBaslat } from '../animasyonlar/altinTozParcacik';
import './AcilisAnimasyonu.css';

function localGet(key) {
  try { return localStorage.getItem(key); } catch { return null; }
}
function localSet(key, val) {
  try { localStorage.setItem(key, val); } catch {}
}

const LS_KEY = 'glamworld_acilis_gosterildi';

export default function AcilisAnimasyonu({ onBitti }) {
  const onceki = localGet(LS_KEY);
  const kisa = !!onceki;
  const canvasRef = useRef(null);
  const [faze, setFaze] = useState(0);
  const stopRef = useRef(null);

  const bitir = () => {
    if (stopRef.current) stopRef.current();
    localSet(LS_KEY, Date.now());
    onBitti();
  };

  useEffect(() => {
    const isMobil = window.innerWidth <= 480;
    const sayi = isMobil ? 100 : 200;

    if (kisa) {
      setFaze(4);
      const t = setTimeout(bitir, 1000);
      return () => clearTimeout(t);
    }

    const s1 = setTimeout(() => {
      setFaze(1);
      if (canvasRef.current) {
        const c = canvasRef.current;
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        stopRef.current = altinTozBaslat(c, sayi);
      }
    }, 500);

    const s2 = setTimeout(() => setFaze(2), 1500);
    const s3 = setTimeout(() => setFaze(3), 2500);
    const s4 = setTimeout(() => setFaze(4), 3500);
    const s5 = setTimeout(bitir, 4000);

    return () => {
      [s1, s2, s3, s4, s5].forEach(clearTimeout);
      if (stopRef.current) stopRef.current();
    };
  }, []);

  if (kisa) {
    return (
      <div className={`aa-overlay${faze >= 4 ? ' aa-ray' : ''}`}>
        <div className="aa-glamray" />
      </div>
    );
  }

  return (
    <div className={`aa-overlay aa-faze-${faze}`}>
      <button className="aa-gec" onClick={bitir} aria-label="Animasyonu atla">Geç →</button>
      <canvas ref={canvasRef} className="aa-canvas" />
      {faze >= 2 && (
        <div className={`aa-logo${faze >= 4 ? ' aa-logo-ucus' : ''}`}>
          <div className="aa-logo-icerik">
            <div className="aa-pirlanta-sol"><Pirlanta renk="mavi" boyut={32} /></div>
            <div className="aa-yazi">
              <span className="aa-glamworld">GLAMWORLD</span>
              <span className="aa-slogan">Dünyanın Platformu</span>
            </div>
            <div className="aa-pirlanta-sag"><Pirlanta renk="mavi" boyut={32} /></div>
          </div>
          {faze >= 3 && <div className="aa-glamray" />}
        </div>
      )}
    </div>
  );
}
