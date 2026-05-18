import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function sagAlt() {
  return {
    x: window.innerWidth - 72,
    y: window.innerHeight - 88,
  };
}

function sinirIcinde(x, y) {
  return {
    x: Math.max(4, Math.min(x, window.innerWidth - 60)),
    y: Math.max(4, Math.min(y, window.innerHeight - 60)),
  };
}

export default function GeriButon() {
  const navigate = useNavigate();
  const location = useLocation();
  const [konum, setKonum] = useState(sagAlt);
  const [suruklendi, setSuruklendi] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const surukleniyor = useRef(false);
  const baslangic = useRef({ mx: 0, my: 0, wx: 0, wy: 0 });
  const ref = useRef(null);

  useEffect(() => {
    setKonum(sagAlt());
  }, [location.pathname]);

  useEffect(() => {
    let sonGenislik = window.innerWidth;
    const resizeSifirla = () => {
      if (window.innerWidth !== sonGenislik) {
        sonGenislik = window.innerWidth;
        setKonum(sagAlt());
      }
    };
    const orientationSifirla = () => {
      setTimeout(() => setKonum(sagAlt()), 250);
    };
    window.addEventListener('resize', resizeSifirla);
    window.addEventListener('orientationchange', orientationSifirla);
    return () => {
      window.removeEventListener('resize', resizeSifirla);
      window.removeEventListener('orientationchange', orientationSifirla);
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
      setKonum(sinirIcinde(
        baslangic.current.wx + (cx - baslangic.current.mx),
        baslangic.current.wy + (cy - baslangic.current.my)
      ));
      setSuruklendi(true);
    };
    const birak = () => { surukleniyor.current = false; };
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

  if (location.pathname === '/') return null;

  const geriGit = () => {
    if (suruklendi) return;
    if (location.pathname === '/uye-ol' || location.pathname === '/giris') { navigate('/'); return; }
    navigate(-1);
  };
  const w = window.innerWidth;
  const boyut = w < 481 ? 48 : w < 769 ? 44 : w < 1025 ? 52 : 56;

  return (
    <button
      ref={ref}
      onClick={geriGit}
      onMouseDown={surukleBasla}
      onTouchStart={(e) => { surukleBasla(e); setTimeout(() => setTooltip(true), 100); }}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
      onTouchEnd={() => setTooltip(false)}
      onTouchCancel={() => setTooltip(false)}
      style={{ ...s.btn, left: konum.x, top: konum.y, width: boyut, height: boyut }}
    >
      &#8592;
      {tooltip && <span style={s.tip}>Geri Dön</span>}
    </button>
  );
}

const s = {
  btn: {
    position: 'fixed',
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
    bottom: 'calc(100% + 8px)',
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
};
