import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface BibleVerse {
  book: {
    name: string;
  };
  chapter: number;
  number: number;
  text: string;
}

export default function SearchResults() {
  const [results, setResults] = useState<BibleVerse[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://www.abibliadigital.com.br/api/verses/search",
          {
            version: "nvi",
            search: query,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setResults(response.data.verses);
      } catch (error) {
        console.error("Erro ao buscar versículos:", error);
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Resultados para: "{query}"
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((verse: BibleVerse) => (
              <Card
                key={`${verse.book.name}-${verse.chapter}-${verse.number}`}
                className="bg-white/10 backdrop-blur border-white/20"
              >
                <div className="p-4">
                  <p className="text-lg text-white leading-relaxed mb-2">
                    {verse.text}
                  </p>
                  <p className="text-sm text-white/60">
                    {verse.book.name} {verse.chapter}:{verse.number}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-white/70 py-12">
            Nenhum versículo encontrado.
          </div>
        )}
      </div>
    </div>
  );
}
