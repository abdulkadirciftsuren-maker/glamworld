function YakindaIcon({ size = 48, color = '#FFD700', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} style={{ opacity: 0.55 }}>
      <circle cx="32" cy="32" r="24" stroke={color} strokeWidth="2.5" strokeDasharray="6 4" strokeLinecap="round" />
      <line x1="32" y1="18" x2="32" y2="46" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <line x1="18" y1="32" x2="46" y2="32" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
export default YakindaIcon;
