import { useState, useMemo, useRef, useEffect } from 'react';
import Tooltip from '../Tooltip';
import './ProfesyonelAlanlar.css';

const ULKELER = [
  {cc:'de',isim:'Almanya',kod:'+49'},{cc:'tr',isim:'Türkiye',kod:'+90'},{cc:'ua',isim:'Ukrayna',kod:'+380'},{cc:'nl',isim:'Hollanda',kod:'+31'},{cc:'at',isim:'Avusturya',kod:'+43'},
  {cc:'ch',isim:'İsviçre',kod:'+41'},{cc:'be',isim:'Belçika',kod:'+32'},{cc:'fr',isim:'Fransa',kod:'+33'},{cc:'gb',isim:'İngiltere',kod:'+44'},{cc:'us',isim:'ABD',kod:'+1'},
  {cc:'it',isim:'İtalya',kod:'+39'},{cc:'es',isim:'İspanya',kod:'+34'},{cc:'pl',isim:'Polonya',kod:'+48'},{cc:'ru',isim:'Rusya',kod:'+7'},{cc:'pt',isim:'Portekiz',kod:'+351'},
  {cc:'gr',isim:'Yunanistan',kod:'+30'},{cc:'ro',isim:'Romanya',kod:'+40'},{cc:'bg',isim:'Bulgaristan',kod:'+359'},{cc:'hr',isim:'Hırvatistan',kod:'+385'},{cc:'rs',isim:'Sırbistan',kod:'+381'},
  {cc:'al',isim:'Arnavutluk',kod:'+355'},{cc:'ba',isim:'Bosna Hersek',kod:'+387'},{cc:'az',isim:'Azerbaycan',kod:'+994'},{cc:'ge',isim:'Gürcistan',kod:'+995'},{cc:'am',isim:'Ermenistan',kod:'+374'},
  {cc:'se',isim:'İsveç',kod:'+46'},{cc:'no',isim:'Norveç',kod:'+47'},{cc:'dk',isim:'Danimarka',kod:'+45'},{cc:'fi',isim:'Finlandiya',kod:'+358'},{cc:'hu',isim:'Macaristan',kod:'+36'},
  {cc:'cz',isim:'Çekya',kod:'+420'},{cc:'sk',isim:'Slovakya',kod:'+421'},{cc:'lt',isim:'Litvanya',kod:'+370'},{cc:'lv',isim:'Letonya',kod:'+371'},{cc:'ee',isim:'Estonya',kod:'+372'},
  {cc:'sa',isim:'S. Arabistan',kod:'+966'},{cc:'ae',isim:'BAE',kod:'+971'},{cc:'eg',isim:'Mısır',kod:'+20'},{cc:'ir',isim:'İran',kod:'+98'},{cc:'iq',isim:'Irak',kod:'+964'},
  {cc:'jo',isim:'Ürdün',kod:'+962'},{cc:'lb',isim:'Lübnan',kod:'+961'},{cc:'sy',isim:'Suriye',kod:'+963'},{cc:'kz',isim:'Kazakistan',kod:'+7'},{cc:'uz',isim:'Özbekistan',kod:'+998'},
  {cc:'cn',isim:'Çin',kod:'+86'},{cc:'jp',isim:'Japonya',kod:'+81'},{cc:'kr',isim:'G. Kore',kod:'+82'},{cc:'in',isim:'Hindistan',kod:'+91'},{cc:'pk',isim:'Pakistan',kod:'+92'},
  {cc:'bd',isim:'Bangladeş',kod:'+880'},{cc:'th',isim:'Tayland',kod:'+66'},{cc:'vn',isim:'Vietnam',kod:'+84'},{cc:'id',isim:'Endonezya',kod:'+62'},{cc:'my',isim:'Malezya',kod:'+60'},
  {cc:'sg',isim:'Singapur',kod:'+65'},{cc:'ph',isim:'Filipinler',kod:'+63'},{cc:'br',isim:'Brezilya',kod:'+55'},{cc:'mx',isim:'Meksika',kod:'+52'},{cc:'ar',isim:'Arjantin',kod:'+54'},
  {cc:'co',isim:'Kolombiya',kod:'+57'},{cc:'cl',isim:'Şili',kod:'+56'},{cc:'ca',isim:'Kanada',kod:'+1'},{cc:'au',isim:'Avustralya',kod:'+61'},{cc:'nz',isim:'Yeni Zelanda',kod:'+64'},
  {cc:'za',isim:'G. Afrika',kod:'+27'},{cc:'ng',isim:'Nijerya',kod:'+234'},{cc:'ke',isim:'Kenya',kod:'+254'},{cc:'et',isim:'Etiyopya',kod:'+251'},{cc:'ma',isim:'Fas',kod:'+212'},
  {cc:'dz',isim:'Cezayir',kod:'+213'},{cc:'tn',isim:'Tunus',kod:'+216'},{cc:'ly',isim:'Libya',kod:'+218'},{cc:'gh',isim:'Gana',kod:'+233'},{cc:'tz',isim:'Tanzanya',kod:'+255'},
];

