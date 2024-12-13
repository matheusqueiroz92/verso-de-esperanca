import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, Menu } from "lucide-react";
import { bibleData } from "@/data/bible";
import { cn } from "@/lib/utils";

// Livros corretos para cada testamento
const BOOKS_VT = [
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
];

const BOOKS_NT = [
  "MAT",
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
];

export default function Sidebar() {
  const [expandedOldTestment, setExpandedOldTestment] = useState(false);
  const [expandedNewTestment, setExpandedNewTestment] = useState(false);
  const [expandedBook, setExpandedBook] = useState("");
  const navigate = useNavigate();

  // Separar livros por testamento usando os IDs
  const oldTestamentBooks = bibleData.filter((book) =>
    BOOKS_VT.includes(book.id)
  );
  const newTestamentBooks = bibleData.filter((book) =>
    BOOKS_NT.includes(book.id)
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="fixed left-4 top-4 bg-black/50 hover:bg-black/70"
        >
          <Menu className="h-5 w-5 text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-80 p-0 bg-black/90 border-r border-white/20"
      >
        <SheetTitle className="text-xl font-bold text-center text-white p-6">
          Bíblia Sagrada
        </SheetTitle>
        <ScrollArea className="h-[calc(100vh-5rem)]">
          <div className="p-6">
            <div className="space-y-4">
              <Collapsible
                open={expandedOldTestment}
                onOpenChange={setExpandedOldTestment}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-white hover:bg-white/10"
                  >
                    Velho Testamento
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedOldTestment && "rotate-90"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 ml-4 space-y-1">
                    {oldTestamentBooks.map((book) => (
                      <Collapsible key={book.id}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-sm text-white/80 hover:bg-white/10"
                            onClick={() =>
                              setExpandedBook(
                                expandedBook === book.name ? "" : book.name
                              )
                            }
                          >
                            {book.name}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="ml-4">
                          {expandedBook === book.name && (
                            <div className="space-y-1">
                              {book.chapters.map((chapter) => (
                                <Button
                                  key={chapter.chapter}
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-xs text-white/70 hover:bg-white/10"
                                  onClick={() =>
                                    navigate(
                                      `/book/${book.id}/chapter/${chapter.chapter}`
                                    )
                                  }
                                >
                                  Capítulo {chapter.chapter}
                                </Button>
                              ))}
                            </div>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible
                open={expandedNewTestment}
                onOpenChange={setExpandedNewTestment}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-white hover:bg-white/10"
                  >
                    Novo Testamento
                    <ChevronRight
                      className={cn(
                        "h-4 w-4 transition-transform",
                        expandedNewTestment && "rotate-90"
                      )}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 ml-4 space-y-1">
                    {newTestamentBooks.map((book) => (
                      <Collapsible key={book.id}>
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-sm text-white/80 hover:bg-white/10"
                            onClick={() =>
                              setExpandedBook(
                                expandedBook === book.name ? "" : book.name
                              )
                            }
                          >
                            {book.name}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="ml-4">
                          {expandedBook === book.name && (
                            <div className="space-y-1">
                              {book.chapters.map((chapter) => (
                                <Button
                                  key={chapter.chapter}
                                  variant="ghost"
                                  size="sm"
                                  className="w-full justify-start text-xs text-white/70 hover:bg-white/10"
                                  onClick={() =>
                                    navigate(
                                      `/book/${book.id}/chapter/${chapter.chapter}`
                                    )
                                  }
                                >
                                  Capítulo {chapter.chapter}
                                </Button>
                              ))}
                            </div>
                          )}
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
