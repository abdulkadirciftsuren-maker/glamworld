function HaritadaBulIcon({ size = 48, color = '#4A90E2', className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="32" cy="24" r="14" stroke={color} strokeWidth="2" fill="rgba(74,144,226,0.12)" />
      <path d="M18 30 Q20 42 32 56 Q44 42 46 30" stroke={color} strokeWidth="2" fill="rgba(74,144,226,0.1)" />
      <polygon points="32,15 36,22 32,29 28,22" stroke="#4A90E2" strokeWidth="1.5" fill="rgba(74,144,226,0.4)" />
      <path d="M6 60 Q14 55 22 60 Q30 65 38 60 Q46 55 54 60 Q60 64 62 61" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  );
}
export default HaritadaBulIcon;
