import { useMemo } from 'react';
import './AltinTozAtmosfer.css';

export default function AltinTozAtmosfer() {
  const tozlar = useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left:     Math.random() * 100,
      bottom:   Math.random() * 100,
      size:     1 + Math.random() * 3,
      delay:    Math.random() * 8,
      duration: 8 + Math.random() * 6,
      opacity:  0.3 + Math.random() * 0.5,
    })), []
  );

  return (
    <div className="ata-kap" aria-hidden="true">
      {tozlar.map(t => (
        <span key={t.id} className="ata-parca" style={{
          left:             `${t.left}%`,
          bottom:           `${t.bottom}%`,
          width:            `${t.size}px`,
          height:           `${t.size}px`,
          animationDelay:   `${t.delay}s`,
          animationDuration:`${t.duration}s`,
          opacity:          t.opacity,
        }} />
      ))}
    </div>
  );
}
