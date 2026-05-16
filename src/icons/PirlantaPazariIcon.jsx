function PirlantaPazariIcon({ size = 24, color = '#FFD700' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6l9 13 9-13-3-4z" />
      <path d="M3 6h18" />
      <path d="M12 2l3 4-3 13-3-13 3-4z" />
      <circle cx="19" cy="19" r="2.5" fill="none" />
      <path d="M17.5 19l.8.8L20.5 17" />
    </svg>
  );
}
export default PirlantaPazariIcon;
