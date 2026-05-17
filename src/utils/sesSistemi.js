let aktifContext = null;
let etkilesimYakalandi = false;
let etkilesimBekleyenler = [];

function etkilesimYakalayici() {
  if (etkilesimYakalandi) return;

  const yakala = () => {
    if (etkilesimYakalandi) return;
    etkilesimYakalandi = true;
    console.log('[GLAMSES] Kullanıcı etkileşimi yakalandı');

    etkilesimBekleyenler.forEach(fn => {
      try { fn(); } catch (e) { console.error('[GLAMSES] Callback hatası:', e); }
    });
    etkilesimBekleyenler = [];

    ['touchstart','touchend','click','mousedown','keydown','pointerdown'].forEach(o => {
      document.removeEventListener(o, yakala);
    });
  };

  ['touchstart','touchend'].forEach(o => document.addEventListener(o, yakala, { passive: true, capture: true }));
  ['click','mousedown','keydown','pointerdown'].forEach(o => document.addEventListener(o, yakala, { capture: true }));
}

if (typeof document !== 'undefined') {
  etkilesimYakalayici();
}

function calistirAudio() {
  return new Promise((resolve, reject) => {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) { reject('AudioContext yok'); return; }

      if (!aktifContext) {
        aktifContext = new Audio();
        console.log('[GLAMSES] Yeni context, state:', aktifContext.state);
      }

      if (aktifContext.state === 'suspended') {
        console.log('[GLAMSES] Suspended → resume');
        aktifContext.resume()
          .then(() => { console.log('[GLAMSES] Resume sonrası:', aktifContext.state); resolve(aktifContext); })
          .catch(e => { console.error('[GLAMSES] Resume hatası:', e); reject(e); });
      } else {
        console.log('[GLAMSES] Context hazır:', aktifContext.state);
        resolve(aktifContext);
      }
    } catch (e) {
      console.error('[GLAMSES] Context hatası:', e);
      reject(e);
    }
  });
}

function calNota(ctx, ana, freq, t, sure, vol) {
  const osc = ctx.createOscillator();
  const g   = ctx.createGain();
  osc.frequency.value = freq;
  osc.type = 'sine';
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.03);
  g.gain.exponentialRampToValueAtTime(0.001, t + sure);
  osc.connect(g); g.connect(ana);
  osc.start(t); osc.stop(t + sure + 0.1);
}

function calGong(ctx, ana, freq, t, sure, vol) {
  const osc = ctx.createOscillator();
  const g   = ctx.createGain();
  osc.frequency.value = freq;
  osc.type = 'triangle';
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vol, t + 0.1);
  g.gain.exponentialRampToValueAtTime(0.001, t + sure);
  osc.connect(g); g.connect(ana);
  osc.start(t); osc.stop(t + sure + 0.1);
}

async function calAcilisSeslerini(ctx) {
  console.log('[GLAMSES] Sesler çalınıyor, state:', ctx.state);
  const ana = ctx.createGain();
  ana.gain.value = 0.7;
  ana.connect(ctx.destination);
  const T = ctx.currentTime + 0.05;

  const testOsc = ctx.createOscillator();
  const testG   = ctx.createGain();
  testOsc.frequency.value = 880; testOsc.type = 'sine';
  testG.gain.setValueAtTime(0, T);
  testG.gain.linearRampToValueAtTime(0.5, T + 0.05);
  testG.gain.exponentialRampToValueAtTime(0.001, T + 0.4);
  testOsc.connect(testG); testG.connect(ana);
  testOsc.start(T); testOsc.stop(T + 0.5);
  console.log('[GLAMSES] Test çın planlandı:', T);

  [523.25, 659.25, 783.99].forEach((freq, i) => calNota(ctx, ana, freq, T + 0.5 + i * 0.4, 1.5, 0.9));

  for (let i = 0; i < 25; i++) {
    calNota(ctx, ana, 1800 + Math.random() * 5000, T + 2.5 + i * 0.06, 0.15, 0.4);
  }

  calGong(ctx, ana, 110, T + 4, 2.5, 1.0);
  calGong(ctx, ana, 220, T + 4, 2.5, 0.5);
  calGong(ctx, ana, 440, T + 4, 2.0, 0.25);

  console.log('[GLAMSES] Tüm sesler planlandı ~6.5sn');
}

export async function sesBaslat() {
  console.log('[GLAMSES] sesBaslat() çağrıldı, etkileşim:', etkilesimYakalandi);

  const baslat = async () => {
    try {
      const ctx = await calistirAudio();
      if (ctx && ctx.state === 'running') {
        calAcilisSeslerini(ctx);
      } else {
        console.warn('[GLAMSES] Context running değil:', ctx?.state);
      }
    } catch (e) {
      console.error('[GLAMSES] Başlatma hatası:', e);
    }
  };

  if (etkilesimYakalandi) {
    console.log('[GLAMSES] Etkileşim var, hemen başlatılıyor');
    await baslat();
  } else {
    console.log('[GLAMSES] Etkileşim bekleniyor...');
    etkilesimBekleyenler.push(baslat);
  }
}

export function sesBitir() {
  if (aktifContext) {
    try { aktifContext.close(); } catch {}
    aktifContext = null;
    console.log('[GLAMSES] Context kapatıldı');
  }
}

export function sesDurumu() {
  return {
    etkilesimYakalandi,
    bekleyenSayisi: etkilesimBekleyenler.length,
    contextVar:   !!aktifContext,
    contextState: aktifContext?.state,
  };
}
