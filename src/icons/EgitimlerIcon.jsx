function EgitimlerIcon({ size = 24, color = '#FFD700' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10l-10-7L2 10l10 7 10-7z" />
      <path d="M6 12v5c0 1.657 2.686 3 6 3s6-1.343 6-3v-5" />
      <line x1="22" y1="10" x2="22" y2="16" />
      <circle cx="22" cy="17" r="1" fill={color} stroke="none" />
      <line x1="12" y1="3" x2="12" y2="3.5" strokeWidth="2" />
    </svg>
  );
}
export default EgitimlerIcon;
