import BackgroundImage from "./BackgroundImage";
import BibleVerse from "@/components/BibleVerse";
// import Clock from "./Clock";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "@/components/SideBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "./ui/separator";

export default function Layout() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundImage />
      <div className="relative z-10 flex flex-col min-h-screen bg-gradient-to-b from-black/50 to-black/30">
        <header className="flex items-center justify-between space-y-6 gap-6 mt-7 ml-20 mr-20">
          {/* <Clock /> */}
          <div className="flex items-center justify-items-center">
            <h1 className="text-center md:text-2xl font-bold text-white">
              Verso de Esperança
            </h1>
          </div>
          <SideBar />
          <form className="w-full max-w-md flex gap-2 items-center justify-center mb-7">
            <Input
              type="text"
              placeholder="Buscar na bíblia"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black/30 border-white/30 text-white placeholder:text-white/70"
            />
            <Button onClick={handleSearchSubmit} variant="secondary">
              Buscar
            </Button>
          </form>
        </header>

        <Separator className="mt-7" />

        <main className="flex-1 flex items-center justify-center p-4">
          <BibleVerse />
        </main>

        <footer className="mt-auto p-4 bg-black/80 text-white/70 text-center">
          Desenvolvido por Matheus Queiroz © Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}