const SEHIR_DATA = {
  de:['Berlin','Münih','Hamburg','Köln','Frankfurt','Stuttgart','Düsseldorf','Leipzig','Dresden','Hannover','Nürnberg','Duisburg','Dortmund','Essen','Bremen','Bochum','Wuppertal','Bielefeld','Bonn','Münster','Aachen','Augsburg','Karlsruhe','Mainz','Wiesbaden','Freiburg','Heidelberg','Kiel','Magdeburg','Erfurt','Saarbrücken','Rostock'],
  tr:['İstanbul','Ankara','İzmir','Bursa','Antalya','Adana','Konya','Gaziantep','Kocaeli','Mersin','Diyarbakır','Eskişehir','Trabzon','Kayseri','Samsun','Denizli','Malatya','Şanlıurfa','Manisa','Erzurum','Balıkesir','Tekirdağ','Kahramanmaraş','Van','Batman','Elazığ','Rize','Ordu','Kütahya','Muğla','Çorum','Tokat','Mardin'],
  ua:['Kyiv','Lviv','Odessa','Kharkiv','Dnipro','Zaporizhzhia','Vinnitsya','Mykolaiv','Chernivtsi','Sumy','Poltava','Cherkasy'],
  nl:['Amsterdam','Rotterdam','Lahey','Utrecht','Eindhoven','Groningen','Tilburg','Alkmaar','Arnhem','Breda','Nijmegen','Enschede'],
  at:['Viyana','Graz','Linz','Salzburg','İnnsbruck','Klagenfurt','Villach','Wels','Steyr','Dornbirn'],
  ch:['Zürih','Cenevre','Basel','Bern','Lozan','Winterthur','Luzern','St. Gallen','Lugano','Biel','Thun','La Chaux-de-Fonds'],
  be:['Brüksel','Antwerp','Ghent','Liège','Charleroi','Namur','Mechelen','Bruges','Leuven','Aalst'],
  fr:['Paris','Lyon','Marsilya','Toulouse','Bordeaux','Lille','Nantes','Strasbourg','Rennes','Grenoble','Montpellier','Nice','Clermont-Ferrand','Tours','Brest','Rouen','Toulon','Amiens','Dijon','Angers','Reims','Saint-Étienne','Metz','Besançon'],
  gb:['Londra','Manchester','Birmingham','Glasgow','Leeds','Liverpool','Edinburgh','Bristol','Sheffield','Bradford','Cardiff','Leicester','Coventry','Nottingham','Newcastle','Southampton','Brighton','Plymouth','Reading','Belfast'],
  us:['New York','Los Angeles','Chicago','Houston','Phoenix','Philadelphia','San Antonio','Dallas','San Diego','Jacksonville','Austin','Columbus','Charlotte','Indianapolis','San Francisco','Seattle','Denver','Nashville','El Paso','Portland','Las Vegas','Memphis','Boston','Detroit','Atlanta','Miami','Minneapolis','Tampa'],
  it:['Roma','Milan','Napoli','Torino','Palermo','Bologna','Floransa','Venedik','Catania','Bari','Verona','Messina','Padua','Trieste','Taranto','Brescia','Parma','Modena','Reggio Calabria','Prato','Bergamo','Perugia'],
  es:['Madrid','Barselona','Valencia','Sevilla','Bilbao','Zaragoza','Málaga','Murcia','Palma','Alicante','Córdoba','Valladolid','Vigo','Gijón','Granada','La Coruña','Vitoria','Oviedo','Badalona','Elche'],
  pl:['Varşova','Kraków','Gdańsk','Wrocław','Poznań','Łódź','Katowice','Bydgoszcz','Lublin','Szczecin','Białystok','Gdynia'],
  ru:['Moskova','St. Petersburg','Novosibirsk','Yekaterinburg','Kazan','Nijniy Novgorod','Çelyabinsk','Samara','Ufa','Rostov-na-Donu','Omsk','Krasnoyarsk'],
  se:['Stockholm','Göteborg','Malmö','Uppsala','Västerås','Örebro','Linköping','Helsingborg','Jönköping','Norrköping'],
  no:['Oslo','Bergen','Stavanger','Trondheim','Drammen','Fredrikstad','Kristiansand','Tromsø','Sandnes'],
  dk:['Kopenhag','Aarhus','Odense','Aalborg','Esbjerg','Randers','Kolding','Horsens','Roskilde'],
  sa:['Riyad','Cidde','Mekke','Medine','Dammam','Taif','Tabuk','Buraydah','Khamis Mushait'],
  ae:['Dubai','Abu Dabi','Sharjah','Ajman','Al Ain','Ras al-Khaimah','Fujairah'],
  cn:['Pekin','Şanghay','Guangzhou','Shenzhen','Chengdu','Tianjin','Wuhan','Çongçing','Nanjing','Hangzhou','Sian','Harbin','Shenyang','Qingdao','Jinan','Changsha'],
  jp:['Tokyo','Osaka','Yokohama','Nagoya','Sapporo','Fukuoka','Kyoto','Kobe','Kawasaki','Saitama','Hiroshima','Sendai'],
  kr:['Seul','Busan','Incheon','Daegu','Daejeon','Gwangju','Suwon','Ulsan','Changwon','Goyang'],
  in:['Mumbai','Delhi','Bangalore','Hyderabad','Chennai','Kolkata','Pune','Ahmedabad','Jaipur','Surat','Lucknow','Kanpur','Nagpur','Patna','Indore','Bhopal'],
  br:['São Paulo','Rio de Janeiro','Brasília','Salvador','Fortaleza','Curitiba','Manaus','Recife','Belo Horizonte','Porto Alegre','Belém','Goiânia'],
  ca:['Toronto','Vancouver','Montreal','Calgary','Ottawa','Edmonton','Mississauga','Winnipeg','Quebec City','Hamilton','Brampton'],
  au:['Sydney','Melbourne','Brisbane','Perth','Adelaide','Gold Coast','Canberra','Newcastle','Wollongong','Sunshine Coast','Hobart'],
  gr:['Atina','Selanik','Patras','İraklion','Volos','Larissa','Rhodes'],
  pt:['Lizbon','Porto','Braga','Setúbal','Coimbra','Funchal','Aveiro'],
  ro:['Bükreş','Kluj','Timişoara','Yaş','Konstansa','Kraiova','Brăila'],
  hu:['Budapeşte','Debrecen','Miskolc','Pécs','Győr','Nyíregyháza','Kecskemét'],
};

