export default function PrlTarafsizIkon({ size = 24, color = '#FFD700', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="12" cy="12" r="4.5" stroke={color} strokeWidth="1.5" />
      <path d="M12 8.5L9.5 12L12 15.5L14.5 12L12 8.5Z" stroke={color} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M9.5 12H14.5" stroke={color} strokeWidth="1" />
      <path d="M12 3V5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 18.5V21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 12H5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18.5 12H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5.5 5.5L7 7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M17 17L18.5 18.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M18.5 5.5L17 7" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M7 17L5.5 18.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}
