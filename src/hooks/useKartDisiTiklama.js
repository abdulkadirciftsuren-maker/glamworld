import { useEffect } from 'react';

export function useKartDisiTiklama(ref, onKapat, aktif = true) {
  useEffect(() => {
    if (!aktif) return;

    function tikla(e) {
      if (ref.current && !ref.current.contains(e.target)) onKapat();
    }
    function esc(e) {
      if (e.key === 'Escape') onKapat();
    }

    document.addEventListener('mousedown', tikla);
    document.addEventListener('touchstart', tikla);
    document.addEventListener('keydown', esc);

    return () => {
      document.removeEventListener('mousedown', tikla);
      document.removeEventListener('touchstart', tikla);
      document.removeEventListener('keydown', esc);
    };
  }, [ref, onKapat, aktif]);
}
