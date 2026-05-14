import { useEffect, useRef } from 'react';
import './AltinCerceve.css';

export default function AltinCerceve() {
  const ustRef = useRef();
  const altRef = useRef();
  const solRef = useRef();
  const sagRef = useRef();

  useEffect(() => {
    const vv = window.visualViewport;

    function guncelle() {
      if (!vv) return;
      const l = vv.offsetLeft;
      const t = vv.offsetTop;
      const w = vv.width;
      const h = vv.height;

      if (ustRef.current) {
        ustRef.current.style.transform = `translate(${l}px, ${t}px)`;
        ustRef.current.style.width = `${w}px`;
      }
      if (altRef.current) {
        altRef.current.style.transform = `translate(${l}px, ${t + h - 2}px)`;
        altRef.current.style.width = `${w}px`;
      }
      if (solRef.current) {
        solRef.current.style.transform = `translate(${l}px, ${t}px)`;
        solRef.current.style.height = `${h}px`;
      }
      if (sagRef.current) {
        sagRef.current.style.transform = `translate(${l + w - 2}px, ${t}px)`;
        sagRef.current.style.height = `${h}px`;
      }
    }

    if (vv) {
      vv.addEventListener('resize', guncelle);
      vv.addEventListener('scroll', guncelle);
    }
    document.addEventListener('touchmove', guncelle, { passive: true });
    document.addEventListener('touchend', guncelle, { passive: true });
    document.addEventListener('touchcancel', guncelle, { passive: true });
    guncelle();

    return () => {
      if (vv) {
        vv.removeEventListener('resize', guncelle);
        vv.removeEventListener('scroll', guncelle);
      }
      document.removeEventListener('touchmove', guncelle);
      document.removeEventListener('touchend', guncelle);
      document.removeEventListener('touchcancel', guncelle);
    };
  }, []);

  return (
    <>
      <div ref={ustRef} className="ac-cubuk" />
      <div ref={altRef} className="ac-cubuk" />
      <div ref={solRef} className="ac-cubuk ac-dikey" />
      <div ref={sagRef} className="ac-cubuk ac-dikey" />
    </>
  );
}
