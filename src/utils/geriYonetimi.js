import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const acikModaller = [];

export function modalAc(id, kapatFn) {
  const idx = acikModaller.findIndex(m => m.id === id);
  if (idx >= 0) acikModaller.splice(idx, 1);
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

let modalPopstateAktif = false;
let modalPopstateHandler = null;

export function modalIcinAndroidYakala(kapatFn) {
  if (modalPopstateAktif && modalPopstateHandler) {
    console.log('[GERI] Modal popstate zaten aktif, eskisi kaldırılıyor');
    window.removeEventListener('popstate', modalPopstateHandler);
  }

  window.history.pushState({ glamModal: true }, '');
  console.log('[GERI] Modal için Android dinleyici kuruldu');

  modalPopstateAktif = true;

  modalPopstateHandler = () => {
    console.log('[GERI] Modal popstate yakalandı - modal kapatılıyor');
    try { if (typeof kapatFn === 'function') kapatFn(); } catch (e) { console.error('[GERI] Hata:', e); }
    modalPopstateAktif = false;
    window.removeEventListener('popstate', modalPopstateHandler);
    modalPopstateHandler = null;
  };

  window.addEventListener('popstate', modalPopstateHandler);

  return () => {
    if (modalPopstateHandler) {
      console.log('[GERI] Modal kapandı - dinleyici temizleniyor');
      window.removeEventListener('popstate', modalPopstateHandler);
      modalPopstateHandler = null;
      modalPopstateAktif = false;
    }
  };
}

export function useGeriYap() {
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(() => {
    console.log('[GERI] Bizim Geri, modal var:', acikModaller.length, 'path:', location.pathname);

    if (acikModaller.length > 0) {
      enUstModalKapat();
      return;
    }

    const path = location.pathname;

    if (path === '/uye-ol' || path === '/giris') {
      navigate('/', { replace: true });
      return;
    }

    navigate('/', { replace: true });
  }, [navigate, location.pathname]);
}
