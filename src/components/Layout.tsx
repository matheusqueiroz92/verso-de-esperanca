import BackgroundImage from './BackgroundImage';
import BibleVerse from './BibleVerse';
import Clock from './Clock';

export default function Layout() {
  return (
    <div className="layout-container">
      <BackgroundImage />
      
      <header>
        <Clock />
        <h1>Verso de Esperança</h1>
      </header>
      
      <main>
        <BibleVerse />
      </main>

      <footer>Desenvolvido por Matheus Queiroz</footer>
    </div>
  );
}