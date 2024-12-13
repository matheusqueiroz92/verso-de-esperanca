import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  ArrowLeft,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { bibleData } from "@/data/bible";
import { toast } from "@/hooks/use-toast";
import { Bookmark, BookmarkX } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

interface ChapterContent {
  book: string;
  chapter: number;
  verses: Array<{ number: number; text: string }>;
}

export default function ClickBibleBook() {
  const { bookId, chapterId } = useParams<{
    bookId: string;
    chapterId: string;
  }>();
  const [chapterContent, setChapterContent] = useState<ChapterContent | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookId || !chapterId) {
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const book = bibleData.find((b) => b.id === bookId);

      if (!book) {
        throw new Error("Livro não encontrado");
      }

      const chapterData = book.chapters[Number(chapterId) - 1];

      if (!chapterData) {
        throw new Error("Capítulo não encontrado");
      }

      setChapterContent({
        book: book.name,
        chapter: chapterData.chapter,
        verses: chapterData.verses,
      });
    } catch (error) {
      console.error("Erro ao carregar capítulo:", error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o conteúdo do capítulo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [bookId, chapterId, navigate]);

  const handleNavigateChapter = (direction: "prev" | "next") => {
    if (!bookId || !chapterId || !chapterContent) return;

    const currentBook = bibleData.find((b) => b.id === bookId);
    if (!currentBook) return;

    const currentChapter = Number.parseInt(chapterId);
    let nextChapter: number;
    let nextBookId: string = bookId;

    if (direction === "next") {
      if (currentChapter < currentBook.chapters.length) {
        nextChapter = currentChapter + 1;
      } else {
        const currentBookIndex = bibleData.findIndex((b) => b.id === bookId);
        if (currentBookIndex < bibleData.length - 1) {
          nextBookId = bibleData[currentBookIndex + 1].id;
          nextChapter = 1;
        } else {
          return;
        }
      }
    } else {
      if (currentChapter > 1) {
        nextChapter = currentChapter - 1;
      } else {
        const currentBookIndex = bibleData.findIndex((b) => b.id === bookId);
        if (currentBookIndex > 0) {
          nextBookId = bibleData[currentBookIndex - 1].id;
          const previousBook = bibleData[currentBookIndex - 1];
          nextChapter = previousBook.chapters.length;
        } else {
          return;
        }
      }
    }

    navigate(`/book/${nextBookId}/chapter/${nextChapter}`);
  };

  const handleCopyText = async () => {
    if (!chapterContent) return;

    try {
      setCopying(true);
      const text = chapterContent.verses
        .map((verse) => `${verse.number}. ${verse.text}`)
        .join("\n");

      await navigator.clipboard.writeText(
        `${chapterContent.book} ${chapterContent.chapter}\n\n${text}`
      );

      toast({
        title: "Texto copiado!",
        description: "O conteúdo foi copiado para a área de transferência.",
      });

      // Mantem o estado "copying" por 2 segundos
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
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
          </div>

          <div className="flex items-center gap-2">
            <div className="flex bg-black/20 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => handleNavigateChapter("prev")}
                disabled={
                  !chapterContent ||
                  (bookId === bibleData[0].id && chapterId === "1")
                }
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => handleNavigateChapter("next")}
                disabled={
                  !chapterContent ||
                  (bookId === bibleData[bibleData.length - 1].id &&
                    Number(chapterId) ===
                      bibleData[bibleData.length - 1].chapters.length)
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="secondary"
              className="text-white bg-white/10 hover:bg-white/20 min-w-[140px] transition-all duration-200"
              onClick={handleCopyText}
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
                    <span>Copiar capítulo</span>
                  </>
                )}
              </span>
            </Button>
          </div>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {chapterContent
            ? `${chapterContent.book} ${chapterContent.chapter}`
            : "Capítulo não encontrado"}
        </h2>

        <ScrollArea className="h-[calc(100vh-200px)]">
          {chapterContent ? (
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <div className="p-6">
                <div className="space-y-4">
                  {chapterContent.verses.map((verse) => {
                    // Early return se não tiver bookId
                    if (!bookId) return null;

                    const favoriteId = `${bookId}-${chapterContent.chapter}-${verse.number}`;
                    const verseIsFavorite = isFavorite(
                      bookId,
                      chapterContent.chapter,
                      verse.number
                    );

                    return (
                      <div
                        key={verse.number}
                        className="flex gap-4 text-white group"
                      >
                        <span className="text-white/60 font-medium min-w-[24px]">
                          {verse.number}
                        </span>
                        <p className="text-white/90 flex-1">{verse.text}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => {
                            if (verseIsFavorite) {
                              removeFavorite(favoriteId);
                            } else {
                              addFavorite({
                                bookId,
                                chapter: chapterContent.chapter,
                                verse: verse.number,
                                text: verse.text,
                                reference: `${chapterContent.book} ${chapterContent.chapter}:${verse.number}`,
                              });
                            }
                          }}
                        >
                          {verseIsFavorite ? (
                            <BookmarkX className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <Bookmark className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          ) : (
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <div className="p-6 text-center text-white/70">
                Conteúdo não disponível
              </div>
            </Card>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
