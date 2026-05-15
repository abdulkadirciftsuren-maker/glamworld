function TanismaIcon({ size = 48, color = '#40E0D0', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="20" cy="18" r="8" stroke={color} strokeWidth="2" />
      <path d="M4 42 Q4 28 20 28 Q36 28 36 42" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <circle cx="44" cy="18" r="8" stroke={color} strokeWidth="2" />
      <path d="M28 42 Q28 28 44 28 Q60 28 60 42" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M32 36 Q24 30 24 26 Q24 22 28 22 Q30 22 32 24 Q34 22 36 22 Q40 22 40 26 Q40 30 32 36 Z" stroke={color} strokeWidth="1.5" fill={color} fillOpacity="0.3" />
      <polygon points="32,4 34,8 38,8 35,11 37,15 32,12 27,15 29,11 26,8 30,8" stroke="#4A90E2" strokeWidth="1" fill="#4A90E2" fillOpacity="0.35" />
    </svg>
  );
}
export default TanismaIcon;
