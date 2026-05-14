import { useState, useMemo, useRef, useEffect } from 'react';
import Tooltip from '../Tooltip';
import './ProfesyonelAlanlar.css';

const ULKELER = [
  {cc:'de',isim:'Almanya',kod:'+49'},{cc:'tr',isim:'Türkiye',kod:'+90'},{cc:'ua',isim:'Ukrayna',kod:'+380'},{cc:'nl',isim:'Hollanda',kod:'+31'},{cc:'at',isim:'Avusturya',kod:'+43'},
  {cc:'ch',isim:'İsviçre',kod:'+41'},{cc:'be',isim:'Belçika',kod:'+32'},{cc:'fr',isim:'Fransa',kod:'+33'},{cc:'gb',isim:'İngiltere',kod:'+44'},{cc:'us',isim:'ABD',kod:'+1'},
  {cc:'it',isim:'İtalya',kod:'+39'},{cc:'es',isim:'İspanya',kod:'+34'},{cc:'pl',isim:'Polonya',kod:'+48'},{cc:'ru',isim:'Rusya',kod:'+7'},{cc:'pt',isim:'Portekiz',kod:'+351'},
  {cc:'gr',isim:'Yunanistan',kod:'+30'},{cc:'ro',isim:'Romanya',kod:'+40'},{cc:'bg',isim:'Bulgaristan',kod:'+359'},{cc:'hr',isim:'Hırvatistan',kod:'+385'},{cc:'rs',isim:'Sırbistan',kod:'+381'},
  {cc:'al',isim:'Arnavutluk',kod:'+355'},{cc:'ba',isim:'Bosna Hersek',kod:'+387'},{cc:'az',isim:'Azerbaycan',kod:'+994'},{cc:'kz',isim:'Kazakistan',kod:'+7'},{cc:'ge',isim:'Gürcistan',kod:'+995'},
  {cc:'sa',isim:'S. Arabistan',kod:'+966'},{cc:'ae',isim:'BAE',kod:'+971'},{cc:'eg',isim:'Mısır',kod:'+20'},{cc:'ir',isim:'İran',kod:'+98'},{cc:'iq',isim:'Irak',kod:'+964'},
  {cc:'cn',isim:'Çin',kod:'+86'},{cc:'jp',isim:'Japonya',kod:'+81'},{cc:'kr',isim:'G. Kore',kod:'+82'},{cc:'in',isim:'Hindistan',kod:'+91'},{cc:'pk',isim:'Pakistan',kod:'+92'},
  {cc:'br',isim:'Brezilya',kod:'+55'},{cc:'mx',isim:'Meksika',kod:'+52'},{cc:'ca',isim:'Kanada',kod:'+1'},{cc:'au',isim:'Avustralya',kod:'+61'},{cc:'za',isim:'G. Afrika',kod:'+27'},
  {cc:'ma',isim:'Fas',kod:'+212'},{cc:'dz',isim:'Cezayir',kod:'+213'},{cc:'ng',isim:'Nijerya',kod:'+234'},{cc:'id',isim:'Endonezya',kod:'+62'},{cc:'my',isim:'Malezya',kod:'+60'},
];

const SEHIRLER = [
  'Berlin','Münih','Hamburg','Köln','Frankfurt','Stuttgart','Düsseldorf','Leipzig','Dortmund','Essen',
  'Bremen','Dresden','Hannover','Nürnberg','Duisburg','Bochum','Wuppertal','Bielefeld','Bonn','Münster',
  'İstanbul','Ankara','İzmir','Bursa','Antalya','Adana','Konya','Gaziantep','Kocaeli','Mersin',
  'Trabzon','Samsun','Eskişehir','Diyarbakır','Kayseri','Amsterdam','Rotterdam','Viyana','Zürih','Paris',
  'Lyon','Marsilya','Londra','Manchester','Brüksel','Roma','Milan','Madrid','Barselona','Varşova',
];

