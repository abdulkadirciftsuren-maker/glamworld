export function calAcilisSesi() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;

    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const ana = ctx.createGain();
    ana.gain.value = 0.4;
    ana.connect(ctx.destination);

    const t0 = ctx.currentTime;

    [523.25, 659.25, 783.99].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const og  = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = 'sine';
      const t = t0 + i * 0.5;
      og.gain.setValueAtTime(0, t);
      og.gain.linearRampToValueAtTime(0.6, t + 0.05);
      og.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
      osc.connect(og); og.connect(ana);
      osc.start(t); osc.stop(t + 1.5);
    });

    for (let i = 0; i < 20; i++) {
      const osc = ctx.createOscillator();
      const og  = ctx.createGain();
      osc.frequency.value = 2000 + Math.random() * 4000;
      osc.type = 'sine';
      const t = t0 + 2 + i * 0.1;
      og.gain.setValueAtTime(0, t);
      og.gain.linearRampToValueAtTime(0.25, t + 0.02);
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
    gg.gain.linearRampToValueAtTime(0.7, gT + 0.1);
    gg.gain.exponentialRampToValueAtTime(0.001, gT + 2);
    gong.connect(gg); gg.connect(ana);
    gong.start(gT); gong.stop(gT + 2);

    return ctx;
  } catch (e) {
    return null;
  }
}
