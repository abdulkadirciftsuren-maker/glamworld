function HaritadaBulIcon({ size = 24, color = '#FFD700' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.686 2 6 4.686 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.314-2.686-6-6-6z" />
      <path d="M10 7l1.5 1.5L14 6" />
      <path d="M4 20c0 0 2-1 4-1s3 1 5 1 3-1 5-1" strokeOpacity="0.4" />
    </svg>
  );
}
export default HaritadaBulIcon;
