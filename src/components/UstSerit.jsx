import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Pirlanta from './Pirlanta';
import './UstSerit.css';

const ULKELER = {
  DE:{ ad:'Almanya',        sehir:'Berlin',        cc:'de', para:'EUR', tz:'Europe/Berlin' },
  TR:{ ad:'Türkiye',        sehir:'İstanbul',      cc:'tr', para:'TRY', tz:'Europe/Istanbul' },
  US:{ ad:'ABD',            sehir:'New York',      cc:'us', para:'USD', tz:'America/New_York' },
  GB:{ ad:'İngiltere',      sehir:'Londra',        cc:'gb', para:'GBP', tz:'Europe/London' },
  CH:{ ad:'İsviçre',        sehir:'Zürih',         cc:'ch', para:'CHF', tz:'Europe/Zurich' },
  RU:{ ad:'Rusya',          sehir:'Moskova',       cc:'ru', para:'RUB', tz:'Europe/Moscow' },
  UA:{ ad:'Ukrayna',        sehir:'Kiev',          cc:'ua', para:'UAH', tz:'Europe/Kiev' },
  SA:{ ad:'S. Arabistan',   sehir:'Riyad',         cc:'sa', para:'SAR', tz:'Asia/Riyadh' },
  AE:{ ad:'BAE',            sehir:'Dubai',         cc:'ae', para:'AED', tz:'Asia/Dubai' },
  EG:{ ad:'Mısır',          sehir:'Kahire',        cc:'eg', para:'EGP', tz:'Africa/Cairo' },
  ZA:{ ad:'Güney Afrika',   sehir:'Johannesburg',  cc:'za', para:'ZAR', tz:'Africa/Johannesburg' },
  NG:{ ad:'Nijerya',        sehir:'Lagos',         cc:'ng', para:'NGN', tz:'Africa/Lagos' },
  MA:{ ad:'Fas',            sehir:'Kazablanka',    cc:'ma', para:'MAD', tz:'Africa/Casablanca' },
  BR:{ ad:'Brezilya',       sehir:'São Paulo',     cc:'br', para:'BRL', tz:'America/Sao_Paulo' },
  AR:{ ad:'Arjantin',       sehir:'Buenos Aires',  cc:'ar', para:'ARS', tz:'America/Argentina/Buenos_Aires' },
  MX:{ ad:'Meksika',        sehir:'Mexico City',   cc:'mx', para:'MXN', tz:'America/Mexico_City' },
  CO:{ ad:'Kolombiya',      sehir:'Bogota',        cc:'co', para:'COP', tz:'America/Bogota' },
  JP:{ ad:'Japonya',        sehir:'Tokyo',         cc:'jp', para:'JPY', tz:'Asia/Tokyo' },
  CN:{ ad:'Çin',            sehir:'Pekin',         cc:'cn', para:'CNY', tz:'Asia/Shanghai' },
  HK:{ ad:'Hong Kong',      sehir:'Hong Kong',     cc:'hk', para:'HKD', tz:'Asia/Hong_Kong' },
  MY:{ ad:'Malezya',        sehir:'Kuala Lumpur',  cc:'my', para:'MYR', tz:'Asia/Kuala_Lumpur' },
  IN:{ ad:'Hindistan',      sehir:'Yeni Delhi',    cc:'in', para:'INR', tz:'Asia/Kolkata' },
  PK:{ ad:'Pakistan',       sehir:'İslamabad',     cc:'pk', para:'PKR', tz:'Asia/Karachi' },
  AU:{ ad:'Avustralya',     sehir:'Sydney',        cc:'au', para:'AUD', tz:'Australia/Sydney' },
};

const GRUPLAR = [
  ['DE','TR','US','GB','CH'],
  ['RU','UA','SA','AE','EG'],
  ['ZA','NG','MA','BR','AR'],
  ['MX','CO','JP','CN','HK'],
  ['MY','IN','PK','AU'],
];

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
  const [eth, setEth]       = useState(null);
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
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd')
      .then(r => r.json())
      .then(d => { setBtc(d.bitcoin?.usd); setEth(d.ethereum?.usd); })
      .catch(() => {});
  }, []);

  if (pathname === '/giris' || pathname === '/uye-ol') return null;

  const kulKod  = konum?.code || 'DE';
  const kulUlke = ULKELER[kulKod] || ULKELER.DE;
  const bazPara = kulUlke.para;
  const fmt     = (d) => d.toLocaleTimeString('tr-TR', { hour:'2-digit', minute:'2-digit' });

  function kur(para) {
    if (!kurlar?.[para] || !kurlar?.[bazPara]) return '---';
    return (kurlar[para] / kurlar[bazPara]).toFixed(2);
  }

  function araDoviz(prefix) {
    return [
      <span key={`${prefix}-usd`} className="t-item"><span className="t-para-kod">USD/{bazPara}</span><span className="t-altin">{kur('USD')}</span></span>,
      <span key={`${prefix}-eur`} className="t-item"><span className="t-para-kod">EUR/{bazPara}</span><span className="t-altin">{kur('EUR')}</span></span>,
      <span key={`${prefix}-altin`} className="t-item"><span className="t-altin-label">ALTIN</span><span className="t-altin">${altin}</span></span>,
      <span key={`${prefix}-gumus`} className="t-item"><span className="t-gumus-label">GÜMÜŞ</span><span className="t-beyaz">${gumus}</span></span>,
      btc ? <span key={`${prefix}-btc`} className="t-item"><span className="t-btc">BTC</span><span className="t-btc-deger">${Math.round(btc/1000)}K</span></span> : null,
      eth ? <span key={`${prefix}-eth`} className="t-item"><span className="t-eth">ETH</span><span className="t-eth-deger">${eth?.toLocaleString()}</span></span> : null,
    ].filter(Boolean);
  }

  const items = [
    <span key="saat" className="t-item t-saat">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <span className="t-altin">{fmt(saat)}</span>
    </span>,
    <span key="buradasin" className="t-item t-kullanici">
      <Pirlanta renk="mavi" boyut={12} />
      {flag(kulUlke.cc)}
      <span className="t-altin">{konum?.city || kulUlke.sehir}, {konum?.country || kulUlke.ad}</span>
      <span className="t-rozet">BURADASIN</span>
    </span>,
    ...GRUPLAR.flatMap((grup, gi) => [
      ...grup.map(k => {
        const u = ULKELER[k];
        return (
          <span key={`ulke-${k}`} className="t-item t-ulke-blok">
            {flag(u.cc)}
            <span className="t-altin">{u.sehir}</span>
            <span className="t-beyaz">{saatTz(u.tz)}</span>
            <span className="t-para-kod">{u.para}</span>
          </span>
        );
      }),
      ...araDoviz(`g${gi}`),
    ]),
  ];

  return (
    <div className="ust-serit" onMouseEnter={() => setDur(true)} onMouseLeave={() => setDur(false)} onTouchStart={() => setDur(true)} onTouchEnd={() => setDur(false)}>
      <div className={`t-icerik${dur ? ' dur' : ''}`}>{items}{items}</div>
    </div>
  );
}
