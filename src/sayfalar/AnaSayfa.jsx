import DevWidget from '../components/DevWidget';
import { tumHafizaSifirla } from '../utils/sifirla';

export default function AnaSayfa() {
  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>
      <DevWidget sayfa="Anasayfa" />
      <button
        onClick={() => { if (window.confirm('Tüm hafıza ve test verisi silinecek. Emin misin?')) tumHafizaSifirla(); }}
        style={{position:'fixed',bottom:20,left:20,background:'rgba(220,50,50,0.9)',color:'#fff',border:'none',borderRadius:8,padding:'8px 12px',fontSize:11,fontWeight:600,cursor:'pointer',zIndex:99998,boxShadow:'0 4px 12px rgba(0,0,0,0.4)'}}>
        Sıfırla
      </button>
    </div>
  );
}
