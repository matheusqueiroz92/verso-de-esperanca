import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, Menu } from "lucide-react";
import { bibleBooks } from "../utils/bibleBooks";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [expandedOldTestment, setExpandedOldTestment] = useState(false);
  const [expandedNewTestment, setExpandedNewTestment] = useState(false);
  const [expandedBook, setExpandedBook] = useState("");
  const navigate = useNavigate();

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
        <ScrollArea className="h-full">
          <div className="p-6">
            <h2 className="text-xl font-bold text-center text-white mb-6">
              Bíblia Sagrada
            </h2>

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
                    {bibleBooks
                      .filter((book) => book.testament === "VT")
                      .map((book) => (
                        <Collapsible key={book.name}>
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
                                {Array.from({ length: book.chapters }).map(
                                  (_, i) => (
                                    <Button
                                      key={i}
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-start text-xs text-white/70 hover:bg-white/10"
                                      onClick={() =>
                                        navigate(
                                          `/book/${book.abbrev.pt}/chapter/${
                                            i + 1
                                          }`
                                        )
                                      }
                                    >
                                      Capítulo {i + 1}
                                    </Button>
                                  )
                                )}
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
                    {bibleBooks
                      .filter((book) => book.testament === "NT")
                      .map((book) => (
                        <Collapsible key={book.name}>
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
                                {Array.from({ length: book.chapters }).map(
                                  (_, i) => (
                                    <Button
                                      key={i}
                                      variant="ghost"
                                      size="sm"
                                      className="w-full justify-start text-xs text-white/70 hover:bg-white/10"
                                      onClick={() =>
                                        navigate(
                                          `/book/${book.abbrev.pt}/chapter/${
                                            i + 1
                                          }`
                                        )
                                      }
                                    >
                                      Capítulo {i + 1}
                                    </Button>
                                  )
                                )}
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
