import { useEffect, useRef } from 'react';
import './AltinCerceve.css';

export default function AltinCerceve() {
  const ref = useRef(null);

  useEffect(() => {
    const vv = window.visualViewport;

    function guncelle() {
      if (!ref.current) return;
      if (vv) {
        ref.current.style.top    = `${vv.offsetTop}px`;
        ref.current.style.left   = `${vv.offsetLeft}px`;
        ref.current.style.width  = `${vv.width}px`;
        ref.current.style.height = `${vv.height}px`;
      }
    }

    if (vv) {
      vv.addEventListener('resize', guncelle);
      vv.addEventListener('scroll', guncelle);
    }
    guncelle();

    return () => {
      if (vv) {
        vv.removeEventListener('resize', guncelle);
        vv.removeEventListener('scroll', guncelle);
      }
    };
  }, []);

  return <div ref={ref} className="altin-cerceve" />;
}
