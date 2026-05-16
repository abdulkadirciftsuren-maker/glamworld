import { useNavigate } from 'react-router-dom';
import Pirlanta from './Pirlanta';
import './HosGeldinKarti.css';

export default function HosGeldinKarti({ onMisafir }) {
  const navigate = useNavigate();

  const girisSayfasi = () => navigate('/giris');
  const uyeSayfasi  = () => navigate('/uye-ol');

  return (
    <div className="hgk-overlay">
      <div className="hgk-kart">
        <div className="hgk-logo">
          <Pirlanta renk="altin" boyut={24} />
          <span className="hgk-logo-yazi">GLAMWORLD</span>
          <Pirlanta renk="mavi" boyut={24} />
        </div>

        <h1 className="hgk-baslik">Hoş Geldin</h1>
        <p className="hgk-alt">Dünyanın en lüks güzellik platformu</p>

        <button className="hgk-uye" onClick={uyeSayfasi} aria-label="Üye Ol">
          Üye Ol
        </button>

        <button className="hgk-giris" onClick={girisSayfasi} aria-label="Giriş Yap">
          Giriş Yap
        </button>

        <div className="hgk-ayrac" />

        <button className="hgk-misafir" onClick={onMisafir} aria-label="Misafir olarak keşfet">
          Misafir Olarak Keşfet
        </button>
      </div>
    </div>
  );
}
