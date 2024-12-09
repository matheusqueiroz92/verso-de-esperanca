import { useEffect, useState } from "react";
import { fetchBibleVerse, fetchBibliVerseButton } from "../utils/fetchApi";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function BibleVerse() {
  const [verse, setVerse] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadVerse = async () => {
      const verse = await fetchBibleVerse();
      setVerse(verse);
    };
    loadVerse();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(verse).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
        onClick={async () => {
          const newVerse = await fetchBibliVerseButton();
          setVerse(newVerse);
        }}
        variant="outline"
        className="bg-black/30 border-white/50 text-white hover:bg-black/50"
      >
        Gerar outro versículo
      </Button>
    </div>
  );
}
