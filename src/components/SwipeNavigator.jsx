import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { profilRotasiSec } from '../utils/kullaniciProfili';

export default function SwipeNavigator({ kullaniciProfili, children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const baslangicX = useRef(null);
  const baslangicY = useRef(null);
  const bitisX     = useRef(null);
  const bitisY     = useRef(null);

  const profilRota = profilRotasiSec(
    kullaniciProfili || { hesapTuru: 'musteri', cinsiyet: 'tarafsiz' }
  );

  const SAYFALAR = [
    '/',
    '/pirlanta-pazari',
    '/tanisma',
    '/canli-yayinlar',
    '/harita',
    '/egitimler',
    profilRota,
  ];

  const mevcutIndex = SAYFALAR.findIndex(yol =>
    yol.startsWith('/profil/')
      ? location.pathname.startsWith('/profil/')
      : location.pathname === yol
  );

  useEffect(() => {
    const YATAY_ESIK    = 50;
    const DIKEY_TOLERANS = 80;

    const basla = (e) => {
      const hedef = e.target;
      if (
        hedef.tagName === 'INPUT'    ||
        hedef.tagName === 'TEXTAREA' ||
        hedef.tagName === 'SELECT'   ||
        hedef.closest('button')           ||
        hedef.closest('a')                ||
        hedef.closest('form')             ||
        hedef.closest('.hgk-overlay')     ||
        hedef.closest('.hgk-kart')        ||
        hedef.closest('.aa-overlay')      ||
        hedef.closest('.modal')           ||
        hedef.closest('.cikis-onay-modal')
      ) {
        baslangicX.current = null;
        return;
      }
      if (e.touches.length !== 1) return;
      baslangicX.current = e.touches[0].clientX;
      baslangicY.current = e.touches[0].clientY;
      bitisX.current = null;
      bitisY.current = null;
    };

    const hareket = (e) => {
      if (e.touches.length !== 1) return;
      bitisX.current = e.touches[0].clientX;
      bitisY.current = e.touches[0].clientY;
    };

    const bitis = () => {
      if (baslangicX.current === null || bitisX.current === null) return;
      const farkX = bitisX.current - baslangicX.current;
      const farkY = Math.abs(bitisY.current - baslangicY.current);
      baslangicX.current = null;
      bitisX.current = null;

      if (farkY > DIKEY_TOLERANS) return;
      if (Math.abs(farkX) < YATAY_ESIK) return;

      if (farkX < 0 && mevcutIndex < SAYFALAR.length - 1) {
        navigate(SAYFALAR[mevcutIndex + 1]);
      } else if (farkX > 0 && mevcutIndex > 0) {
        navigate(SAYFALAR[mevcutIndex - 1]);
      }
    };

    document.body.addEventListener('touchstart', basla,  { passive: true });
    document.body.addEventListener('touchmove',  hareket, { passive: true });
    document.body.addEventListener('touchend',   bitis);
    return () => {
      document.body.removeEventListener('touchstart', basla);
      document.body.removeEventListener('touchmove',  hareket);
      document.body.removeEventListener('touchend',   bitis);
    };
  }, [mevcutIndex, navigate, SAYFALAR]);

  return <>{children}</>;
}
