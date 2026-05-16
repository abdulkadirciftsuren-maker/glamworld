export default function PrlMusteriIkon({ size = 24, color = '#FFD700', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="12" cy="4" rx="3" ry="1.2" stroke={color} strokeWidth="1.5" />
      <circle cx="9" cy="4" r="0.4" fill={color} />
      <circle cx="15" cy="4" r="0.4" fill={color} />
      <circle cx="12" cy="4" r="0.4" fill={color} />
      <path d="M12 6.5L8 12C8 16 10 20 12 21C14 20 16 16 16 12L12 6.5Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 12H16" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M10 9L12 21" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M14 9L12 21" stroke={color} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}
