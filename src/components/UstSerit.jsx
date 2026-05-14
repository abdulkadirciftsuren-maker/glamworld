import { useState, useEffect, useRef } from 'react';
import './UstSerit.css';

const SEHIRLER = [
  { isim: 'Berlin',    cc: 'de', ofset: 1 },
  { isim: 'İstanbul', cc: 'tr', ofset: 3 },
  { isim: 'New York', cc: 'us', ofset: -5 },
  { isim: 'London',   cc: 'gb', ofset: 0 },
  { isim: 'Tokyo',    cc: 'jp', ofset: 9 },
];

function sehirSaati(ofset) {
  const simdi = new Date();
  const utc = simdi.getTime() + simdi.getTimezoneOffset() * 60000;
  const yerel = new Date(utc + ofset * 3600000);
  return yerel.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

function bayrak(cc) {
  return <img src={`https://flagcdn.com/16x12/${cc}.png`} alt={cc} className="ticker-flag" />;
}

export default function UstSerit() {
  const [saat, setSaat] = useState(() => new Date());
  const [konum, setKonum] = useState(null);
  const [kurlar, setKurlar] = useState(null);
  const [btc, setBtc] = useState(null);
  const [duraklatildi, setDuraklatildi] = useState(false);
  const dokunmaRef = useRef(false);

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
        const loc = { city: d.city, country: d.country_name, cc: d.country_code?.toLowerCase() };
        setKonum(loc);
        localStorage.setItem('glamworld_user_location', JSON.stringify({ location: loc, timestamp: Date.now() }));
      })
      .catch(() => setKonum({ city: 'Berlin', country: 'Almanya', cc: 'de' }));
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

  const fmt = (d) => d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  const try_ = kurlar?.TRY;
  const eur_ = kurlar?.EUR;
  const gbp_ = kurlar?.GBP;

  const items = [
    <span key="saat" className="ticker-item">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      {fmt(saat)}
    </span>,
    konum && <span key="konum" className="ticker-item">
      {bayrak(konum.cc)}{konum.city}, {konum.country}
    </span>,
    try_ && <span key="usd" className="ticker-item">USD/TRY <b>{try_.toFixed(2)}</b></span>,
    try_ && eur_ && <span key="eur" className="ticker-item">EUR/TRY <b>{(try_ / eur_).toFixed(2)}</b></span>,
    try_ && gbp_ && <span key="gbp" className="ticker-item">GBP/TRY <b>{(try_ / gbp_).toFixed(2)}</b></span>,
    btc && <span key="btc" className="ticker-item">BTC <b>${btc.toLocaleString()}</b></span>,
    ...SEHIRLER.map(s => (
      <span key={s.isim} className="ticker-item">
        {bayrak(s.cc)}{s.isim} {sehirSaati(s.ofset)}
      </span>
    )),
  ].filter(Boolean);

  return (
    <div
      className="ust-serit"
      onMouseEnter={() => setDuraklatildi(true)}
      onMouseLeave={() => setDuraklatildi(false)}
      onTouchStart={() => { dokunmaRef.current = true; setDuraklatildi(true); }}
      onTouchEnd={() => { dokunmaRef.current = false; setDuraklatildi(false); }}
    >
      <div className={`ticker-icerik${duraklatildi ? ' dur' : ''}`}>
        {items}{items}
      </div>
    </div>
  );
}
