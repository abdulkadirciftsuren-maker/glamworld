import { ulkeRengi } from '../../utils/ulkeler';

export default function TelefonUlkeBtn({ ulke, onClick }) {
  const renk = ulkeRengi(ulke.kod);
  return (
    <button
      type="button"
      onClick={onClick}
      style={{background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,215,0,0.4)',borderRadius:14,padding:'8px 14px 8px 8px',cursor:'pointer',display:'flex',alignItems:'center',gap:10,minWidth:155,transition:'all .2s'}}
      onMouseEnter={e=>{e.currentTarget.style.borderColor='#FFD700';e.currentTarget.style.boxShadow='0 0 12px rgba(255,215,0,0.2)';}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(255,215,0,0.4)';e.currentTarget.style.boxShadow='none';}}>
      <div style={{width:44,height:44,borderRadius:'50%',background:renk,border:'2px solid #FFD700',boxShadow:`0 0 10px ${renk}66,0 0 4px rgba(255,215,0,0.5)`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
        <span style={{color:'#fff',fontSize:11,fontWeight:700,letterSpacing:.5,textShadow:'0 1px 2px rgba(0,0,0,0.6)'}}>{ulke.telKod}</span>
      </div>
      <div style={{flex:1,display:'flex',flexDirection:'column',alignItems:'flex-start',gap:2}}>
        <span style={{color:'#FFD700',fontSize:14,fontWeight:600,lineHeight:1.1}}>{ulke.isim}</span>
        <span style={{color:'rgba(255,215,0,0.5)',fontSize:9,letterSpacing:.5,fontWeight:500}}>{ulke.kod}</span>
      </div>
      <span style={{color:'rgba(255,215,0,0.5)',fontSize:10,marginLeft:4}}>▼</span>
    </button>
  );
}
