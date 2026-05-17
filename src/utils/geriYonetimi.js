import { useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const acikModaller = [];

export function modalAc(id, kapatFn) {
  acikModaller.push({ id, kapat: kapatFn });
  console.log('[GERI] Modal açıldı:', id, 'toplam:', acikModaller.length);
}

export function modalKapat(id) {
  const idx = acikModaller.findIndex(m => m.id === id);
  if (idx >= 0) {
    acikModaller.splice(idx, 1);
    console.log('[GERI] Modal kapandı:', id, 'kalan:', acikModaller.length);
  }
}

export function enUstModalKapat() {
  if (acikModaller.length === 0) return false;
  const son = acikModaller[acikModaller.length - 1];
  console.log('[GERI] En üst modal kapatılıyor:', son.id);
  try { son.kapat(); } catch (e) { console.error('[GERI] Hata:', e); }
  acikModaller.pop();
  return true;
}

export function modalVarMi() {
  return acikModaller.length > 0;
}

export function useGeriYap() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    console.log('[GERI] geriYap, modal:', acikModaller.length, 'path:', location.pathname);

    if (acikModaller.length > 0) {
      enUstModalKapat();
      return;
    }

    const path = location.pathname;

    if (path === '/uye-ol' || path === '/giris') {
      navigate('/', { replace: true });
      return;
    }

    if (auth.currentUser && path === '/') {
      console.log('[GERI] Anasayfada DUR');
      return;
    }

    if (!auth.currentUser && path === '/') {
      console.log('[GERI] Hoş Geldin\'de DUR');
      return;
    }

    navigate('/', { replace: true });
  }, [navigate, location.pathname]);
}

export function useAndroidGeri() {
  const geriYap = useGeriYap();
  const geriYapRef = useRef(geriYap);

  useEffect(() => { geriYapRef.current = geriYap; }, [geriYap]);

  useEffect(() => {
    window.history.pushState({ glam: 1 }, '');
    console.log('[GERI] Android dinleyici kuruldu');

    const handler = () => {
      console.log('[GERI] Android popstate yakalandı');
      geriYapRef.current();
      window.history.pushState({ glam: 1 }, '');
    };

    window.addEventListener('popstate', handler);
    return () => window.removeEventListener('popstate', handler);
  }, []);
}
