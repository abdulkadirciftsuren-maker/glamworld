import './AltinImza.css';

export default function AltinImza({ text }) {
  if (!text) return null;
  return (
    <div className="altin-imza">
      <div className="altin-imza-satir">
        <span className="altin-imza-nokta" />
        <span className="altin-imza-yazi">{text}</span>
        <span className="altin-imza-nokta" />
      </div>
      <div className="altin-imza-yansima" aria-hidden="true">
        <span className="altin-imza-nokta" />
        <span className="altin-imza-yazi">{text}</span>
        <span className="altin-imza-nokta" />
      </div>
    </div>
  );
}
