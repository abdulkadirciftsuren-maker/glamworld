import { useState, useRef, useCallback, useEffect } from 'react';

const TERS = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };

export default function Tooltip({ text, position = 'top', children }) {
  const [gorunur, setGorunur] = useState(false);
  const [gercekPos, setGercekPos] = useState(position);
  const timer = useRef(null);
  const balonRef = useRef(null);
  const sarmaRef = useRef(null);

  const goster = useCallback((gecikme) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setGorunur(true), gecikme);
  }, []);

  const gizle = useCallback(() => {
    clearTimeout(timer.current);
    setGorunur(false);
  }, []);

  useEffect(() => {
    if (!gorunur || !balonRef.current || !sarmaRef.current) return;
    const balon = balonRef.current.getBoundingClientRect();
    const sarma = sarmaRef.current.getBoundingClientRect();
    const gw = window.innerWidth;
    const gh = window.innerHeight;
    let pos = position;
    if (pos === 'top' && sarma.top - balon.height - 8 < 0) pos = 'bottom';
    if (pos === 'bottom' && sarma.bottom + balon.height + 8 > gh) pos = 'top';
    if (pos === 'left' && sarma.left - balon.width - 8 < 0) pos = 'right';
    if (pos === 'right' && sarma.right + balon.width + 8 > gw) pos = 'left';
    const cx = sarma.left + sarma.width / 2;
    if (cx - balon.width / 2 < 8 || cx + balon.width / 2 > gw - 8) pos = TERS[pos] || pos;
    setGercekPos(pos);
  }, [gorunur, position]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const pozStil = {
    top:    { bottom: 'calc(100% + 8px)', left: '50%', transform: 'translateX(-50%)' },
    bottom: { top: 'calc(100% + 8px)',    left: '50%', transform: 'translateX(-50%)' },
    left:   { right: 'calc(100% + 8px)',  top: '50%',  transform: 'translateY(-50%)' },
    right:  { left: 'calc(100% + 8px)',   top: '50%',  transform: 'translateY(-50%)' },
  };

  return (
    <span ref={sarmaRef} style={s.sarma}
      onMouseEnter={() => goster(150)}
      onMouseLeave={gizle}
      onTouchStart={() => goster(100)}
      onTouchEnd={gizle}
      onTouchCancel={gizle}
    >
      {children}
      {gorunur && (
        <span ref={balonRef} style={{ ...s.balon, ...pozStil[gercekPos] }}>
          {text}
        </span>
      )}
    </span>
  );
}

const s = {
  sarma: { position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' },
  balon: {
    position: 'absolute',
    background: 'rgba(0,0,0,0.92)',
    color: '#FFD700',
    padding: '5px 10px',
    borderRadius: 6,
    whiteSpace: 'nowrap',
    zIndex: 99999,
    pointerEvents: 'none',
    border: '1px solid rgba(255,215,0,0.3)',
    boxShadow: '0 2px 10px rgba(0,0,0,0.6)',
    animation: 'tooltipFadeIn 0.15s ease',
    fontSize: 'clamp(13px, 1.2vw, 15px)',
    fontWeight: 500,
    letterSpacing: '0.3px',
  },
};
