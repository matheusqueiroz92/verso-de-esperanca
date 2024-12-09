import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchBarProps {
  handleSearchSubmit: (e: React.FormEvent) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function SearchBar({
  handleSearchSubmit,
  searchQuery,
  setSearchQuery,
}: SearchBarProps) {
  return (
    <form onSubmit={handleSearchSubmit} className="flex gap-2 w-full max-w-md">
      <Input
        type="search"
        placeholder="Buscar versículo..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-white/20 border-white/30 text-white placeholder:text-white/70"
      />
      <Button
        type="submit"
        variant="outline"
        className="bg-white/20 hover:bg-white/30"
      >
        <Search className="h-4 w-4" />
      </Button>
    </form>
  );
}
