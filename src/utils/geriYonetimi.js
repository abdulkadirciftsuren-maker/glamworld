import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePencereYigini } from '../context/PencereYigini';
import { auth } from '../firebase';

function calistirGeri(y, e, p, n) {
  console.log('[GERI] geriYap, yığın:', y.current, 'path:', p.current);

  if (y.current) {
    console.log('[GERI] Modal kapatılıyor');
    try { e.current(); } catch (err) { console.error('[GERI] Hata:', err); }
    return;
  }

  const path = p.current;
  if (path === '/uye-ol' || path === '/giris') {
    console.log('[GERI] Hoş Geldin\'e git');
    n.current('/', { replace: true });
    return;
  }

  if (auth.currentUser || path === '/') {
    console.log('[GERI] Sayfada kal');
    return;
  }

  console.log('[GERI] Anasayfaya dön');
  n.current('/', { replace: true });
}

export function useGeriYonetimi() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enUsttekiKapat, yiginVar } = usePencereYigini();

  const yRef = useRef(yiginVar);
  const eRef = useRef(enUsttekiKapat);
  const pRef = useRef(location.pathname);
  const nRef = useRef(navigate);

  useEffect(() => { yRef.current = yiginVar; },            [yiginVar]);
  useEffect(() => { eRef.current = enUsttekiKapat; },      [enUsttekiKapat]);
  useEffect(() => { pRef.current = location.pathname; },   [location.pathname]);
  useEffect(() => { nRef.current = navigate; },            [navigate]);

  useEffect(() => {
    window.history.pushState({ glamworld: true }, '');
    console.log('[GERI] Dinleyici kuruldu');

    const handler = () => {
      calistirGeri(yRef, eRef, pRef, nRef);
      window.history.pushState({ glamworld: true }, '');
    };

    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);

  return useCallback(() => calistirGeri(yRef, eRef, pRef, nRef), []);
}

export function useGeriFonksiyonu() {
  const navigate = useNavigate();
  const location = useLocation();
  const { enUsttekiKapat, yiginVar } = usePencereYigini();

  const yRef = useRef(yiginVar);
  const eRef = useRef(enUsttekiKapat);
  const pRef = useRef(location.pathname);
  const nRef = useRef(navigate);

  useEffect(() => { yRef.current = yiginVar; },            [yiginVar]);
  useEffect(() => { eRef.current = enUsttekiKapat; },      [enUsttekiKapat]);
  useEffect(() => { pRef.current = location.pathname; },   [location.pathname]);
  useEffect(() => { nRef.current = navigate; },            [navigate]);

  return useCallback(() => calistirGeri(yRef, eRef, pRef, nRef), []);
}
