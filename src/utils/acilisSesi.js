export function calAcilisSesi() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const ana = ctx.destination;

  const gain = ctx.createGain();
  gain.gain.value = 0.15;
  gain.connect(ana);

  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const og  = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    og.gain.setValueAtTime(0, ctx.currentTime + i * 0.5);
    og.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.5 + 0.05);
    og.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.5 + 1.5);
    osc.connect(og);
    og.connect(gain);
    osc.start(ctx.currentTime + i * 0.5);
    osc.stop(ctx.currentTime + i * 0.5 + 1.5);
  });

  for (let i = 0; i < 15; i++) {
    const osc = ctx.createOscillator();
    const og  = ctx.createGain();
    osc.frequency.value = 2000 + Math.random() * 4000;
    osc.type = 'sine';
    const t = ctx.currentTime + 2 + i * 0.13;
    og.gain.setValueAtTime(0, t);
    og.gain.linearRampToValueAtTime(0.1, t + 0.02);
    og.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
    osc.connect(og);
    og.connect(gain);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  const gong = ctx.createOscillator();
  const gg   = ctx.createGain();
  gong.frequency.value = 110;
  gong.type = 'triangle';
  gg.gain.setValueAtTime(0, ctx.currentTime + 4);
  gg.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 4.1);
  gg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 6);
  gong.connect(gg);
  gg.connect(gain);
  gong.start(ctx.currentTime + 4);
  gong.stop(ctx.currentTime + 6);

  return ctx;
}
