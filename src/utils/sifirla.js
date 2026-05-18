import { signOut, deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export async function tumHafizaSifirla() {
  console.log('[SIFIRLA] TAM SIFIRLAMA başlıyor...');

  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
    console.log('[SIFIRLA] Kullanıcı:', uid);

    try {
      await deleteDoc(doc(db, 'kullanicilar', uid));
      console.log('[SIFIRLA] Firestore profil silindi');
    } catch (e) { console.log('[SIFIRLA] Firestore hatası:', e.message); }

    try {
      await deleteUser(auth.currentUser);
      console.log('[SIFIRLA] Firebase Auth hesabı silindi');
    } catch (e) {
      console.log('[SIFIRLA] Auth silme hatası (recent login gerekebilir):', e.code);
      try { await signOut(auth); } catch {}
    }
  } else {
    try { await signOut(auth); } catch {}
  }

  const tumAnahtarlar = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k) tumAnahtarlar.push(k);
  }
  tumAnahtarlar.forEach(k => { localStorage.removeItem(k); console.log('[SIFIRLA] localStorage:', k); });

  sessionStorage.clear();
  console.log('[SIFIRLA] SessionStorage temizlendi');

  try {
    const dbs = await indexedDB.databases();
    for (const d of dbs) {
      if (d.name) { indexedDB.deleteDatabase(d.name); console.log('[SIFIRLA] IndexedDB:', d.name); }
    }
  } catch (e) { console.log('[SIFIRLA] IndexedDB hatası:', e.message); }

  document.cookie.split(';').forEach(c => {
    const n = c.split('=')[0].trim();
    document.cookie = n + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
  });

  console.log('[SIFIRLA] TAMAMLANDI. Yenileniyor...');
  setTimeout(() => { window.location.href = '/glamworld/?t=' + Date.now(); }, 800);
}

if (typeof window !== 'undefined') {
  window.GLAM_SIFIRLA = tumHafizaSifirla;
  console.log('[SIFIRLA] GLAM_SIFIRLA() ile çağır');
}
