function CanliYayinIcon({ size = 48, color = '#9370DB', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="26" r="18" stroke={color} strokeWidth="2" />
      <circle cx="32" cy="26" r="11" stroke={color} strokeWidth="1.5" />
      <circle cx="32" cy="26" r="5" fill="#DC143C" />
      <path d="M20 46 Q26 42 32 46" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M16 52 Q24 46 32 52" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M12 58 Q22 50 32 58" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
export default CanliYayinIcon;
