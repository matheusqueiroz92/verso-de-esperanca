import { useState, useEffect } from "react";
import type { Favorite } from "@/types/Favorite";

export function useFavorites() {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("bible-favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const addFavorite = (favorite: Omit<Favorite, "id" | "dateAdded">) => {
    const newFavorite: Favorite = {
      ...favorite,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    };

    setFavorites((prev) => {
      const updated = [...prev, newFavorite];
      localStorage.setItem("bible-favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.filter((fav) => fav.id !== id);
      localStorage.setItem("bible-favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (bookId: string, chapter: number, verse: number) => {
    return favorites.some(
      (fav) =>
        fav.bookId === bookId && fav.chapter === chapter && fav.verse === verse
    );
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
