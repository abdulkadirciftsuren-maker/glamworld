let aktifContext = null;
let etkilesimYakalandi = false;
let calmasiBekleyen = false;

function etkilesimYakalayici() {
  if (typeof document === 'undefined') return;

  const yakala = async (e) => {
    if (etkilesimYakalandi) return;
    etkilesimYakalandi = true;
    console.log('[GLAMSES] Etkileşim yakalandı:', e.type);

    if (calmasiBekleyen) {
      calmasiBekleyen = false;
      await dogrudanCal();
    }

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

async function dogrudanCal() {
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) { console.error('[GLAMSES] AudioContext yok'); return; }

    if (!aktifContext) aktifContext = new Audio();

    if (aktifContext.state === 'suspended') {
      await aktifContext.resume();
    }

    console.log('[GLAMSES] Context durum:', aktifContext.state);

    if (aktifContext.state !== 'running') {
      console.warn('[GLAMSES] Context running değil:', aktifContext.state);
      return;
    }

    const ctx = aktifContext;
    const T   = ctx.currentTime + 0.1;
    console.log('[GLAMSES] Sesler şimdiden başlıyor, T:', T);

    const ana = ctx.createGain();
    ana.gain.value = 0.8;
    ana.connect(ctx.destination);

    const test  = ctx.createOscillator();
    const testG = ctx.createGain();
    test.frequency.value = 1320; test.type = 'sine';
    testG.gain.setValueAtTime(0, T);
    testG.gain.linearRampToValueAtTime(0.6, T + 0.02);
    testG.gain.exponentialRampToValueAtTime(0.001, T + 0.3);
    test.connect(testG); testG.connect(ana);
    test.start(T); test.stop(T + 0.4);

    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.frequency.value = freq; osc.type = 'sine';
      const t = T + 0.4 + i * 0.4;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.9, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
      osc.connect(g); g.connect(ana);
      osc.start(t); osc.stop(t + 1.6);
    });

    for (let i = 0; i < 25; i++) {
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.frequency.value = 1800 + Math.random() * 5000; osc.type = 'sine';
      const t = T + 2.4 + i * 0.06;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.4, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.connect(g); g.connect(ana);
      osc.start(t); osc.stop(t + 0.2);
    }

    [{f:110,v:1.0,type:'triangle'},{f:220,v:0.5,type:'sine'},{f:440,v:0.25,type:'sine'}].forEach(p => {
      const osc = ctx.createOscillator();
      const g   = ctx.createGain();
      osc.frequency.value = p.f; osc.type = p.type;
      const t = T + 4;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(p.v, t + 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, t + 2.5);
      osc.connect(g); g.connect(ana);
      osc.start(t); osc.stop(t + 2.6);
    });

    console.log('[GLAMSES] Tüm sesler planlandı, son: T+6.5');
  } catch (e) {
    console.error('[GLAMSES] dogrudanCal hatası:', e);
  }
}

export async function sesBaslat() {
  console.log('[GLAMSES] sesBaslat(), etkilesim:', etkilesimYakalandi);

  if (etkilesimYakalandi) {
    await dogrudanCal();
  } else {
    console.log('[GLAMSES] Etkileşim bekleniyor, ses kuyruğa alındı');
    calmasiBekleyen = true;
  }
}

export function sesBitir() {
  if (aktifContext) {
    try { aktifContext.close(); } catch {}
    aktifContext = null;
  }
  etkilesimYakalandi = false;
  calmasiBekleyen = false;
}

export function sesDurumu() {
  return {
    etkilesimYakalandi,
    calmasiBekleyen,
    contextVar:   !!aktifContext,
    contextState: aktifContext?.state,
  };
}
