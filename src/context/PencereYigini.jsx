import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

const PencereYiginiContext = createContext(null);

export function PencereYiginiSaglayici({ children }) {
  const [yigin, setYigin] = useState([]);

  const acModal = useCallback((id, kapatmaFn) => {
    setYigin(eski => {
      const filtreli = eski.filter(m => m.id !== id);
      return [...filtreli, { id, kapat: kapatmaFn }];
    });
    console.log('[YIGIN] Modal açıldı:', id);
  }, []);

  const kapatModal = useCallback((id) => {
    setYigin(eski => eski.filter(m => m.id !== id));
    console.log('[YIGIN] Modal kapatıldı:', id);
  }, []);

  const enUsttekiKapat = useCallback(() => {
    if (yigin.length === 0) return false;
    const enUst = yigin[yigin.length - 1];
    console.log('[YIGIN] En üstteki kapatılıyor:', enUst.id);
    try { if (typeof enUst.kapat === 'function') enUst.kapat(); } catch (e) { console.error('[YIGIN] Kapatma hatası:', e); }
    setYigin(eski => eski.slice(0, -1));
    return true;
  }, [yigin]);

  return (
    <PencereYiginiContext.Provider value={{ yigin, acModal, kapatModal, enUsttekiKapat, yiginVar: yigin.length > 0, uzunluk: yigin.length }}>
      {children}
    </PencereYiginiContext.Provider>
  );
}

export function usePencereYigini() {
  const ctx = useContext(PencereYiginiContext);
  if (!ctx) throw new Error('usePencereYigini PencereYiginiSaglayici içinde olmalı');
  return ctx;
}

export function useModalKaydet(modalId, acik, onKapat) {
  const { acModal, kapatModal } = usePencereYigini();
  const onKapatRef = useRef(onKapat);

  useEffect(() => { onKapatRef.current = onKapat; }, [onKapat]);

  useEffect(() => {
    if (acik) {
      acModal(modalId, () => {
        if (typeof onKapatRef.current === 'function') onKapatRef.current();
      });
    } else {
      kapatModal(modalId);
    }
    return () => kapatModal(modalId);
  }, [acik, modalId, acModal, kapatModal]);
}
