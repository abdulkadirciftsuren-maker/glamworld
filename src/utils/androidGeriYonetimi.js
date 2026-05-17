import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePencereYigini } from '../context/PencereYigini';
import { auth } from '../firebase';

export function useAndroidGeri() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enUsttekiKapat, yiginVar } = usePencereYigini();

  useEffect(() => {
    window.history.pushState({ glamworld: true }, '');

    const popstateHandler = (event) => {
      event.preventDefault();
      console.log('[ANDROID-GERI] popstate, yıgın:', yiginVar, 'path:', location.pathname);

      if (yiginVar) {
        const kapatildi = enUsttekiKapat();
        if (kapatildi) {
          window.history.pushState({ glamworld: true }, '');
          return;
        }
      }

      const path = location.pathname;

      if (path === '/uye-ol' || path === '/giris') {
        navigate('/', { replace: true });
        return;
      }

      if (auth.currentUser) {
        window.history.pushState({ glamworld: true }, '');
        return;
      }
    };

    window.addEventListener('popstate', popstateHandler);
    return () => window.removeEventListener('popstate', popstateHandler);
  }, [location.pathname, navigate, enUsttekiKapat, yiginVar]);
}
