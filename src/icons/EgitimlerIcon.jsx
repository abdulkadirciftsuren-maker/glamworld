function EgitimlerIcon({ size = 48, color = '#9ACD32', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="32,14 54,26 32,38 10,26" stroke={color} strokeWidth="2" fill="rgba(154,205,50,0.15)" />
      <rect x="24" y="30" width="16" height="14" rx="2" stroke={color} strokeWidth="2" fill="rgba(154,205,50,0.1)" />
      <path d="M54 26 L54 40" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="54" cy="43" r="3" fill={color} />
      <line x1="32" y1="2" x2="32" y2="8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="43" y1="5" x2="46" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <line x1="21" y1="5" x2="18" y2="9" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M22 54 Q32 58 42 54" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
export default EgitimlerIcon;
