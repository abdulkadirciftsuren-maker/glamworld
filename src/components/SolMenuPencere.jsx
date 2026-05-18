import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Pirlanta from './Pirlanta';
import CikisIkonu from '../icons/CikisIkonu';
import CikisOnayModal from './CikisOnayModal';
import { useKartDisiTiklama } from '../hooks/useKartDisiTiklama';
import './SolMenuPencere.css';

const MENU_MADDELERI = [
  { isim: 'Ana Sayfa',    yol: '/'           },
  { isim: 'Keşfet',       yol: '/kesfet'     },
  { isim: 'Berberler',    yol: '/berberler'  },
  { isim: 'Kuaförler',    yol: '/kuaforler'  },
  { isim: 'Makyaj',       yol: '/makyaj'     },
  { isim: 'Masaj',        yol: '/masaj'      },
  { isim: 'Tırnak',       yol: '/tirnak'     },
  { isim: 'Cilt Bakım',   yol: '/cilt-bakim' },
  { isim: 'Haritada Bul', yol: '/harita'     },
  { isim: 'Eğitimler',    yol: '/egitimler'  },
  { isim: 'Ayarlar',      yol: '/ayarlar'    },
  { isim: 'Yardım',       yol: '/yardim'     },
];

export default function SolMenuPencere({ acik, onKapat, kullanici }) {
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const [cikisAcik, setCikisAcik] = useState(false);

  const girisYapildi = !!kullanici;
  const cikisGorunsun = girisYapildi;
  const kullaniciAdi = kullanici?.displayName || '';

  const cikisYap = async () => {
    try { await signOut(auth); } catch {}
    sessionStorage.clear();
    window.location.href = '/glamworld/';
  };

  useKartDisiTiklama(panelRef, onKapat, acik);

  useEffect(() => {
    if (!acik) return;
    window.history.pushState({ modal: 'solmenu' }, '');
    const onPop = () => onKapat();
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [acik, onKapat]);

  useEffect(() => {
    if (!acik) return;
    const esc = (e) => { if (e.key === 'Escape') onKapat(); };
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [acik, onKapat]);

  useEffect(() => {
    document.body.style.overflow = acik ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [acik]);

  const git = (yol) => { navigate(yol); onKapat(); };

  return (
    <div className={`smp-overlay${acik ? ' acik' : ''}`} onClick={onKapat}>
      <div ref={panelRef} className={`smp-panel${acik ? ' acik' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="smp-ust">
          <div className="smp-logo">
            <Pirlanta renk="mavi" boyut={16} />
            <span className="smp-logo-yazi">GLAMWORLD</span>
            <Pirlanta renk="mavi" boyut={16} />
          </div>
          <button className="smp-kapat" onClick={onKapat}>✕</button>
        </div>
        <div className="smp-kullanici">
          <span className="smp-misafir">Misafir Kullanıcı</span>
          <div className="smp-auth-butonlar">
            <button className="smp-giris" onClick={() => git('/giris')}>Giriş Yap</button>
            <button className="smp-uye" onClick={() => git('/uye-ol')}>Üye Ol</button>
          </div>
        </div>
        <div className="smp-ayrac" />
        <nav className="smp-nav">
          {MENU_MADDELERI.map(({ isim, yol }) => (
            <button key={yol} className="smp-madde" onClick={() => git(yol)}>
              <Pirlanta renk="mavi" boyut={10} />
              <span>{isim}</span>
            </button>
          ))}
        </nav>
        {cikisGorunsun && (
          <button className="smp-cikis" onClick={() => setCikisAcik(true)}>
            <CikisIkonu color="#FF4444" size={16} />
            <span>Çıkış Yap</span>
          </button>
        )}
        <div className="smp-alt">GLAMWORLD V2 · Dünyanın Platformu</div>
      </div>
      {cikisAcik && (
        <CikisOnayModal
          kullaniciAdi={kullaniciAdi}
          onVazgec={() => setCikisAcik(false)}
          onCikis={cikisYap}
        />
      )}
    </div>
  );
}
