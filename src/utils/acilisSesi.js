let aktifContext = null;

export function calAcilisSesi() {
  try {
    if (aktifContext) {
      try { aktifContext.close(); } catch {}
      aktifContext = null;
    }

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;

    const ctx = new AudioContext();
    aktifContext = ctx;

    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const ana = ctx.createGain();
    ana.gain.value = 0.5;
    ana.connect(ctx.destination);

    const t0 = ctx.currentTime + 0.1;

    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const og  = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = 'sine';
      const t = t0 + i * 0.5;
      og.gain.setValueAtTime(0, t);
      og.gain.linearRampToValueAtTime(0.8, t + 0.05);
      og.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
      osc.connect(og); og.connect(ana);
      osc.start(t); osc.stop(t + 2);
    });

    for (let i = 0; i < 25; i++) {
      const osc = ctx.createOscillator();
      const og  = ctx.createGain();
      osc.frequency.value = 1500 + Math.random() * 5000;
      osc.type = 'sine';
      const t = t0 + 2 + i * 0.08;
      og.gain.setValueAtTime(0, t);
      og.gain.linearRampToValueAtTime(0.35, t + 0.02);
      og.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.connect(og); og.connect(ana);
      osc.start(t); osc.stop(t + 0.2);
    }

    const gong  = ctx.createOscillator();
    const gg    = ctx.createGain();
    gong.frequency.value = 110;
    gong.type = 'triangle';
    const gT = t0 + 4;
    gg.gain.setValueAtTime(0, gT);
    gg.gain.linearRampToValueAtTime(0.9, gT + 0.1);
    gg.gain.exponentialRampToValueAtTime(0.001, gT + 2);
    gong.connect(gg); gg.connect(ana);
    gong.start(gT); gong.stop(gT + 2.5);

    const harmoni  = ctx.createOscillator();
    const hg       = ctx.createGain();
    harmoni.frequency.value = 220;
    harmoni.type = 'sine';
    hg.gain.setValueAtTime(0, gT);
    hg.gain.linearRampToValueAtTime(0.3, gT + 0.15);
    hg.gain.exponentialRampToValueAtTime(0.001, gT + 2);
    harmoni.connect(hg); hg.connect(ana);
    harmoni.start(gT); harmoni.stop(gT + 2.5);

    return ctx;
  } catch (e) {
    return null;
  }
}

export function sesiBitir() {
  if (aktifContext) {
    try { aktifContext.close(); } catch {}
    aktifContext = null;
  }
}
