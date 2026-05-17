import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const ANAHTAR = 'glamworld_son_rota';
const HATIRLANACAK = ['/uye-ol', '/giris'];

export function useRotaHafiza() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (HATIRLANACAK.includes(location.pathname)) {
      try { localStorage.setItem(ANAHTAR, location.pathname); } catch {}
    } else if (location.pathname === '/') {
      try { localStorage.removeItem(ANAHTAR); } catch {}
    }
  }, [location.pathname]);

  useEffect(() => {
    const sonRota = localStorage.getItem(ANAHTAR);
    if (sonRota && HATIRLANACAK.includes(sonRota) && location.pathname === '/' && !auth.currentUser) {
      navigate(sonRota, { replace: true });
    }
  }, []);
}
