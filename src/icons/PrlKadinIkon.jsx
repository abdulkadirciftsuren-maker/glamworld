export default function PrlKadinIkon({ size = 24, color = '#FFD700', ...props }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 7C7 5 10 4.5 12 4.5C14 4.5 17 5 20 7" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <path d="M12 4L8 12L12 20L16 12L12 4Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 12H16" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 8L14 16" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M14 8L10 16" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M4 17C7 19 10 19.5 12 19.5C14 19.5 17 19 20 17" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}
