function AnasayfaIcon({ size = 24, color = '#FFD700' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
      <circle cx="12" cy="8" r="1" fill={color} />
    </svg>
  );
}
export default AnasayfaIcon;
