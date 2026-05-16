import { useState, useEffect, useRef } from 'react';
import './Tooltip.css';

export default function Tooltip({ text, position = 'top', children, style: extraStyle }) {
  const [gorunur, setGorunur] = useState(false);
  const wrapperRef    = useRef(null);
  const timerRef      = useRef(null);
  const touchVarRef   = useRef(false);

  useEffect(() => {
    if (gorunur) {
      timerRef.current = setTimeout(() => setGorunur(false), 5000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [gorunur]);

  useEffect(() => {
    if (!gorunur) return;
    const kapat = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setGorunur(false);
      }
    };
    document.addEventListener('touchstart', kapat);
    document.addEventListener('mousedown', kapat);
    return () => {
      document.removeEventListener('touchstart', kapat);
      document.removeEventListener('mousedown', kapat);
    };
  }, [gorunur]);

  const touchBasla = () => {
    touchVarRef.current = true;
    setTimeout(() => { touchVarRef.current = false; }, 800);
    setGorunur(true);
  };

  const mouseGir   = () => { if (!touchVarRef.current) setGorunur(true); };
  const mouseCik   = () => { if (!touchVarRef.current) setGorunur(false); };

  return (
    <div
      ref={wrapperRef}
      className="tip-wrap"
      style={extraStyle}
      onMouseEnter={mouseGir}
      onMouseLeave={mouseCik}
      onTouchStart={touchBasla}
    >
      {children}
      {gorunur && (
        <span className={`tip-kutu tip-${position}`}>{text}</span>
      )}
    </div>
  );
}
