export default function PrlErkekIkon({ size = 24, color = '#FFD700', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3 7H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 7H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 9L12 5L16 9L12 19L8 9Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 9H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 9L12 19" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M14 9L12 19" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M3 17H7" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 17H21" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
