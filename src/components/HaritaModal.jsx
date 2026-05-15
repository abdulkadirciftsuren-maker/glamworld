import { auth } from '../firebase';
import Pirlanta from './Pirlanta';
import './HaritaModal.css';

export default function HaritaModal({ konum, onKapat }) {
  if (!konum) return null;

  const lat     = konum.lat     || 52.52;
  const lng     = konum.lng     || 13.405;
  const city    = konum.city    || 'Berlin';
  const country = konum.country || 'Almanya';
  const foto    = auth.currentUser?.photoURL || null;

  const d   = 0.03;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng-d},${lat-d},${lng+d},${lat+d}&layer=mapnik`;

  return (
    <div className="hm-overlay" onClick={onKapat}>
      <div className="hm-panel" onClick={e => e.stopPropagation()}>
        <div className="hm-header">
          <div className="hm-baslik">
            <Pirlanta renk="mavi" boyut={16} />
            <span className="hm-sehir">{city}, {country}</span>
          </div>
          <button className="hm-kapat" onClick={onKapat}>✕</button>
        </div>

        <div className="hm-harita-wrap">
          <iframe title="Harita" src={src} className="hm-iframe" loading="lazy" />
          <div className="hm-marker">
            {foto
              ? <img src={foto} alt="Ben" className="hm-foto" />
              : <div className="hm-nokta" />
            }
            <div className="hm-pin" />
          </div>
        </div>

        <div className="hm-alt">
          <a
            href={`https://www.google.com/maps?q=${lat},${lng}`}
            target="_blank"
            rel="noreferrer"
            className="hm-gm-btn"
          >
            Google Maps'te Aç
          </a>
        </div>
      </div>
    </div>
  );
}
