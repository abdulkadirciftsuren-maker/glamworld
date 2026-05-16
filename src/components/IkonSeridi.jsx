import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Tooltip from './Tooltip';
import Pirlanta from './Pirlanta';
import { AnasayfaIcon, PirlantaPazariIcon, TanismaIcon, CanliYayinIcon, HaritadaBulIcon, EgitimlerIcon } from '../icons';
import './IkonSeridi.css';

const IKONLAR = [
  { Icon: AnasayfaIcon,       renk:'#4A90E2', zemin:'rgba(74,144,226,0.18)',  isim:'Ana Sayfa',       yol:'/'               },
  { Icon: PirlantaPazariIcon, renk:'#FFD700', zemin:'rgba(255,215,0,0.18)',   isim:'Pırlanta Pazarı', yol:'/pirlanta-pazari' },
  { Icon: TanismaIcon,        renk:'#FFD700', zemin:'rgba(64,224,208,0.18)',  isim:'Tanışma',         yol:'/tanisma'         },
  { Icon: CanliYayinIcon,     renk:'#FFD700', zemin:'rgba(147,112,219,0.18)', isim:'Canlı Yayınlar',  yol:'/canli-yayinlar'  },
  { Icon: HaritadaBulIcon,    renk:'#FFD700', zemin:'rgba(74,144,226,0.18)',  isim:'Haritada Bul',    yol:'/harita'          },
  { Icon: EgitimlerIcon,      renk:'#FFD700', zemin:'rgba(154,205,50,0.18)',  isim:'Eğitimler',       yol:'/egitimler'       },
];

export default function IkonSeridi() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [tipKey, setTipKey] = useState(0);

  useEffect(() => {
    setTipKey(k => k + 1);
    if (document.activeElement?.blur) document.activeElement.blur();
  }, [pathname]);

  const git = (yol, e) => {
    if (e?.currentTarget?.blur) e.currentTarget.blur();
    setTipKey(k => k + 1);
    navigate(yol);
  };

  return (
    <div className="is-serit">
      {IKONLAR.map(({ Icon, renk, zemin, isim, yol }) => {
        const aktif = pathname === yol;
        return (
          <Tooltip key={`${yol}-${tipKey}`} text={isim} position="top">
            <button
              className={`is-btn${aktif ? ' aktif' : ''}`}
              style={{ '--zemin': zemin, '--renk': renk }}
              onClick={(e) => git(yol, e)}
            >
              <span className="is-ikon-wrap">
                <Icon size={22} color={renk} />
                <span className="is-pirlanta"><Pirlanta renk="mavi" boyut={8} /></span>
              </span>
              <span className="is-yazi">{isim}</span>
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}
