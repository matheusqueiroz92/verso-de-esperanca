import BackgroundImage from "./BackgroundImage";
import BibleVerse from "@/components/BibleVerse";
import Clock from "./Clock";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // se estiver usando react-router-dom
import SideBar from "@/components/SideBar";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className="layout-container">
      <header>
        <BackgroundImage />
        <Clock />
        <h1>Verso de Esperança</h1>
        <SideBar />
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar na bíblia"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
          <button type="submit">Buscar</button>
        </form>
      </header>

      <main>
        <BibleVerse />
      </main>

      <footer>
        Desenvolvido por Matheus Queiroz © Todos os direitos reservados.
      </footer>
    </div>
  );
}
