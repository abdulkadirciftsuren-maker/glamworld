export default function LuksYukleme({ mesaj = 'Yükleniyor...' }) {
  return (
    <div style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',background:'rgba(0,0,0,0.88)',zIndex:999999,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20,backdropFilter:'blur(8px)'}}>
      <div style={{width:70,height:70,border:'4px solid rgba(255,215,0,0.2)',borderTop:'4px solid #FFD700',borderRadius:'50%',animation:'lukspin 1s linear infinite',boxShadow:'0 0 30px rgba(255,215,0,0.4)'}} />
      <p style={{color:'#FFD700',fontFamily:'Cormorant Garamond,serif',fontSize:18,margin:0,letterSpacing:1,textShadow:'0 0 10px rgba(255,215,0,0.5)'}}>{mesaj}</p>
      <style>{`@keyframes lukspin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
