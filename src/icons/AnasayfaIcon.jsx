function AnasayfaIcon({ size = 48, color = '#4A90E2', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M8 28 L32 8 L56 28" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 24 L14 54 L26 54 L26 40 L38 40 L38 54 L50 54 L50 24" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(74,144,226,0.1)" />
      <polygon points="32,8 36,12 32,16 28,12" stroke={color} strokeWidth="1.5" fill="rgba(74,144,226,0.4)" />
      <rect x="26" y="40" width="12" height="14" rx="2" stroke={color} strokeWidth="1.5" fill="rgba(74,144,226,0.15)" />
    </svg>
  );
}
export default AnasayfaIcon;
