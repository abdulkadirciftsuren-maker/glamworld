import { useState, useEffect, useRef } from 'react';

const DEPO_KEY = 'geriButonKonum';

export default function GeriButon() {
  const kayitli = localStorage.getItem(DEPO_KEY);
  const [konum, setKonum] = useState(kayitli ? JSON.parse(kayitli) : null);
  const [suruklendi, setSuruklendi] = useState(false);
  const surukleniyor = useRef(false);
  const baslangic = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });
  const konumRef = useRef(konum);
  const ref = useRef(null);

  konumRef.current = konum;

  const surukleBasla = (e) => {
    e.preventDefault();
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    baslangic.current = { mx: cx, my: cy, wx: rect.left, wy: rect.top };
    surukleniyor.current = true;
    setSuruklendi(false);
  };

  useEffect(() => {
    const surukle = (e) => {
      if (!surukleniyor.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const yeniX = baslangic.current.wx + (cx - baslangic.current.mx);
      const yeniY = baslangic.current.wy + (cy - baslangic.current.my);
      setKonum({ x: yeniX, y: yeniY });
      setSuruklendi(true);
    };
    const birak = () => {
      if (!surukleniyor.current) return;
      surukleniyor.current = false;
      if (konumRef.current) {
        localStorage.setItem(DEPO_KEY, JSON.stringify(konumRef.current));
      }
    };
    document.addEventListener('mousemove', surukle);
    document.addEventListener('mouseup', birak);
    document.addEventListener('touchmove', surukle, { passive: false });
    document.addEventListener('touchend', birak);
    return () => {
      document.removeEventListener('mousemove', surukle);
      document.removeEventListener('mouseup', birak);
      document.removeEventListener('touchmove', surukle);
      document.removeEventListener('touchend', birak);
    };
  }, []);

  const geriGit = () => {
    if (!suruklendi) window.history.back();
  };

  const pozisyon = konum
    ? { left: konum.x, top: konum.y, bottom: 'auto', right: 'auto' }
    : { bottom: 20, right: 20 };

  return (
    <button
      ref={ref}
      onClick={geriGit}
      onMouseDown={surukleBasla}
      onTouchStart={surukleBasla}
      title="Geri"
      style={{ ...s.btn, ...pozisyon }}
    >
      &#8592;
    </button>
  );
}

const s = {
  btn: {
    position: 'fixed',
    width: 56,
    height: 56,
    background: 'rgba(255,215,0,0.1)',
    border: '2px solid #FFD700',
    borderRadius: '50%',
    color: '#FFD700',
    cursor: 'move',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    zIndex: 9998,
    boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
    userSelect: 'none',
    touchAction: 'none',
  },
};
