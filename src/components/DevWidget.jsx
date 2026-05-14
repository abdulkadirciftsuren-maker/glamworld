import { useState, useEffect, useRef } from 'react';
import Tooltip from './Tooltip';
import sayac from '../sayac.json';
import './DevWidget.css';

const VERSIYON = `${sayac.version}.B${sayac.buildNumber}`;

export default function DevWidget({ sayfa = 'Anasayfa' }) {
  const [gizli, setGizli] = useState(() => {
    const k = localStorage.getItem('devwidget_gizli');
    return k === 'true';
  });
  const [saat, setSaat] = useState('');
  const [tarih, setTarih] = useState('');
  const [konum, setKonum] = useState(() => {
    const k = localStorage.getItem('devwidget_konum');
    return k ? JSON.parse(k) : null;
  });
  const [surukleniyor, setSurukleniyor] = useState(false);
  const baslangic = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });
  const ref = useRef(null);

  useEffect(() => {
    localStorage.setItem('devwidget_gizli', gizli);
  }, [gizli]);

  useEffect(() => {
    if (konum) localStorage.setItem('devwidget_konum', JSON.stringify(konum));
  }, [konum]);

  useEffect(() => {
    const guncelle = () => {
      const simdi = new Date();
      setSaat(simdi.toLocaleTimeString('tr-TR'));
      setTarih(simdi.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }));
    };
    guncelle();
    const id = setInterval(guncelle, 1000);
    return () => clearInterval(id);
  }, []);

  const surukleBasla = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    baslangic.current = { mx: cx, my: cy, wx: rect.left, wy: rect.top };
    setSurukleniyor(true);
  };

  useEffect(() => {
    const surukle = (e) => {
      if (!surukleniyor) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      setKonum({ x: baslangic.current.wx + (cx - baslangic.current.mx), y: baslangic.current.wy + (cy - baslangic.current.my) });
    };
    const birak = () => setSurukleniyor(false);
    document.addEventListener('mousemove', surukle);
    document.addEventListener('mouseup', birak);
    document.addEventListener('touchmove', surukle);
    document.addEventListener('touchend', birak);
    return () => {
      document.removeEventListener('mousemove', surukle);
      document.removeEventListener('mouseup', birak);
      document.removeEventListener('touchmove', surukle);
      document.removeEventListener('touchend', birak);
    };
  }, [surukleniyor]);

  const stil = konum ? { left: konum.x, top: konum.y, bottom: 'auto', right: 'auto' } : {};

  if (gizli) {
    return (
      <Tooltip text="Geliştirici Paneli" position="bottom">
        <div className="dev-widget-mini" onClick={() => setGizli(false)} style={stil}>
          {VERSIYON}
        </div>
      </Tooltip>
    );
  }

  return (
    <div ref={ref} className="dev-widget" style={stil} onMouseDown={surukleBasla} onTouchStart={surukleBasla}>
      <div className="dev-widget-header">
        <span className="dev-widget-title">GLAMWORLD {VERSIYON}</span>
        <Tooltip text="Geliştirici Panelini Gizle" position="bottom">
          <button className="dev-widget-close" onClick={() => setGizli(true)}>Gizle</button>
        </Tooltip>
      </div>
      <div className="dev-widget-row"><span className="dev-widget-label">Tarih</span><span className="dev-widget-value">{tarih}</span></div>
      <div className="dev-widget-row"><span className="dev-widget-label">Saat</span><span className="dev-widget-value">{saat}</span></div>
      <div className="dev-widget-row">
        <span className="dev-widget-label">Durum</span>
        <span className="dev-widget-value"><span className="dev-widget-status"></span>Aktif</span>
      </div>
      <div className="dev-widget-row"><span className="dev-widget-label">Sayfa</span><span className="dev-widget-value">{sayfa}</span></div>
    </div>
  );
}
