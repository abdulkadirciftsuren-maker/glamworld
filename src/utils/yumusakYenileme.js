import { useEffect, useRef } from 'react';

export function useYumusakYenileme(onYenile) {
  const onYenileRef = useRef(onYenile);
  onYenileRef.current = onYenile;

  const baslangic = useRef(0);
  const aktif    = useRef(false);
  const esik     = 80;

  useEffect(() => {
    const dokunBasla = (e) => {
      if (window.scrollY <= 0 && e.touches.length === 1) {
        baslangic.current = e.touches[0].clientY;
        aktif.current = true;
      }
    };

    const dokunHareket = (e) => {
      if (!aktif.current) return;
      const fark = e.touches[0].clientY - baslangic.current;
      if (fark > esik) {
        aktif.current = false;
        if (typeof onYenileRef.current === 'function') {
          onYenileRef.current();
        }
      }
    };

    const dokunBit = () => { aktif.current = false; };

    document.addEventListener('touchstart', dokunBasla, { passive: true });
    document.addEventListener('touchmove',  dokunHareket, { passive: true });
    document.addEventListener('touchend',   dokunBit,   { passive: true });

    return () => {
      document.removeEventListener('touchstart', dokunBasla);
      document.removeEventListener('touchmove',  dokunHareket);
      document.removeEventListener('touchend',   dokunBit);
    };
  }, []);
}
