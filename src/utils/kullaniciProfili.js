import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const LS_HESAP_TURU = 'glamworld_hesap_turu';
const LS_CINSIYET   = 'glamworld_cinsiyet';

export async function kullaniciProfilOku(userId) {
  const cached = localStorage.getItem(LS_HESAP_TURU);
  const cachedCinsiyet = localStorage.getItem(LS_CINSIYET);
  if (cached && cachedCinsiyet) {
    return { hesapTuru: cached, cinsiyet: cachedCinsiyet };
  }
  if (userId) {
    try {
      const snap = await getDoc(doc(db, 'kullanicilar', userId));
      if (snap.exists()) {
        const d = snap.data();
        if (d.hesapTuru) localStorage.setItem(LS_HESAP_TURU, d.hesapTuru);
        if (d.cinsiyet)  localStorage.setItem(LS_CINSIYET, d.cinsiyet);
        return { hesapTuru: d.hesapTuru || 'musteri', cinsiyet: d.cinsiyet || 'tarafsiz' };
      }
    } catch {}
  }
  return { hesapTuru: 'musteri', cinsiyet: 'tarafsiz' };
}

export function profilIkonuSec({ hesapTuru, cinsiyet }) {
  if (hesapTuru === 'musteri') return 'musteri';
  if (cinsiyet === 'Erkek') return 'erkek';
  if (cinsiyet === 'Kadın') return 'kadin';
  return 'tarafsiz';
}

export function profilRotasiSec({ hesapTuru, cinsiyet }) {
  if (hesapTuru === 'musteri') return '/profil/musteri';
  if (cinsiyet === 'Erkek') return '/profil/erkek';
  if (cinsiyet === 'Kadın') return '/profil/kadin';
  return '/profil/tarafsiz';
}
