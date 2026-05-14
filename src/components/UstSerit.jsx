import { useState, useEffect } from 'react';
import Pirlanta from './Pirlanta';
import './UstSerit.css';

const ULKELER = {
  DE: { ad:'Almanya',          sehir:'Berlin',       cc:'de', para:'EUR', tz:'Europe/Berlin' },
  TR: { ad:'Türkiye',          sehir:'İstanbul',     cc:'tr', para:'TRY', tz:'Europe/Istanbul' },
  US: { ad:'ABD',              sehir:'New York',     cc:'us', para:'USD', tz:'America/New_York' },
  GB: { ad:'İngiltere',        sehir:'Londra',       cc:'gb', para:'GBP', tz:'Europe/London' },
  CH: { ad:'İsviçre',          sehir:'Zürih',        cc:'ch', para:'CHF', tz:'Europe/Zurich' },
  RU: { ad:'Rusya',            sehir:'Moskova',      cc:'ru', para:'RUB', tz:'Europe/Moscow' },
  UA: { ad:'Ukrayna',          sehir:'Kiev',         cc:'ua', para:'UAH', tz:'Europe/Kiev' },
  SA: { ad:'Suudi Arabistan',  sehir:'Riyad',        cc:'sa', para:'SAR', tz:'Asia/Riyadh' },
  EG: { ad:'Mısır',            sehir:'Kahire',       cc:'eg', para:'EGP', tz:'Africa/Cairo' },
  AE: { ad:'BAE',              sehir:'Dubai',        cc:'ae', para:'AED', tz:'Asia/Dubai' },
  JP: { ad:'Japonya',          sehir:'Tokyo',        cc:'jp', para:'JPY', tz:'Asia/Tokyo' },
  CN: { ad:'Çin',              sehir:'Pekin',        cc:'cn', para:'CNY', tz:'Asia/Shanghai' },
  HK: { ad:'Hong Kong',        sehir:'Hong Kong',    cc:'hk', para:'HKD', tz:'Asia/Hong_Kong' },
  MY: { ad:'Malezya',          sehir:'Kuala Lumpur', cc:'my', para:'MYR', tz:'Asia/Kuala_Lumpur' },
  IN: { ad:'Hindistan',        sehir:'Yeni Delhi',   cc:'in', para:'INR', tz:'Asia/Kolkata' },
  PK: { ad:'Pakistan',         sehir:'İslamabad',    cc:'pk', para:'PKR', tz:'Asia/Karachi' },
};

function saatTz(tz) {
  return new Date().toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit', timeZone: tz });
}

function bayrak(cc) {
  return <img src={`https://flagcdn.com/16x12/${cc}.png`} alt={cc} className="t-flag" />;
}

export default function UstSerit() {
  const [saat, setSaat] = useState(new Date());
  const [konum, setKonum] = useState(null);
  const [kurlar, setKurlar] = useState(null);
  const [btc, setBtc] = useState(null);
  const [dur, setDur] = useState(false);

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
        const loc = { city: d.city, country: d.country_name, code: d.country_code?.toUpperCase() || 'DE' };
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

  const kulKod = konum?.code || 'DE';
  const kulUlke = ULKELER[kulKod] || ULKELER.DE;
  const bazPara = kulUlke.para;

  function doviz(kaynak, hedef) {
    if (!kurlar) return '---';
    const r = kurlar[kaynak] && kurlar[hedef]
      ? (kurlar[hedef] / kurlar[kaynak]).toFixed(2)
      : '---';
    return r;
  }

  const dovizCiftleri = bazPara === 'TRY'
    ? [['USD','TRY'],['EUR','TRY'],['GBP','TRY'],['JPY','TRY'],['CHF','TRY']]
    : bazPara === 'USD'
    ? [['USD','EUR'],['USD','GBP'],['USD','TRY'],['USD','JPY'],['USD','CHF']]
    : [['USD',bazPara],['EUR',bazPara],['GBP',bazPara],['TRY',bazPara],['JPY',bazPara]];

  const fmt = (d) => d.toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit' });

  const items = [
    <span key="saat" className="t-item">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span className="t-beyaz">{fmt(saat)}</span>
    </span>,

    <span key="kullanici" className="t-item t-kullanici">
      <Pirlanta renk="mavi" boyut={12} />
      {bayrak(kulUlke.cc)}
      <span className="t-altin">{konum?.city || kulUlke.sehir}, {konum?.country || kulUlke.ad}</span>
      <span className="t-rozet">BURADASIN</span>
    </span>,

    ...dovizCiftleri.map(([k, h]) => (
      <span key={`${k}${h}`} className="t-item">
        <span className="t-gri">{k}/{h}</span>
        <span className="t-altin">{doviz(k, h)}</span>
      </span>
    )),

    btc && <span key="btc" className="t-item">
      <span className="t-btc">BTC</span>
      <span className="t-btc-deger">${btc.toLocaleString()}</span>
    </span>,

    ...Object.entries(ULKELER)
      .filter(([k]) => k !== kulKod)
      .map(([k, u]) => (
        <span key={`tz-${k}`} className="t-item">
          {bayrak(u.cc)}
          <span className="t-altin">{u.sehir}</span>
          <span className="t-beyaz">{saatTz(u.tz)}</span>
        </span>
      )),
  ].filter(Boolean);

  return (
    <div
      className="ust-serit"
      onMouseEnter={() => setDur(true)}
      onMouseLeave={() => setDur(false)}
      onTouchStart={() => setDur(true)}
      onTouchEnd={() => setDur(false)}
    >
      <div className={`t-icerik${dur ? ' dur' : ''}`}>
        {items}{items}
      </div>
    </div>
  );
}
