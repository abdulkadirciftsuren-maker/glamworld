class GlamSesSistemi {
  constructor() {
    this.context = null;
    this.calistir = false;
  }

  async baslat() {
    if (this.calistir) return;

    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) {
        console.warn('AudioContext desteklenmiyor');
        return;
      }

      this.context = new Audio();

      if (this.context.state === 'suspended') {
        await this.context.resume();
      }

      console.log('GlamSes context state:', this.context.state);
      this.calistir = true;
      this.acilisCal();
    } catch (e) {
      console.error('GlamSes baslat hatasi:', e);
    }
  }

  acilisCal() {
    if (!this.context) return;
    const ctx = this.context;

    const ana = ctx.createGain();
    ana.gain.value = 0.7;
    ana.connect(ctx.destination);

    const T = ctx.currentTime + 0.05;

    [523.25, 659.25, 783.99].forEach((freq, i) => {
      this.calNota(ana, freq, T + i * 0.5, 1.5, 0.9);
    });

    for (let i = 0; i < 30; i++) {
      this.calNota(ana, 1500 + Math.random() * 5500, T + 2 + i * 0.07, 0.2, 0.4);
    }

    this.calGong(ana, 110,  T + 4, 2.5, 1.0);
    this.calGong(ana, 220,  T + 4, 2.5, 0.4);
    this.calGong(ana, 440,  T + 4, 2.0, 0.2);

    console.log('GlamSes açılış başladı');
  }

  calNota(ana, freq, t, sure, vol) {
    const osc  = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, t + sure);
    osc.connect(gain); gain.connect(ana);
    osc.start(t); osc.stop(t + sure + 0.1);
  }

  calGong(ana, freq, t, sure, vol) {
    const osc  = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.frequency.value = freq;
    osc.type = 'triangle';
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(vol, t + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, t + sure);
    osc.connect(gain); gain.connect(ana);
    osc.start(t); osc.stop(t + sure + 0.1);
  }

  bitir() {
    if (this.context) {
      try { this.context.close(); } catch {}
      this.context = null;
      this.calistir = false;
    }
  }
}

const glamSes = new GlamSesSistemi();

export function sesBaslat() { return glamSes.baslat(); }
export function sesBitir()  { glamSes.bitir(); }
