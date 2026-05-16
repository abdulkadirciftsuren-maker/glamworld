import { useState, useEffect, useRef } from 'react';
import Pirlanta from './Pirlanta';
import { altinTozBaslat } from '../animasyonlar/altinTozParcacik';
import './AcilisAnimasyonu.css';

function lsGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function lsSet(k, v) { try { localStorage.setItem(k, v); } catch {} }

export default function AcilisAnimasyonu({ onBitti, onKartGoster }) {
  const gosterildi = !!lsGet('glamworld_acilis_gosterildi');
  const misafir    = lsGet('glamworld_misafir_secti') === 'true';
  const kisa       = gosterildi && !misafir;
  const canvasRef  = useRef(null);
  const stopRef    = useRef(null);
  const [faze, setFaze] = useState(0);
  const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const bitir = () => {
    if (stopRef.current) stopRef.current();
    lsSet('glamworld_acilis_gosterildi', Date.now());
    onBitti();
  };

  useEffect(() => {
    const isMobil = window.innerWidth <= 480;
    const sayi    = isMobil ? 200 : 350;
    const hiz     = prefersReduced ? 0.15 : 1;

    if (gosterildi && misafir) { onBitti(); return; }

    if (kisa) {
      setFaze(4);
      const t = setTimeout(bitir, 1500 * hiz);
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
    }, 500 * hiz);

    const s2 = setTimeout(() => setFaze(2), 2500 * hiz);
    const s3 = setTimeout(() => setFaze(3), 4000 * hiz);
    const s4 = setTimeout(() => setFaze(4), 5500 * hiz);
    const s5 = setTimeout(() => {
      if (stopRef.current) stopRef.current();
      lsSet('glamworld_acilis_gosterildi', Date.now());
      onKartGoster();
      onBitti();
    }, 6000 * hiz);

    return () => {
      [s1, s2, s3, s4, s5].forEach(clearTimeout);
      if (stopRef.current) stopRef.current();
    };
  }, []);

  if (kisa) {
    return (
      <div className="aa-overlay aa-ray-sadece">
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
            <div className="aa-pirl-sol"><Pirlanta renk="altin" boyut={window.innerWidth <= 480 ? 40 : 60} /></div>
            <div className="aa-yazi">
              <span className="aa-glamworld">GLAMWORLD</span>
            </div>
            <div className="aa-pirl-sag"><Pirlanta renk="mavi" boyut={window.innerWidth <= 480 ? 40 : 60} /></div>
          </div>
          {faze >= 3 && <div className="aa-glamray" />}
        </div>
      )}
    </div>
  );
}
