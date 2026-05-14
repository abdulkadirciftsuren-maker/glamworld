import { useLocation } from 'react-router-dom';
import './UstSerit.css';

export default function UstSerit() {
  const { pathname } = useLocation();
  if (pathname !== '/') return null;
  return <div className="ust-serit" />;
}
