import DevWidget from './components/DevWidget';
import './App.css';

function App() {
  return (
    <div className="App" style={{ background: '#0a0a0a', minHeight: '100vh', color: '#fff' }}>
      <header style={{ textAlign: 'center', padding: '60px 20px' }}>
        <h1 style={{ color: '#FFD700', fontFamily: 'Georgia, serif', fontSize: '2.5rem', margin: 0 }}>
          GLAMWORLD
        </h1>
        <p style={{ color: 'rgba(255,215,0,0.6)', marginTop: 8 }}>
          Dünyanın Her Yerinden Profesyoneller Bir Arada
        </p>
      </header>
      <DevWidget sayfa="Anasayfa" />
    </div>
  );
}

export default App;
