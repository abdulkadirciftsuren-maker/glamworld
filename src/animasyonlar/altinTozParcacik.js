const RENKLER = ['#FFD700', '#FFA500', '#FFEAA7', '#FFD700', '#E8C86A'];

function parcacikOlustur(cx, cy) {
  const aci = Math.random() * Math.PI * 2;
  const hiz = 0.3 + Math.random() * 1.2;
  return {
    x: cx + (Math.random() - 0.5) * 60,
    y: cy + (Math.random() - 0.5) * 40,
    vx: Math.cos(aci) * hiz * 0.4,
    vy: -(0.4 + Math.random() * 1.0),
    boyut: 1 + Math.random() * 3,
    renk: RENKLER[Math.floor(Math.random() * RENKLER.length)],
    alfa: 0,
    maxAlfa: 0.5 + Math.random() * 0.5,
    omur: 0,
    maxOmur: 80 + Math.random() * 80,
  };
}

export function altinTozBaslat(canvas, sayi) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cx = w / 2;
  const cy = h / 2;
  let parcaciklar = [];
  let rafId = null;
  let aktif = true;

  for (let i = 0; i < sayi; i++) {
    const p = parcacikOlustur(cx, cy);
    p.omur = -Math.floor(Math.random() * 40);
    parcaciklar.push(p);
  }

  function ciz() {
    if (!aktif) return;
    ctx.clearRect(0, 0, w, h);
    parcaciklar.forEach((p) => {
      p.omur++;
      if (p.omur < 0) return;
      const ilerleme = p.omur / p.maxOmur;
      p.alfa = ilerleme < 0.3
        ? (ilerleme / 0.3) * p.maxAlfa
        : ilerleme < 0.7
        ? p.maxAlfa
        : p.maxAlfa * (1 - (ilerleme - 0.7) / 0.3);
      p.x += p.vx;
      p.y += p.vy;
      p.vy -= 0.008;
      if (p.omur >= p.maxOmur) {
        const yeni = parcacikOlustur(cx, cy);
        Object.assign(p, yeni);
      }
      if (p.alfa <= 0) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alfa);
      ctx.fillStyle = p.renk;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.boyut, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    rafId = requestAnimationFrame(ciz);
  }

  ciz();

  return () => {
    aktif = false;
    if (rafId) cancelAnimationFrame(rafId);
  };
}
