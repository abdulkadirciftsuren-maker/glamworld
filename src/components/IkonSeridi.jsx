import { useLocation } from 'react-router-dom';
import Tooltip from './Tooltip';
import { AnasayfaIcon, PirlantaPazariIcon, TanismaIcon, CanliYayinIcon, HaritadaBulIcon, EgitimlerIcon } from '../icons';
import './IkonSeridi.css';

const IKONLAR = [
  { Icon: AnasayfaIcon,       renk: '#4A90E2', isim: 'Ana Sayfa',        yol: null,               menuAc: true  },
  { Icon: PirlantaPazariIcon, renk: '#FFD700', isim: 'Pırlanta Pazarı',  yol: '/pirlanta-pazari', menuAc: false },
  { Icon: TanismaIcon,        renk: '#40E0D0', isim: 'Tanışma',          yol: '/tanisma',         menuAc: false },
  { Icon: CanliYayinIcon,     renk: '#9370DB', isim: 'Canlı Yayınlar',   yol: '/canli-yayinlar',  menuAc: false },
  { Icon: HaritadaBulIcon,    renk: '#4A90E2', isim: 'Haritada Bul',     yol: '/harita',          menuAc: false },
  { Icon: EgitimlerIcon,      renk: '#9ACD32', isim: 'Eğitimler',        yol: '/egitimler',       menuAc: false },
];

export default function IkonSeridi({ onMenuAc }) {
  const { pathname } = useLocation();
  if (pathname === '/giris' || pathname === '/uye-ol') return null;

  return (
    <div className="ikon-seridi">
      {IKONLAR.map(({ Icon, renk, isim, yol, menuAc }) => (
        <Tooltip key={isim} text={isim} position="bottom">
          <button
            className="is-btn"
            style={{ '--ikon-renk': renk }}
            onClick={() => { if (menuAc && onMenuAc) onMenuAc(); }}
          >
            <Icon size={28} color={renk} className="is-ikon" />
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
