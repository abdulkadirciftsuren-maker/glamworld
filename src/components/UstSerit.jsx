import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pirlanta from './Pirlanta';
import './UstSerit.css';

const ULKELER = {
  DE:{ ad:'Almanya',    sehir:'Berlin',    cc:'de', para:'EUR', tz:'Europe/Berlin' },
  TR:{ ad:'Türkiye',    sehir:'İstanbul',  cc:'tr', para:'TRY', tz:'Europe/Istanbul' },
  US:{ ad:'ABD',        sehir:'New York',  cc:'us', para:'USD', tz:'America/New_York' },
  GB:{ ad:'İngiltere',  sehir:'Londra',    cc:'gb', para:'GBP', tz:'Europe/London' },
  CH:{ ad:'İsviçre',    sehir:'Zürih',     cc:'ch', para:'CHF', tz:'Europe/Zurich' },
};

function saatTz(tz) {
  return new Date().toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit', timeZone: tz });
}
function flag(cc) {
  return <img src={`https://flagcdn.com/16x12/${cc}.png`} alt={cc} className="t-flag" />;
}

export default function UstSerit() {
  const { pathname } = useLocation();
  const [saat, setSaat]     = useState(new Date());
  const [konum, setKonum]   = useState(null);
  const [kurlar, setKurlar] = useState(null);
  const [btc, setBtc]       = useState(null);
  const [dur, setDur]       = useState(false);
  const altin = 2580;
  const gumus = 29;

  useEffect(() => {
    const id = setInterval(() => setSaat(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const cache = localStorage.getItem('glamworld_user_location');
    if (cache) {
      const { location, timestamp } = JSON.parse(cache);
      if (Date.now() - timestamp < 86400000) { setKonum(location); return; }
    }
    fetch('https://ipapi.co/json/')
      .then(r => r.json())
      .then(d => {
        const loc = { city: d.city, country: d.country_name, code: (d.country_code || 'DE').toUpperCase() };
        setKonum(loc);
        localStorage.setItem('glamworld_user_location', JSON.stringify({ location: loc, timestamp: Date.now() }));
      })
      .catch(() => setKonum({ city:'Berlin', country:'Almanya', code:'DE' }));
  }, []);

  useEffect(() => {
    const cache = localStorage.getItem('glamworld_exchange_rates');
    if (cache) {
      const { rates, timestamp } = JSON.parse(cache);
      if (Date.now() - timestamp < 1800000) { setKurlar(rates); return; }
    }
    fetch('https://open.er-api.com/v6/latest/USD')
      .then(r => r.json())
      .then(d => {
        setKurlar(d.rates);
        localStorage.setItem('glamworld_exchange_rates', JSON.stringify({ rates: d.rates, timestamp: Date.now() }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(r => r.json())
      .then(d => setBtc(d.bitcoin?.usd))
      .catch(() => {});
  }, []);

  if (pathname !== '/') return null;

  const kulKod  = konum?.code || 'DE';
  const kulUlke = ULKELER[kulKod] || ULKELER.DE;
  const bazPara = kulUlke.para;
  const fmt     = d => d.toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit' });

  function kur(para) {
    if (!kurlar?.[para] || !kurlar?.[bazPara]) return '---';
    return (kurlar[para] / kurlar[bazPara]).toFixed(2);
  }

  function blok(p) {
    return [
      <span key={`${p}bd`} className="t-item t-kullanici">
        <Pirlanta renk="mavi" boyut={12} />
        {flag(kulUlke.cc)}
        <span className="t-altin">{konum?.city || kulUlke.sehir}</span>
        <span className="t-rozet">BURADASIN</span>
      </span>,
      <span key={`${p}st`} className="t-item t-saat">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span className="t-altin">{fmt(saat)}</span>
      </span>,
      <span key={`${p}us`} className="t-item"><span className="t-label">USD</span><span className="t-altin">{kur('USD')}</span></span>,
      <span key={`${p}eu`} className="t-item"><span className="t-label">EUR</span><span className="t-altin">{kur('EUR')}</span></span>,
      <span key={`${p}gb`} className="t-item"><span className="t-label">GBP</span><span className="t-altin">{kur('GBP')}</span></span>,
      <span key={`${p}al`} className="t-item"><span className="t-label">ALTIN</span><span className="t-altin">${altin}</span></span>,
      <span key={`${p}gm`} className="t-item"><span className="t-label">GÜMÜŞ</span><span className="t-beyaz">${gumus}</span></span>,
      btc ? <span key={`${p}bt`} className="t-item"><span className="t-label">BTC</span><span className="t-btc">${Math.round(btc/1000)}K</span></span> : null,
    ].filter(Boolean);
  }

  const ulkeler = Object.entries(ULKELER).map(([k, u]) => (
    <span key={`u-${k}`} className="t-item t-ulke">
      {flag(u.cc)}
      <span className="t-altin">{u.sehir}</span>
      <span className="t-beyaz">{saatTz(u.tz)}</span>
      <span className="t-kur">1 {bazPara}={kur(u.para)} {u.para}</span>
    </span>
  ));

  const items = [
    ...blok('a'),
    ulkeler[0], ulkeler[1],
    ...blok('b'),
    ulkeler[2], ulkeler[3],
    ...blok('c'),
    ulkeler[4],
  ];

  return (
    <div className="ust-serit"
      onMouseEnter={() => setDur(true)}
      onMouseLeave={() => setDur(false)}
      onTouchStart={() => setDur(true)}
      onTouchEnd={() => setDur(false)}
    >
      <div className={`t-icerik${dur ? ' dur' : ''}`}>{items}{items}</div>
    </div>
  );
}
