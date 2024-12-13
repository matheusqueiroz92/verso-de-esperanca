import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Copy, Check, Bookmark, BookmarkX } from "lucide-react";
import { bibleData } from "@/data/bible";
import { useFavorites } from "@/hooks/useFavorites";

interface RandomVerse {
  text: string;
  reference: string;
  bookId: string;
  chapter: number;
  verse: number;
}

export default function BibleVerse() {
  const [verse, setVerse] = useState<RandomVerse | null>(null);
  const [copying, setCopying] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const getRandomVerse = useCallback(() => {
    const randomBook = bibleData[Math.floor(Math.random() * bibleData.length)];
    const randomChapter =
      randomBook.chapters[
        Math.floor(Math.random() * randomBook.chapters.length)
      ];
    const randomVerse =
      randomChapter.verses[
        Math.floor(Math.random() * randomChapter.verses.length)
      ];

    return {
      text: randomVerse.text,
      reference: `${randomBook.name} ${randomChapter.chapter}:${randomVerse.number}`,
      bookId: randomBook.id,
      chapter: randomChapter.chapter,
      verse: randomVerse.number,
    };
  }, []);

  useEffect(() => {
    setVerse(getRandomVerse());
  }, [getRandomVerse]);

  const copyToClipboard = async () => {
    if (!verse) return;

    try {
      setCopying(true);
      await navigator.clipboard.writeText(`${verse.text} - ${verse.reference}`);

      toast({
        title: "Versículo copiado!",
        description: "O texto foi copiado para a área de transferência.",
      });

      setTimeout(() => {
        setCopying(false);
      }, 2000);
    } catch (error) {
      console.log(error);

      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o texto.",
        variant: "destructive",
      });
      setCopying(false);
    }
  };

  const handleFavorite = () => {
    if (!verse) return;

    const isCurrentlyFavorite = isFavorite(
      verse.bookId,
      verse.chapter,
      verse.verse
    );
    const favoriteId = `${verse.bookId}-${verse.chapter}-${verse.verse}`;

    if (isCurrentlyFavorite) {
      removeFavorite(favoriteId);
      toast({
        title: "Removido dos favoritos",
        description: "Versículo removido dos seus favoritos",
      });
    } else {
      addFavorite({
        bookId: verse.bookId,
        chapter: verse.chapter,
        verse: verse.verse,
        text: verse.text,
        reference: verse.reference,
      });
      toast({
        title: "Adicionado aos favoritos",
        description: "Versículo adicionado aos seus favoritos",
      });
    }
  };

  const handleNewVerse = () => {
    setVerse(getRandomVerse());
  };

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-6">
      <Card className="w-full bg-black/50 backdrop-blur hover:bg-black/60 transition-colors">
        <CardContent className="p-6">
          {verse ? (
            <>
              <p className="text-xl md:text-2xl text-white text-center leading-relaxed mb-4">
                {verse.text}
              </p>
              <p className="text-white/70 text-center mb-4">
                {verse.reference}
              </p>
              <div className="flex justify-center gap-2">
                <Button
                  variant="ghost"
                  size="default"
                  className="text-white/70 hover:text-white hover:bg-white/10 min-w-[120px] transition-all duration-200"
                  onClick={copyToClipboard}
                  disabled={copying}
                >
                  <span className="flex items-center">
                    {copying ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        <span>Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        <span>Copiar</span>
                      </>
                    )}
                  </span>
                </Button>

                <Button
                  variant="ghost"
                  size="default"
                  className="text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
                  onClick={handleFavorite}
                >
                  <span className="flex items-center">
                    {isFavorite(verse.bookId, verse.chapter, verse.verse) ? (
                      <>
                        <BookmarkX className="h-4 w-4 mr-2 text-yellow-500" />
                        <span>Remover dos favoritos</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="h-4 w-4 mr-2" />
                        <span>Adicionar aos favoritos</span>
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </>
          ) : (
            <p className="text-white/70 text-center">Carregando versículo...</p>
          )}
        </CardContent>
      </Card>

      <Button
        onClick={handleNewVerse}
        variant="outline"
        className="bg-black/30 border-white/50 text-white hover:bg-black/50"
      >
        Gerar outro versículo
      </Button>
    </div>
  );
}
