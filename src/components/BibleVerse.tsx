import { useEffect, useState } from "react";
import { fetchBibleVerse } from "../utils/fetchApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BibleVerse() {
  const [verse, setVerse] = useState("");
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadVerse = async (ignoreCache = false) => {
    setIsLoading(true);
    try {
      // Se ignoreCache for true, remover o cache antes de buscar
      if (ignoreCache) {
        localStorage.removeItem("bibleVerse");
        localStorage.removeItem("lastVerseFetchTime");
      }
      const verse = await fetchBibleVerse();
      setVerse(verse);
    } catch (error) {
      console.error("Erro ao carregar versículo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVerse();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(verse).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNewVerse = () => {
    loadVerse(true); // Passa true para ignorar o cache
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-6">
      <Card
        onClick={copyToClipboard}
        className="w-full bg-black/50 backdrop-blur cursor-pointer hover:bg-black/60 transition-colors"
      >
        <CardContent className="p-6">
          <p className="text-xl md:text-2xl text-white text-center leading-relaxed">
            {verse}
          </p>
          {copied && (
            <p className="text-blue-400 text-center mt-2">Versículo copiado!</p>
          )}
        </CardContent>
      </Card>

      <Button
        onClick={handleNewVerse}
        variant="outline"
        className="bg-black/30 border-white/50 text-white hover:bg-black/50"
        disabled={isLoading}
      >
        {isLoading ? "Gerando..." : "Gerar outro versículo"}
      </Button>
    </div>
  );
}
