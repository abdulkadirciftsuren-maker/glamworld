import { useEffect, useRef } from 'react';
import Pirlanta from './Pirlanta';
import { useKartDisiTiklama } from '../hooks/useKartDisiTiklama';
import './CikisOnayModal.css';

export default function CikisOnayModal({ kullaniciAdi, onVazgec, onCikis }) {
  const panelRef = useRef(null);
  useKartDisiTiklama(panelRef, onVazgec, true);

  useEffect(() => {
    window.history.pushState({ modal: 'cikis' }, '');
    const onPop = () => onVazgec();
    window.addEventListener('popstate', onPop);
    const esc = (e) => { if (e.key === 'Escape') onVazgec(); };
    document.addEventListener('keydown', esc);
    return () => {
      window.removeEventListener('popstate', onPop);
      document.removeEventListener('keydown', esc);
    };
  }, [onVazgec]);

  return (
    <div className="com-overlay">
      <div ref={panelRef} className="com-panel">
        <div className="com-logo">
          <Pirlanta renk="mavi" boyut={18} />
          <span className="com-logo-yazi">GLAMWORLD</span>
          <Pirlanta renk="mavi" boyut={18} />
        </div>
        <h2 className="com-baslik">Çıkış Yap</h2>
        <p className="com-metin">
          {kullaniciAdi
            ? `Çıkış yapmak istiyor musun, ${kullaniciAdi}?`
            : 'Çıkış yapmak istiyor musun?'}
        </p>
        <div className="com-butonlar">
          <button className="com-vazgec" onClick={onVazgec}>Vazgeç</button>
          <button className="com-evet" onClick={onCikis}>Evet, Çıkış</button>
        </div>
      </div>
    </div>
  );
}
