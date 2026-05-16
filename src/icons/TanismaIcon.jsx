function TanismaIcon({ size = 24, color = '#FFD700' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="7" r="3" />
      <path d="M2 21v-1a5 5 0 0 1 5-5h2" />
      <circle cx="16" cy="7" r="3" />
      <path d="M22 21v-1a5 5 0 0 0-5-5h-2" />
      <path d="M12 14c-.5-.8-.8-1.5-.8-2 0-1 .8-1.5 1.8-.8.5.4.8.4 1 0 1-.7 1.8-.2 1.8.8 0 .5-.3 1.2-.8 2L12 17l-1.2-3z" fill={color} stroke="none" />
    </svg>
  );
}
export default TanismaIcon;
