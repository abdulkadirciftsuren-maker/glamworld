import { useLocation, useNavigate } from 'react-router-dom';
import Tooltip from './Tooltip';
import { AnasayfaIcon, PirlantaPazariIcon, TanismaIcon, CanliYayinIcon, HaritadaBulIcon, EgitimlerIcon } from '../icons';
import './IkonSeridi.css';

const IKONLAR = [
  { Icon: AnasayfaIcon,       renk: '#4A90E2', isim: 'Ana Sayfa',       yol: '/'               },
  { Icon: PirlantaPazariIcon, renk: '#FFD700', isim: 'Pırlanta Pazarı', yol: '/pirlanta-pazari' },
  { Icon: TanismaIcon,        renk: '#40E0D0', isim: 'Tanışma',         yol: '/tanisma'         },
  { Icon: CanliYayinIcon,     renk: '#9370DB', isim: 'Canlı Yayınlar',  yol: '/canli-yayinlar'  },
  { Icon: HaritadaBulIcon,    renk: '#4A90E2', isim: 'Haritada Bul',    yol: '/harita'          },
  { Icon: EgitimlerIcon,      renk: '#9ACD32', isim: 'Eğitimler',       yol: '/egitimler'       },
];

export default function IkonSeridi() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  if (pathname === '/giris' || pathname === '/uye-ol') return null;

  return (
    <div className="ikon-seridi">
      {IKONLAR.map(({ Icon, renk, isim, yol }) => {
        const aktif = pathname === yol;
        return (
          <Tooltip key={yol} text={isim} position="top">
            <button
              className={`is-btn${aktif ? ' aktif' : ''}`}
              style={{ '--ikon-renk': renk }}
              onClick={() => navigate(yol)}
            >
              <Icon size={28} color={renk} className="is-ikon" />
            </button>
          </Tooltip>
        );
      })}
    </div>
  );
}
