import './AktifEtiket.css';

export default function AktifEtiket({ text }) {
  if (!text) return null;
  return (
    <div className="ae-etiket" aria-label={`Şu an ${text} sayfasındasınız`}>
      <span className="ae-yazi">{text}</span>
      <span className="ae-ok" />
    </div>
  );
}
