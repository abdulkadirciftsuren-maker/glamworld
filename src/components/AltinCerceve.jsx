import { useEffect, useRef } from 'react';
import './AltinCerceve.css';

export default function AltinCerceve() {
  const ust = useRef(), alt = useRef(), sol = useRef(), sag = useRef();

  useEffect(() => {
    const vv = window.visualViewport;

    function guncelle() {
      if (!vv) return;
      const l = vv.offsetLeft;
      const t = vv.offsetTop;
      const w = vv.width;
      const h = vv.height;

      if (ust.current) {
        ust.current.style.left   = `${l}px`;
        ust.current.style.top    = `${t}px`;
        ust.current.style.width  = `${w}px`;
      }
      if (alt.current) {
        alt.current.style.left   = `${l}px`;
        alt.current.style.top    = `${t + h - 2}px`;
        alt.current.style.width  = `${w}px`;
      }
      if (sol.current) {
        sol.current.style.left   = `${l}px`;
        sol.current.style.top    = `${t}px`;
        sol.current.style.height = `${h}px`;
      }
      if (sag.current) {
        sag.current.style.left   = `${l + w - 2}px`;
        sag.current.style.top    = `${t}px`;
        sag.current.style.height = `${h}px`;
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

  return (
    <>
      <div ref={ust} className="ac-cubuk" />
      <div ref={alt} className="ac-cubuk" />
      <div ref={sol} className="ac-cubuk ac-dikey" />
      <div ref={sag} className="ac-cubuk ac-dikey" />
    </>
  );
}
