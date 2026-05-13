import './Pirlanta.css';

const RENKLER = {
  beyaz: { ust: '#FFFFFF', orta: '#E8E8E8', alt: '#B8B8B8', glow: 'rgba(255,255,255,0.8)' },
  altin: { ust: '#FFE55C', orta: '#FFD700', alt: '#FFA500', glow: 'rgba(255,215,0,0.8)' },
  mavi:  { ust: '#87CEEB', orta: '#1E90FF', alt: '#0066CC', glow: 'rgba(30,144,255,0.8)' },
  gumus: { ust: '#E8E8E8', orta: '#C0C0C0', alt: '#909090', glow: 'rgba(192,192,192,0.7)' },
};

let sayac = 0;

function Pirlanta({ renk = 'mavi', boyut = 28 }) {
  const r = RENKLER[renk] || RENKLER.mavi;
  const id = `pg-${renk}-${++sayac}`;
  const tid = `pt-${renk}-${sayac}`;

  return (
    <svg
      className={`pirlanta pirlanta-${renk}`}
      viewBox="0 0 100 100"
      width={boyut}
      height={boyut}
      style={{ filter: `drop-shadow(0 0 8px ${r.glow})` }}
    >
      <defs>
        <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={r.ust}/>
          <stop offset="50%" stopColor={r.orta}/>
          <stop offset="100%" stopColor={r.alt}/>
        </linearGradient>
        <linearGradient id={tid} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={r.ust}/>
          <stop offset="100%" stopColor={r.orta}/>
        </linearGradient>
      </defs>
      <polygon points="25,35 75,35 65,20 35,20" fill={`url(#${tid})`} stroke="#fff" strokeWidth="0.5"/>
      <polygon points="25,35 50,85 15,40" fill={r.alt} stroke="#fff" strokeWidth="0.5"/>
      <polygon points="75,35 50,85 85,40" fill={r.alt} stroke="#fff" strokeWidth="0.5"/>
      <polygon points="25,35 75,35 50,85" fill={`url(#${id})`} stroke="#fff" strokeWidth="0.5"/>
      <line x1="35" y1="25" x2="45" y2="30" stroke="#fff" strokeWidth="2" opacity="0.9"/>
      <circle cx="42" cy="45" r="2" fill="#fff" opacity="0.6"/>
    </svg>
  );
}

export default Pirlanta;
