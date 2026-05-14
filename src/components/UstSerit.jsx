import { useState, useEffect } from 'react';
import Pirlanta from './Pirlanta';
import './UstSerit.css';

const ULKELER = {
  DE:{ ad:'Almanya',         sehir:'Berlin',        cc:'de', para:'EUR', tz:'Europe/Berlin' },
  GB:{ ad:'İngiltere',       sehir:'Londra',        cc:'gb', para:'GBP', tz:'Europe/London' },
  CH:{ ad:'İsviçre',         sehir:'Zürih',         cc:'ch', para:'CHF', tz:'Europe/Zurich' },
  RU:{ ad:'Rusya',           sehir:'Moskova',       cc:'ru', para:'RUB', tz:'Europe/Moscow' },
  UA:{ ad:'Ukrayna',         sehir:'Kiev',          cc:'ua', para:'UAH', tz:'Europe/Kiev' },
  TR:{ ad:'Türkiye',         sehir:'İstanbul',      cc:'tr', para:'TRY', tz:'Europe/Istanbul' },
  SA:{ ad:'S. Arabistan',    sehir:'Riyad',         cc:'sa', para:'SAR', tz:'Asia/Riyadh' },
  EG:{ ad:'Mısır',           sehir:'Kahire',        cc:'eg', para:'EGP', tz:'Africa/Cairo' },
  AE:{ ad:'BAE',             sehir:'Dubai',         cc:'ae', para:'AED', tz:'Asia/Dubai' },
  ZA:{ ad:'Güney Afrika',    sehir:'Johannesburg',  cc:'za', para:'ZAR', tz:'Africa/Johannesburg' },
  NG:{ ad:'Nijerya',         sehir:'Lagos',         cc:'ng', para:'NGN', tz:'Africa/Lagos' },
  MA:{ ad:'Fas',             sehir:'Kazablanka',    cc:'ma', para:'MAD', tz:'Africa/Casablanca' },
  US:{ ad:'ABD',             sehir:'New York',      cc:'us', para:'USD', tz:'America/New_York' },
  BR:{ ad:'Brezilya',        sehir:'São Paulo',     cc:'br', para:'BRL', tz:'America/Sao_Paulo' },
  AR:{ ad:'Arjantin',        sehir:'Buenos Aires',  cc:'ar', para:'ARS', tz:'America/Argentina/Buenos_Aires' },
  MX:{ ad:'Meksika',         sehir:'Mexico City',   cc:'mx', para:'MXN', tz:'America/Mexico_City' },
  CO:{ ad:'Kolombiya',       sehir:'Bogota',        cc:'co', para:'COP', tz:'America/Bogota' },
  JP:{ ad:'Japonya',         sehir:'Tokyo',         cc:'jp', para:'JPY', tz:'Asia/Tokyo' },
  CN:{ ad:'Çin',             sehir:'Pekin',         cc:'cn', para:'CNY', tz:'Asia/Shanghai' },
  HK:{ ad:'Hong Kong',       sehir:'Hong Kong',     cc:'hk', para:'HKD', tz:'Asia/Hong_Kong' },
  MY:{ ad:'Malezya',         sehir:'Kuala Lumpur',  cc:'my', para:'MYR', tz:'Asia/Kuala_Lumpur' },
  IN:{ ad:'Hindistan',       sehir:'Yeni Delhi',    cc:'in', para:'INR', tz:'Asia/Kolkata' },
  PK:{ ad:'Pakistan',        sehir:'İslamabad',     cc:'pk', para:'PKR', tz:'Asia/Karachi' },
  AU:{ ad:'Avustralya',      sehir:'Sydney',        cc:'au', para:'AUD', tz:'Australia/Sydney' },
};

function saatTz(tz) {
  return new Date().toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit', timeZone: tz });
}
function flag(cc) {
  return <img src={`https://flagcdn.com/16x12/${cc}.png`} alt={cc} className="t-flag" />;
}

export default function UstSerit() {
  const [saat, setSaat]     = useState(new Date());
  const [konum, setKonum]   = useState(null);
  const [kurlar, setKurlar] = useState(null);
  const [btc, setBtc]       = useState(null);
  const [dur, setDur]       = useState(false);

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

  const kulKod   = konum?.code || 'DE';
  const kulUlke  = ULKELER[kulKod] || ULKELER.DE;
  const bazPara  = kulUlke.para;
  const fmt      = (d) => d.toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit' });

  function kur(para) {
    if (!kurlar || !kurlar[para] || !kurlar[bazPara]) return '---';
    return (kurlar[para] / kurlar[bazPara]).toFixed(2);
  }

  const dovizler = Object.entries(ULKELER)
    .filter(([k, u]) => u.para !== bazPara)
    .map(([k, u]) => ({ cc: u.cc, para: u.para, deger: kur(u.para) }));

  const sehirler = Object.entries(ULKELER)
    .filter(([k]) => k !== kulKod)
    .map(([k, u]) => ({ cc: u.cc, sehir: u.sehir, tz: u.tz }));

  const items = [
    <span key="saat" className="t-item">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span className="t-beyaz">{fmt(saat)}</span>
    </span>,

    <span key="kullanici" className="t-item t-kullanici">
      <Pirlanta renk="mavi" boyut={12} />
      {flag(kulUlke.cc)}
      <span className="t-altin">{konum?.city || kulUlke.sehir}, {konum?.country || kulUlke.ad}</span>
      <span className="t-rozet">BURADASIN</span>
    </span>,

    ...dovizler.map(d => (
      <span key={`dov-${d.para}`} className="t-item">
        {flag(d.cc)}
        <span className="t-para-kod">{d.para}</span>
        <span className="t-altin">{d.deger}</span>
      </span>
    )),

    btc && <span key="btc" className="t-item">
      <span className="t-btc">BTC</span>
      <span className="t-btc-deger">${btc.toLocaleString()}</span>
    </span>,

    ...sehirler.map(s => (
      <span key={`s-${s.cc}`} className="t-item">
        {flag(s.cc)}
        <span className="t-altin">{s.sehir}</span>
        <span className="t-beyaz">{saatTz(s.tz)}</span>
      </span>
    )),
  ].filter(Boolean);

  return (
    <div className="ust-serit" onMouseEnter={() => setDur(true)} onMouseLeave={() => setDur(false)} onTouchStart={() => setDur(true)} onTouchEnd={() => setDur(false)}>
      <div className={`t-icerik${dur ? ' dur' : ''}`}>{items}{items}</div>
    </div>
  );
}
