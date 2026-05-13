import { useState, useEffect, useRef } from 'react';
import './DevWidget.css';

const VERSIYON = 'V2.B3';

export default function DevWidget({ sayfa = 'Anasayfa' }) {
  const [gizli, setGizli] = useState(false);
  const [saat, setSaat] = useState('');
  const [tarih, setTarih] = useState('');
  const [konum, setKonum] = useState({ x: null, y: null });
  const [surukleniyor, setSurukleniyor] = useState(false);
  const baslangic = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });
  const ref = useRef(null);

  useEffect(() => {
    const guncelle = () => {
      const simdi = new Date();
      const saatStr = simdi.toLocaleTimeString('tr-TR');
      const tarihStr = simdi.toLocaleDateString('tr-TR', {
        day: 'numeric', month: 'long', year: 'numeric'
      });
      setSaat(saatStr);
      setTarih(tarihStr);
    };
    guncelle();
    const id = setInterval(guncelle, 1000);
    return () => clearInterval(id);
  }, []);

  const surukleBasla = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    baslangic.current = { mx: clientX, my: clientY, wx: rect.left, wy: rect.top };
    setSurukleniyor(true);
  };

  useEffect(() => {
    const surukle = (e) => {
      if (!surukleniyor) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dx = clientX - baslangic.current.mx;
      const dy = clientY - baslangic.current.my;
      setKonum({ x: baslangic.current.wx + dx, y: baslangic.current.wy + dy });
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

  const stil = konum.x !== null
    ? { left: konum.x, top: konum.y, bottom: 'auto', right: 'auto' }
    : {};

  if (gizli) {
    return (
      <div className="dev-widget-mini" onClick={() => setGizli(false)} style={stil}>
        {VERSIYON} — Ac
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="dev-widget"
      style={stil}
      onMouseDown={surukleBasla}
      onTouchStart={surukleBasla}
    >
      <div className="dev-widget-header">
        <span className="dev-widget-title">GLAMWORLD {VERSIYON}</span>
        <button className="dev-widget-close" onClick={() => setGizli(true)}>Gizle</button>
      </div>
      <div className="dev-widget-row">
        <span className="dev-widget-label">Tarih</span>
        <span className="dev-widget-value">{tarih}</span>
      </div>
      <div className="dev-widget-row">
        <span className="dev-widget-label">Saat</span>
        <span className="dev-widget-value">{saat}</span>
      </div>
      <div className="dev-widget-row">
        <span className="dev-widget-label">Durum</span>
        <span className="dev-widget-value">
          <span className="dev-widget-status"></span>Aktif
        </span>
      </div>
      <div className="dev-widget-row">
        <span className="dev-widget-label">Sayfa</span>
        <span className="dev-widget-value">{sayfa}</span>
      </div>
    </div>
  );
}
