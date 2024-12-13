import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Search } from "lucide-react";
import { bibleData } from "@/data/bible";
import { toast } from "@/hooks/use-toast";

interface SearchResult {
  book: string;
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
}

export default function SearchResults() {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    if (!query.trim()) {
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const searchResults: SearchResult[] = [];

      for (const book of bibleData) {
        for (const chapter of book.chapters) {
          for (const verse of chapter.verses) {
            if (verse.text.toLowerCase().includes(query.toLowerCase())) {
              searchResults.push({
                book: book.name,
                bookId: book.id,
                chapter: chapter.chapter,
                verse: verse.number,
                text: verse.text,
              });
            }
          }
        }
      }

      setResults(searchResults);
      if (searchResults.length === 0) {
        toast({
          title: "Nenhum resultado encontrado",
          description: `Não foram encontrados versículos contendo "${query}"`,
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      toast({
        title: "Erro na busca",
        description: "Não foi possível realizar a busca",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [query, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            className="text-white hover:bg-white/10"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>

          <div className="flex items-center gap-2 text-white">
            <Search className="h-5 w-5" />
            <h2 className="text-2xl md:text-3xl font-bold">
              {results.length > 0
                ? `${results.length} resultado${
                    results.length === 1 ? "" : "s"
                  } para:`
                : "Buscando por:"}
            </h2>
            <span className="text-2xl md:text-3xl font-bold text-white/70">
              "{query}"
            </span>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              {results.map((result, index) => (
                <Card
                  key={`${result.bookId}-${result.chapter}-${result.verse}-${index}`}
                  className="bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-colors"
                >
                  <div className="p-6">
                    <p className="text-lg text-white/90 mb-2">{result.text}</p>
                    <Button
                      variant="link"
                      className="text-white/70 hover:text-white p-0"
                      onClick={() =>
                        navigate(
                          `/book/${result.bookId}/chapter/${result.chapter}`
                        )
                      }
                    >
                      {result.book} {result.chapter}:{result.verse}
                    </Button>
                  </div>
                </Card>
              ))}

              {results.length === 0 && !loading && (
                <Card className="bg-white/10 backdrop-blur border-white/20">
                  <div className="p-6 text-center">
                    <p className="text-white/70">
                      Não foram encontrados versículos contendo "{query}"
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
