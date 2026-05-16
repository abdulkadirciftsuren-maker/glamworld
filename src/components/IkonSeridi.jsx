import { useLocation, useNavigate } from 'react-router-dom';
import Pirlanta from './Pirlanta';
import AltinImza from './AltinImza';
import { AnasayfaIcon, PirlantaPazariIcon, TanismaIcon, CanliYayinIcon, HaritadaBulIcon, EgitimlerIcon, PrlErkekIkon, PrlKadinIkon, PrlTarafsizIkon, PrlMusteriIkon } from '../icons';
import { profilIkonuSec, profilRotasiSec } from '../utils/kullaniciProfili';
import './IkonSeridi.css';

const IKONLAR_SABIT = [
  { Icon: AnasayfaIcon,       renk:'#4A90E2', zemin:'rgba(74,144,226,0.18)',  isim:'Ana Sayfa',       yol:'/'               },
  { Icon: PirlantaPazariIcon, renk:'#FFD700', zemin:'rgba(255,215,0,0.18)',   isim:'Pırlanta Pazarı', yol:'/pirlanta-pazari' },
  { Icon: TanismaIcon,        renk:'#FFD700', zemin:'rgba(64,224,208,0.18)',  isim:'Tanışma',         yol:'/tanisma'         },
  { Icon: CanliYayinIcon,     renk:'#FFD700', zemin:'rgba(147,112,219,0.18)', isim:'Canlı Yayınlar',  yol:'/canli-yayinlar'  },
  { Icon: HaritadaBulIcon,    renk:'#FFD700', zemin:'rgba(74,144,226,0.18)',  isim:'Haritada Bul',    yol:'/harita'          },
  { Icon: EgitimlerIcon,      renk:'#FFD700', zemin:'rgba(154,205,50,0.18)',  isim:'Eğitimler',       yol:'/egitimler'       },
];

const PROFIL_IKONLARI = {
  musteri:  PrlMusteriIkon,
  erkek:    PrlErkekIkon,
  kadin:    PrlKadinIkon,
  tarafsiz: PrlTarafsizIkon,
};

export default function IkonSeridi({ kullaniciProfili }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const profil = kullaniciProfili || { hesapTuru: 'musteri', cinsiyet: 'tarafsiz' };
  const profilTipi = profilIkonuSec(profil);
  const profilRota = profilRotasiSec(profil);
  const ProfilIcon = PROFIL_IKONLARI[profilTipi];

  const profilIkon = {
    Icon: ProfilIcon,
    renk: '#FFFFFF',
    zemin: 'linear-gradient(135deg, #9F1239, #4C0519)',
    isim: 'Profilim',
    yol: profilRota,
  };

  const ikonlar = [profilIkon, ...IKONLAR_SABIT];

  return (
    <div className="is-serit">
      {ikonlar.map(({ Icon, renk, zemin, isim, yol }) => {
        const aktif = pathname === yol || (yol !== '/' && pathname.startsWith(yol));
        return (
          <button
            key={yol}
            aria-label={isim}
            className={`is-btn${aktif ? ' aktif' : ''}${isim === 'Profilim' ? ' is-profilim' : ''}`}
            style={{ '--zemin': zemin, '--renk': renk }}
            onClick={() => navigate(yol)}
          >
            <span className="is-ikon-wrap">
              <Icon size={22} color={renk} />
              <span className="is-pirlanta"><Pirlanta renk="mavi" boyut={8} /></span>
            </span>
            {aktif && <AltinImza text={isim} />}
          </button>
        );
      })}
    </div>
  );
}
