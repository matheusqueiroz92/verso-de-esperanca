import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BibleVerse from "@/components/BibleVerse";
import SideBar from "@/components/SideBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import BackgroundImage from "./BackgroundImage";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="relative min-h-screen">
      <BackgroundImage />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="w-full p-6 space-y-8">
          <div className="flex justify-between items-center">
            <SideBar />
          </div>

          <div className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
              Verso de Esperança
            </h1>

            <form
              onSubmit={handleSearchSubmit}
              className="max-w-md mx-auto flex gap-2"
            >
              <Input
                type="search"
                placeholder="Buscar na bíblia..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
              <Button
                type="submit"
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                disabled={!searchQuery.trim()}
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center p-6 mt-4">
          <BibleVerse />
        </main>

        <footer className="p-6 text-center text-white/50 bg-black/20 backdrop-blur-sm">
          <p>
            Desenvolvido por Matheus Queiroz © Todos os direitos reservados.
          </p>
        </footer>
      </div>
    </div>
  );
}
