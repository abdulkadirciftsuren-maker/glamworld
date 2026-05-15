function PirlantaPazariIcon({ size = 48, color = '#FFD700', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <polygon points="20,12 44,12 52,26 32,46 12,26" stroke="#4A90E2" strokeWidth="2" fill="rgba(74,144,226,0.15)" />
      <line x1="20" y1="12" x2="32" y2="46" stroke="#4A90E2" strokeWidth="1.5" />
      <line x1="44" y1="12" x2="32" y2="46" stroke="#4A90E2" strokeWidth="1.5" />
      <line x1="12" y1="26" x2="52" y2="26" stroke="#4A90E2" strokeWidth="1.5" />
      <path d="M18 54 H46 M22 54 L20 48 H44 L42 54" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="25" cy="57" r="2" fill={color} />
      <circle cx="39" cy="57" r="2" fill={color} />
      <circle cx="8" cy="8" r="2" fill={color} />
      <circle cx="56" cy="6" r="1.5" fill={color} />
      <circle cx="58" cy="46" r="1.5" fill={color} />
    </svg>
  );
}
export default PirlantaPazariIcon;
