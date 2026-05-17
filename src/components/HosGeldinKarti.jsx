import { useNavigate } from 'react-router-dom';
import Pirlanta from './Pirlanta';
import AltinTozAtmosfer from './AltinTozAtmosfer';
import './HosGeldinKarti.css';

export default function HosGeldinKarti({ onKapat }) {
  const navigate = useNavigate();

  const gitGiris = () => { onKapat(); navigate('/giris'); };
  const gitUyeOl = () => { onKapat(); navigate('/uye-ol'); };

  return (
    <div className="hgk-overlay">
      <AltinTozAtmosfer />
      <div className="hgk-kart">
        <div className="hgk-logo">
          <Pirlanta renk="altin" boyut={26} />
          <h1 className="hgk-logo-yazi">GLAMWORLD</h1>
          <Pirlanta renk="mavi" boyut={26} />
        </div>
        <h2 className="hgk-baslik">Hoş Geldin</h2>
        <p className="hgk-alt">Dünyanın en lüks güzellik platformu</p>
        <button className="hgk-btn hgk-uye-ol" onClick={gitUyeOl}>
          Üye Ol
        </button>
        <button className="hgk-btn hgk-giris" onClick={gitGiris}>
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
