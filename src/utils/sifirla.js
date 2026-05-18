import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

export async function tumHafizaSifirla() {
  console.log('[SIFIRLA] Başlıyor...');
  try { await signOut(auth); console.log('[SIFIRLA] Firebase çıkış yapıldı'); } catch {}

  const silinecek = [];
  for (let i = 0; i < localStorage.length; i++) {
    const k = localStorage.key(i);
    if (k && k.startsWith('glamworld_')) silinecek.push(k);
  }
  silinecek.forEach(k => { localStorage.removeItem(k); console.log('[SIFIRLA] Silindi:', k); });

  sessionStorage.clear();
  console.log('[SIFIRLA] SessionStorage temizlendi');

  try {
    const dbs = await indexedDB.databases();
    for (const d of dbs) {
      if (d.name && (d.name.includes('firebase') || d.name.includes('glamworld'))) {
        indexedDB.deleteDatabase(d.name);
        console.log('[SIFIRLA] IndexedDB silindi:', d.name);
      }
    }
  } catch {}

  console.log('[SIFIRLA] Tamamlandı. Yönlendiriliyor...');
  setTimeout(() => { window.location.href = '/glamworld/'; }, 500);
}

if (typeof window !== 'undefined') {
  window.GLAM_SIFIRLA = tumHafizaSifirla;
  console.log('[SIFIRLA] console\'da GLAM_SIFIRLA() çağırabilirsin');
}