function tahminEt() {
  const lang = (navigator.language || 'de').split('-')[0].toLowerCase();
  const M = { de:'de',tr:'tr',uk:'ua',nl:'nl',fr:'fr',en:'gb',ru:'ru',it:'it',es:'es',pl:'pl',at:'at' };
  return ULKELER.find(u => u.cc === (M[lang] || 'de')) || ULKELER[0];
}

export function TelefonInput({ onChange }) {
  const [ulke, setUlke] = useState(tahminEt);
  const [numara, setNumara] = useState('');
  const [acik, setAcik] = useState(false);
  const [arama, setArama] = useState('');
  const wRef = useRef(null);

  useEffect(() => {
    const kapat = (e) => { if (wRef.current && !wRef.current.contains(e.target)) setAcik(false); };
    document.addEventListener('mousedown', kapat);
    document.addEventListener('touchstart', kapat);
    return () => { document.removeEventListener('mousedown', kapat); document.removeEventListener('touchstart', kapat); };
  }, []);

  const numDegis = (e) => {
    const n = e.target.value.replace(/\D/g, '');
    setNumara(n);
    onChange({ target: { value: `${ulke.kod} ${n}` } });
  };
  const ulkeSec = (u) => { setUlke(u); setAcik(false); setArama(''); onChange({ target: { value: `${u.kod} ${numara}` } }); };
  const filtre = useMemo(() => arama ? ULKELER.filter(u => u.isim.toLowerCase().includes(arama.toLowerCase()) || u.kod.includes(arama)) : ULKELER, [arama]);

  return (
    <div className="pa-tel-wrap" ref={wRef}>
      <Tooltip text="Ülke kodu seç" position="top">
        <button type="button" className="pa-tel-prefix" onClick={() => { setAcik(v => !v); setArama(''); }}>
          <img src={`https://flagcdn.com/16x12/${ulke.cc}.png`} alt={ulke.cc} className="pa-flag" />
          <span className="pa-tel-kod">{ulke.kod}</span>
          <span className="pa-arr">▾</span>
        </button>
      </Tooltip>
      <input type="tel" value={numara} onChange={numDegis} placeholder="Telefon numarası" className="pa-tel-input" autoComplete="tel" />
      {acik && (
        <div className="pa-tel-drop">
          <input type="text" value={arama} onChange={e => setArama(e.target.value)} placeholder="Ülke ara..." className="pa-search" autoFocus />
          <div className="pa-tel-list">
            {filtre.map(u => (
              <button key={u.cc} type="button" className={`pa-tel-opt${ulke.cc === u.cc ? ' ak' : ''}`} onClick={() => ulkeSec(u)}>
                <img src={`https://flagcdn.com/16x12/${u.cc}.png`} alt={u.isim} className="pa-flag" />
                <span>{u.isim}</span><span className="pa-dim">{u.kod}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const UZM = [
  { id:'berber',    isim:'Berber',       ikon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg> },
  { id:'kuafor',    isim:'Kuaför',       ikon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z"/><line x1="12" y1="16" x2="12" y2="22"/><line x1="9" y1="22" x2="15" y2="22"/></svg> },
  { id:'makyaj',    isim:'Makyaj',       ikon:<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 3.8 2.4-7.4L2 9.4h7.6z"/></svg> },
  { id:'manikur',   isim:'Manikür',      ikon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="8" y="2" width="8" height="9" rx="4"/><rect x="6" y="11" width="12" height="11" rx="2"/><line x1="10" y1="11" x2="10" y2="22"/><line x1="14" y1="11" x2="14" y2="22"/></svg> },
  { id:'estetisyen',isim:'Estetisyen',   ikon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/></svg> },
  { id:'masoz',     isim:'Masöz',        ikon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 10c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2c0 3.3-2.7 6-6 6H10c-3.3 0-6-2.7-6-6v-2z"/></svg> },
  { id:'cilt',      isim:'Cilt Bakımı',  ikon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/></svg> },
  { id:'kas',       isim:'Kaş & Kirpik', ikon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="12" rx="10" ry="6"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="9" x2="12" y2="6"/></svg> },
  { id:'diger',     isim:'Diğer',        ikon:<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg> },
];

export function UzmanlikSecici({ value, onChange }) {
  return (
    <div className="pa-uzm-grid">
      {UZM.map(u => (
        <Tooltip key={u.id} text={u.isim} position="top">
          <button type="button" className={`pa-uzm-kart${value === u.isim ? ' ak' : ''}`} onClick={() => onChange({ target: { value: u.isim } })}>
            <span className="pa-uzm-ikon">{u.ikon}</span>
            <span className="pa-uzm-nm">{u.isim}</span>
          </button>
        </Tooltip>
      ))}
    </div>
  );
}

export function SehirOnericisi({ value, onChange }) {
  const [oneriler, setOneriler] = useState([]);
  const [acik, setAcik] = useState(false);
  const wRef = useRef(null);

  useEffect(() => {
    const kapat = (e) => { if (wRef.current && !wRef.current.contains(e.target)) setAcik(false); };
    document.addEventListener('mousedown', kapat);
    document.addEventListener('touchstart', kapat);
    return () => { document.removeEventListener('mousedown', kapat); document.removeEventListener('touchstart', kapat); };
  }, []);

  const degis = (e) => {
    const v = e.target.value;
    onChange(e);
    const f = v.length ? SEHIRLER.filter(s => s.toLowerCase().startsWith(v.toLowerCase())).slice(0, 7) : SEHIRLER.slice(0, 8);
    setOneriler(f); setAcik(f.length > 0);
  };
  const sec = (s) => { onChange({ target: { value: s } }); setAcik(false); };

  return (
    <div className="pa-sehir-wrap" ref={wRef}>
      <input type="text" value={value} onChange={degis} onFocus={() => { if (!value) { setOneriler(SEHIRLER.slice(0, 8)); setAcik(true); } }} placeholder="Şehir yazın..." className="pa-sehir-in" autoComplete="off" />
      {acik && oneriler.length > 0 && (
        <div className="pa-sehir-drop">
          {oneriler.map(s => (
            <Tooltip key={s} text={s} position="top">
              <button type="button" className="pa-sehir-item" onClick={() => sec(s)}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                {s}
              </button>
            </Tooltip>
          ))}
        </div>
      )}
    </div>
  );
}

const DENEYIM = [
  { id:'yeni',      isim:'Yeni Başlayan', acik:'0 – 2 yıl',  ikon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21v-8m0-4c0-3 3-5 3-5s-1 3-1 4m-2 1c0-3-3-5-3-5s1 3 1 4"/></svg> },
  { id:'deneyimli', isim:'Deneyimli',    acik:'3 – 5 yıl',  ikon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21V9m0-3c0-3 3-5 3-5s-1 3-1 4M12 6c0-3-3-5-3-5s1 3 1 4M9 21s1-2 3-2 3 2 3 2"/></svg> },
  { id:'uzman',     isim:'Uzman',        acik:'6 – 10 yıl', ikon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21V7m0-2c0-3 3-5 3-5s-1 3-1 4M12 5c0-3-3-5-3-5s1 3 1 4M8 21s1-3 4-3 4 3 4 3"/></svg> },
  { id:'usta',      isim:'Usta',         acik:'10+ yıl',    ikon:<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 18l-6.2 3.1 1.2-6.9-5-4.9 6.9-1z"/></svg> },
];

export function DeneyimSecici({ value, onChange }) {
  return (
    <div className="pa-den-grid">
      {DENEYIM.map(d => (
        <Tooltip key={d.id} text={d.acik} position="top">
          <button type="button" className={`pa-den-kart${value === d.id ? ' ak' : ''}`} onClick={() => onChange({ target: { value: d.id } })}>
            <span className="pa-den-ikon">{d.ikon}</span>
            <span className="pa-den-nm">{d.isim}</span>
            <span className="pa-den-ac">{d.acik}</span>
          </button>
        </Tooltip>
      ))}
    </div>
  );
}
