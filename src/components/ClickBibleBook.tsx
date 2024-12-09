import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2 } from "lucide-react";

interface VerseType {
  number: number;
  text: string;
}

export default function ClickBibleBook() {
  const { abbrevBook, chapterNumber } = useParams();
  const [verses, setVerses] = useState<VerseType[]>([]);
  const [bookName, setBookName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!abbrevBook || !chapterNumber) return;

    const fetchChapterVerses = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://www.abibliadigital.com.br/api/verses/nvi/${abbrevBook}/${chapterNumber}/`
        );
        setVerses(response.data.verses);
        setBookName(response.data.book.name);
      } catch (error) {
        console.error("Erro ao buscar versículos:", error);
      }
      setLoading(false);
    };

    fetchChapterVerses();
  }, [abbrevBook, chapterNumber]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          {bookName} - Capítulo {chapterNumber}
        </h2>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <div className="p-6 space-y-4">
                {verses.map((verse, index) => (
                  <div key={index} className="flex gap-4 text-white">
                    <span className="text-white/60 font-medium min-w-[24px]">
                      {verse.number}
                    </span>
                    <p className="text-white/90">{verse.text}</p>
                  </div>
                ))}
              </div>
            </Card>
          </ScrollArea>
        )}
      </div>
    </div>
  );
}
