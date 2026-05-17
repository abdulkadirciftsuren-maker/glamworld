export function sesTaniRaporu() {
  const sonuc = {
    audioContextDestek: !!(window.AudioContext || window.webkitAudioContext),
    webAudioDestek:     typeof AudioContext !== 'undefined',
    htmlAudioDestek:    typeof Audio !== 'undefined',
    userAgent:          navigator.userAgent,
    platform:           navigator.platform,
    online:             navigator.onLine,
    cookieEnabled:      navigator.cookieEnabled,
    permissions:        'permissions' in navigator,
  };
  console.table(sonuc);
  return sonuc;
}

if (typeof window !== 'undefined') {
  window.GLAMSES_TANI = sesTaniRaporu;
  console.log('[GLAMSES] Tanı için console\'da: GLAMSES_TANI()');
}
