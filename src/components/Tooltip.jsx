import { useState, useRef, useEffect, useCallback } from 'react';

export default function Tooltip({ text, children, position = 'top' }) {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, dir: 'top' });
  const hedefRef = useRef(null);
  const timer = useRef(null);

  const hesapla = useCallback(() => {
    if (!hedefRef.current) return;
    const r = hedefRef.current.getBoundingClientRect();
    const aralik = 8;
    const yukY = 32;
    const mobile = window.innerWidth < 768;
    let dir = position;
    let top, left;

    if (dir === 'top') {
      top = r.top - aralik - yukY;
      if (top < 10) dir = 'bottom';
    }
    if (dir === 'bottom') {
      top = r.bottom + aralik;
      if (top + yukY > window.innerHeight - 10) dir = 'top';
    }
    if (dir === 'top') top = r.top - aralik - yukY;
    if (dir === 'bottom') top = r.bottom + aralik;

    left = r.left + r.width / 2;
    if (left < 60) left = 60;
    if (left > window.innerWidth - 60) left = window.innerWidth - 60;

    setCoords({ top: mobile ? top - 4 : top, left, dir });
  }, [position]);

  const goster = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => { hesapla(); setShow(true); }, 100);
  }, [hesapla]);

  const gizle = useCallback(() => { clearTimeout(timer.current); setShow(false); }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!show) return;
    const kapat = () => setShow(false);
    window.addEventListener('scroll', kapat, { passive: true });
    window.addEventListener('touchmove', kapat, { passive: true });
    return () => {
      window.removeEventListener('scroll', kapat);
      window.removeEventListener('touchmove', kapat);
    };
  }, [show]);

  const fs = window.innerWidth < 480 ? '13px' : window.innerWidth < 1025 ? '14px' : '15px';
  const okIsaret = coords.dir === 'top' ? '▼' : '▲';
  const okStil = coords.dir === 'top'
    ? { bottom: -10, left: '50%', transform: 'translateX(-50%)', color: 'rgba(0,0,0,0.92)' }
    : { top: -10, left: '50%', transform: 'translateX(-50%)', color: 'rgba(0,0,0,0.92)' };

  return (
    <>
      <div
        ref={hedefRef}
        style={{ display: 'contents' }}
        onMouseEnter={goster}
        onMouseLeave={gizle}
        onTouchStart={goster}
        onTouchEnd={gizle}
        onTouchCancel={gizle}
      >
        {children}
      </div>
      {show && (
        <div style={{
          position: 'fixed',
          top: coords.top,
          left: coords.left,
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.92)',
          color: '#FFD700',
          padding: '6px 12px',
          borderRadius: 6,
          fontSize: fs,
          fontWeight: 500,
          pointerEvents: 'none',
          zIndex: 99999,
          whiteSpace: 'nowrap',
          border: '1px solid rgba(255,215,0,0.3)',
          boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
          animation: 'tooltipFadeIn 0.12s ease',
        }}>
          {text}
          <span style={{ position: 'absolute', fontSize: 8, lineHeight: 1, ...okStil }}>{okIsaret}</span>
        </div>
      )}
    </>
  );
}
