import { useState } from 'react';

export default function GeriButon() {
  const [tooltip, setTooltip] = useState(false);

  const geriGit = () => window.history.back();

  return (
    <button
      onClick={geriGit}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
      onTouchStart={() => setTimeout(() => setTooltip(true), 100)}
      onTouchEnd={() => setTooltip(false)}
      onTouchCancel={() => setTooltip(false)}
      style={s.btn}
    >
      &#8592;
      {tooltip && <span style={s.tip}>Geri Dön</span>}
    </button>
  );
}

const s = {
  btn: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    background: 'rgba(255,215,0,0.1)',
    border: '2px solid #FFD700',
    borderRadius: '50%',
    color: '#FFD700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    zIndex: 9999,
    boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
    userSelect: 'none',
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