const TUM_SEHIRLER = [...new Set(Object.values(SEHIR_DATA).flat())];

function tahminEt() {
  const lang = (navigator.language || 'de').split('-')[0].toLowerCase();
  const M = { de:'de',tr:'tr',uk:'ua',nl:'nl',fr:'fr',en:'gb',ru:'ru',it:'it',es:'es',pl:'pl',at:'at',sv:'se',no:'no',da:'dk' };
  return ULKELER.find(u => u.cc === (M[lang] || 'de')) || ULKELER[0];
}

function kodSoy(v, ulkeler) {
  if (!v.startsWith('+')) return { numara: v.replace(/\D/g, ''), ulke: null };
  const esles = ulkeler.find(u => v.startsWith(u.kod));
  if (esles) return { numara: v.slice(esles.kod.length).replace(/[\s\-().]/g, ''), ulke: esles };
  return { numara: v.replace(/\D/g, ''), ulke: null };
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

  const guncelle = (yeniUlke, yeniNumara) => {
    setNumara(yeniNumara);
    if (yeniUlke) setUlke(yeniUlke);
    onChange({ target: { value: `${(yeniUlke || ulke).kod} ${yeniNumara}` } });
  };

  const numDegis = (e) => {
    const v = e.target.value;
    if (v.startsWith('+')) {
      const { numara: n, ulke: u } = kodSoy(v, ULKELER);
      guncelle(u, n);
    } else {
      guncelle(null, v.replace(/\D/g, ''));
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').trim();
    if (pasted.startsWith('+')) {
      e.preventDefault();
      const { numara: n, ulke: u } = kodSoy(pasted, ULKELER);
      guncelle(u, n);
    }
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
      <input type="tel" value={numara} onChange={numDegis} onPaste={handlePaste} placeholder="Telefon numarası" className="pa-tel-input" autoComplete="tel" />
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
  { id:'kas',       isim:'Kaş & Kirpik', ikon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="12" rx="10" ry="6"/><circle cx="12" cy="12" r="3"/></svg> },
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

const PIN = <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;

export function SehirOnericisi({ value, onChange }) {
  const [acik, setAcik] = useState(false);
  const [seciliUlke, setSeciliUlke] = useState('de');
  const [ulkeAra, setUlkeAra] = useState('');
  const [sehirAra, setSehirAra] = useState('');

  useEffect(() => {
    if (!acik) { window.__sehirAcik = false; return; }
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    window.__sehirAcik = true;
    window.history.pushState(null, '', window.location.pathname);
    const kapat = () => setAcik(false);
    window.addEventListener('popstate', kapat, { once: true });
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      window.__sehirAcik = false;
      window.removeEventListener('popstate', kapat);
    };
  }, [acik]);

  const filtreUlke = ulkeAra ? ULKELER.filter(u => u.isim.toLowerCase().includes(ulkeAra.toLowerCase())) : ULKELER;
  const sehirler = sehirAra ? TUM_SEHIRLER.filter(s => s.toLowerCase().includes(sehirAra.toLowerCase())).slice(0, 20) : (SEHIR_DATA[seciliUlke] || []);
  const sec = (s) => { onChange({ target: { value: s } }); setAcik(false); setSehirAra(''); setUlkeAra(''); };
  const secilenUlke = ULKELER.find(u => u.cc === seciliUlke);

  return (
    <>
      <Tooltip text="Şehir seç" position="top" style={{ width: '100%' }}>
        <button type="button" className="pa-sehir-tetik" onClick={() => setAcik(true)}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" className="pa-loc-ikon"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          {value || <span className="pa-placeholder">Şehir seçin...</span>}
        </button>
      </Tooltip>
      {acik && (
        <div className="pa-city-overlay" onClick={() => setAcik(false)}>
          <div className="pa-city-panel" onClick={e => e.stopPropagation()}>
            <div className="pa-city-header">
              <span className="pa-city-title">Şehir Seç</span>
              <Tooltip text="Kapat" position="top">
                <button type="button" className="pa-city-kapat" onClick={() => setAcik(false)}>✕</button>
              </Tooltip>
            </div>
            <div className="pa-city-cols">
              <div className="pa-col-ulke">
                <div className="pa-col-baslik">ÜLKE</div>
                <input type="text" value={ulkeAra} onChange={e => setUlkeAra(e.target.value)} placeholder="Ara..." className="pa-col-search" autoComplete="off" />
                <div className="pa-col-list">
                  {filtreUlke.map(u => (
                    <Tooltip key={u.cc} text={u.isim} position="top">
                      <button type="button" className={`pa-ulke-row${seciliUlke === u.cc ? ' ak' : ''}`} onClick={() => { setSeciliUlke(u.cc); setSehirAra(''); setUlkeAra(''); }}>
                        <img src={`https://flagcdn.com/16x12/${u.cc}.png`} alt={u.isim} className="pa-flag" />
                        <span className="pa-ulke-nm">{u.isim}</span>
                        {seciliUlke === u.cc && <span className="pa-chk">✓</span>}
                      </button>
                    </Tooltip>
                  ))}
                </div>
              </div>
              <div className="pa-col-sehir">
                <div className="pa-col-baslik">
                  {secilenUlke ? <>{secilenUlke.isim}</> : 'ŞEHİR'}
                </div>
                <input type="text" value={sehirAra} onChange={e => setSehirAra(e.target.value)} placeholder="Ara..." className="pa-col-search" autoComplete="off" />
                <div className="pa-col-list">
                  {sehirler.map(s => (
                    <Tooltip key={s} text={s} position="top">
                      <button type="button" className={`pa-city-row${value === s ? ' ak' : ''}`} onClick={() => sec(s)}>
                        {PIN}{s}
                      </button>
                    </Tooltip>
                  ))}
                  {sehirler.length === 0 && <p className="pa-city-bos">← Ülke seçin</p>}
                  {sehirAra && !sehirler.find(s => s.toLowerCase() === sehirAra.toLowerCase()) && (
                    <Tooltip text={`"${sehirAra}" kaydet`} position="top">
                      <button type="button" className="pa-city-row pa-city-custom" onClick={() => sec(sehirAra)}>"{sehirAra}"</button>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
