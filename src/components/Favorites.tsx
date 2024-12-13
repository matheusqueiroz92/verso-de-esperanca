import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Bookmark, Trash2 } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Bookmark className="w-6 h-6 mr-2" />
              Versículos Favoritos
            </h2>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)]">
          {favorites.length > 0 ? (
            <div className="space-y-4">
              {favorites.map((favorite) => (
                <Card
                  key={favorite.id}
                  className="bg-white/10 backdrop-blur border-white/20"
                >
                  <div className="p-6">
                    <p className="text-lg text-white/90 mb-2">
                      {favorite.text}
                    </p>
                    <div className="flex justify-between items-center">
                      <Button
                        variant="link"
                        className="text-white/70 hover:text-white p-0"
                        onClick={() =>
                          navigate(
                            `/book/${favorite.bookId}/chapter/${favorite.chapter}`
                          )
                        }
                      >
                        {favorite.reference}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-400 hover:text-red-500"
                        onClick={() => removeFavorite(favorite.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <div className="p-6 text-center text-white/70">
                Nenhum versículo favorito ainda.
              </div>
            </Card>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
