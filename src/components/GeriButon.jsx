import { useState, useEffect, useRef } from 'react';

const DEPO_KEY = 'geriButonKonum';

function varsayilanKonum() {
  return { x: window.innerWidth - 76, y: window.innerHeight - 76 };
}

function sinirIcinde(x, y) {
  const maxX = window.innerWidth - 56;
  const maxY = window.innerHeight - 56;
  return {
    x: Math.max(4, Math.min(x, maxX)),
    y: Math.max(4, Math.min(y, maxY)),
  };
}

export default function GeriButon() {
  const kayitli = localStorage.getItem(DEPO_KEY);
  const [konum, setKonum] = useState(() => {
    if (kayitli) {
      const k = JSON.parse(kayitli);
      return sinirIcinde(k.x, k.y);
    }
    return varsayilanKonum();
  });
  const [suruklendi, setSuruklendi] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const surukleniyor = useRef(false);
  const baslangic = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });
  const konumRef = useRef(konum);
  const ref = useRef(null);

  konumRef.current = konum;

  useEffect(() => {
    const yeniden = () => {
      setKonum(prev => sinirIcinde(prev.x, prev.y));
    };
    window.addEventListener('resize', yeniden);
    window.addEventListener('orientationchange', yeniden);
    return () => {
      window.removeEventListener('resize', yeniden);
      window.removeEventListener('orientationchange', yeniden);
    };
  }, []);

  const surukleBasla = (e) => {
    e.preventDefault();
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    baslangic.current = { mx: cx, my: cy, wx: rect.left, wy: rect.top };
    surukleniyor.current = true;
    setSuruklendi(false);
    setTooltip(false);
  };

  useEffect(() => {
    const surukle = (e) => {
      if (!surukleniyor.current) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const yeni = sinirIcinde(
        baslangic.current.wx + (cx - baslangic.current.mx),
        baslangic.current.wy + (cy - baslangic.current.my)
      );
      setKonum(yeni);
      setSuruklendi(true);
    };
    const birak = () => {
      if (!surukleniyor.current) return;
      surukleniyor.current = false;
      localStorage.setItem(DEPO_KEY, JSON.stringify(konumRef.current));
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

  const geriGit = () => { if (!suruklendi) window.history.back(); };

  const uste = konum.y > 80;

  return (
    <button
      ref={ref}
      onClick={geriGit}
      onMouseDown={surukleBasla}
      onTouchStart={(e) => { surukleBasla(e); setTimeout(() => setTooltip(true), 100); }}
      onMouseEnter={() => setTimeout(() => setTooltip(true), 150)}
      onMouseLeave={() => setTooltip(false)}
      onTouchEnd={() => setTooltip(false)}
      onTouchCancel={() => setTooltip(false)}
      style={{ ...s.btn, left: konum.x, top: konum.y }}
    >
      &#8592;
      {tooltip && (
        <span style={{ ...s.tip, ...(uste ? s.tipUst : s.tipAlt) }}>
          Geri Dön
        </span>
      )}
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
    zIndex: 9999,
    boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
    userSelect: 'none',
    touchAction: 'none',
  },
  tip: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0,0,0,0.92)',
    color: '#FFD700',
    fontSize: 'clamp(13px,1.2vw,15px)',
    fontWeight: 500,
    padding: '5px 10px',
    borderRadius: 6,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    border: '1px solid rgba(255,215,0,0.3)',
    zIndex: 10000,
  },
  tipUst: { bottom: 'calc(100% + 8px)' },
  tipAlt: { top: 'calc(100% + 8px)' },
};
