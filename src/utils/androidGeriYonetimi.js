import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function useAndroidGeri() {
  const navigate  = useNavigate();
  const location  = useLocation();

  useEffect(() => {
    if (location.pathname !== '/uye-ol' && location.pathname !== '/giris') return;

    window.history.pushState({ glamworld: true }, '');

    const onPop = () => { navigate('/', { replace: true }); };

    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, [location.pathname, navigate]);
}
