import Pirlanta from './Pirlanta';
import Tooltip from './Tooltip';
import { auth } from '../firebase';
import './AnaMenu.css';

function HamburgerSvg() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <line x1="4" y1="7"  x2="24" y2="7"  stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="4" y1="14" x2="24" y2="14" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="4" y1="21" x2="24" y2="21" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
function AramaSvg({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
  );
}
function BildirimSvg({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}
function DilSvg({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function ProfilSvg({ size, foto }) {
  if (foto) return <img src={foto} alt="Profil" style={{ width: size, height: size, borderRadius: '50%', border: '1.5px solid #FFD700', objectFit: 'cover' }} />;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default function AnaMenu({ onMenuClick }) {
  const foto  = auth.currentUser?.photoURL || null;
  const giris = !!auth.currentUser;

  return (
    <header className="ana-menu">
      <div className="am-sol">
        <Tooltip text="Menü" position="bottom">
          <button className="am-btn" onClick={onMenuClick || (() => {})}>
            <HamburgerSvg />
          </button>
        </Tooltip>
      </div>

      <div className="am-orta">
        <Pirlanta renk="mavi" boyut={20} />
        <span className="am-logo">GLAMWORLD</span>
        <Pirlanta renk="mavi" boyut={20} />
      </div>

      <div className="am-sag">
        <Tooltip text="Ara" position="bottom">
          <button className="am-btn am-gizli-mobil"><AramaSvg size={22} /></button>
        </Tooltip>
        <Tooltip text="Bildirimler" position="bottom">
          <button className="am-btn am-gizli-mobil am-badge-wrap">
            <BildirimSvg size={22} />
            <span className="am-badge">0</span>
          </button>
        </Tooltip>
        <Tooltip text="Dil Seçimi" position="bottom">
          <button className="am-btn am-gizli-mobil"><DilSvg size={22} /></button>
        </Tooltip>
        <Tooltip text={giris ? 'Profilim' : 'Giriş Yap'} position="bottom">
          <button className="am-btn"><ProfilSvg size={24} foto={foto} /></button>
        </Tooltip>
      </div>
    </header>
  );
}
