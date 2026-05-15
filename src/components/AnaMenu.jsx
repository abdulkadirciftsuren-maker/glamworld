import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
function AramaSvg({ s }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" /></svg>;
}
function BildirimSvg({ s }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
}
function DilSvg({ s }) {
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>;
}
function ProfilSvg({ s, foto }) {
  if (foto) return <img src={foto} alt="P" style={{ width:s, height:s, borderRadius:'50%', border:'1.5px solid #FFD700', objectFit:'cover' }} />;
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
}

const LOGO_HARFLER = ['G','L','A','M','W','O','R','L','D'];

export default function AnaMenu({ onMenuClick }) {
  const { pathname } = useLocation();
  const foto    = auth.currentUser?.photoURL || null;
  const giris   = !!auth.currentUser;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  if (pathname === '/giris' || pathname === '/uye-ol') return null;

  return (
    <header className={`ana-menu${scrolled ? ' scrolled' : ''}`}>
      <div className="am-sol">
        <Tooltip text="Menü" position="right">
          <button className="am-btn" onClick={onMenuClick || (() => {})}>
            <HamburgerSvg />
          </button>
        </Tooltip>
      </div>

      <div className="am-orta">
        <div className="am-deko am-deko-sol">
          <div className="am-deko-cizgi" />
          <svg width="10" height="10" viewBox="0 0 10 10" className="am-deko-elmas"><polygon points="5,0 10,5 5,10 0,5" fill="none" stroke="#4A90E2" strokeWidth="1.2" /><polygon points="5,2 8,5 5,8 2,5" fill="rgba(74,144,226,0.35)" stroke="none" /></svg>
          <div className="am-pirlanta-wrap"><Pirlanta renk="mavi" boyut={20} /></div>
          <svg width="10" height="10" viewBox="0 0 10 10" className="am-deko-elmas"><polygon points="5,0 10,5 5,10 0,5" fill="none" stroke="#4A90E2" strokeWidth="1.2" /><polygon points="5,2 8,5 5,8 2,5" fill="rgba(74,144,226,0.35)" stroke="none" /></svg>
        </div>
        <span className="am-logo">
          {LOGO_HARFLER.map((h, i) => (
            <span key={i} className={`am-harf${h === 'W' ? ' am-w' : ''}`}>{h}</span>
          ))}
        </span>
        <div className="am-deko am-deko-sag">
          <svg width="10" height="10" viewBox="0 0 10 10" className="am-deko-elmas"><polygon points="5,0 10,5 5,10 0,5" fill="none" stroke="#4A90E2" strokeWidth="1.2" /><polygon points="5,2 8,5 5,8 2,5" fill="rgba(74,144,226,0.35)" stroke="none" /></svg>
          <div className="am-pirlanta-wrap"><Pirlanta renk="mavi" boyut={20} /></div>
          <svg width="10" height="10" viewBox="0 0 10 10" className="am-deko-elmas"><polygon points="5,0 10,5 5,10 0,5" fill="none" stroke="#4A90E2" strokeWidth="1.2" /><polygon points="5,2 8,5 5,8 2,5" fill="rgba(74,144,226,0.35)" stroke="none" /></svg>
          <div className="am-deko-cizgi" />
        </div>
      </div>

      <div className="am-sag">
        <Tooltip text="Ara" position="bottom">
          <button className="am-btn am-extra"><AramaSvg s={22} /></button>
        </Tooltip>
        <Tooltip text="Bildirimler" position="bottom">
          <button className="am-btn am-extra am-badge-wrap">
            <BildirimSvg s={22} />
            <span className="am-badge">0</span>
          </button>
        </Tooltip>
        <Tooltip text="Dil Seçimi" position="bottom">
          <button className="am-btn am-extra"><DilSvg s={22} /></button>
        </Tooltip>
        <Tooltip text={giris ? 'Profilim' : 'Giriş Yap'} position="bottom">
          <button className="am-btn"><ProfilSvg s={24} foto={foto} /></button>
        </Tooltip>
      </div>
    </header>
  );
}
