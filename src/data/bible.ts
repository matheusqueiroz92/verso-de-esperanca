import type { BibleBook, BibleChapter, BibleVerse } from "./types";
import { convertBibleData } from "./bibleConverter";
import rawBibleJson from "./bible-nvi.json";

// Interface para a exportação de funções utilitárias
export interface BibleUtils {
  getBook: (id: string) => BibleBook | undefined;
  getChapter: (bookId: string, chapter: number) => BibleChapter | undefined;
  getRandomVerse: () => { text: string; reference: string };
  searchBible: (
    query: string
  ) => Array<{ book: string; chapter: number; verse: number; text: string }>;
}

export const bibleData = convertBibleData(rawBibleJson);

// Funções utilitárias

// Função que retorna o livro da bíblia
export const getBook = (id: string): BibleBook | undefined =>
  bibleData.find((book) => book.id === id);

// Funçao que retorna o capítulo da bíblia
export const getChapter = (
  bookId: string,
  chapter: number
): BibleChapter | undefined => {
  const book = getBook(bookId);
  return book?.chapters.find((c) => c.chapter === chapter);
};

// Funçao retorna um verso bíblico aleatório
export const getRandomVerse = () => {
  const randomBook = bibleData[Math.floor(Math.random() * bibleData.length)];
  const randomChapter =
    randomBook.chapters[Math.floor(Math.random() * randomBook.chapters.length)];
  const randomVerse =
    randomChapter.verses[
      Math.floor(Math.random() * randomChapter.verses.length)
    ];

  return {
    text: randomVerse.text,
    reference: `${randomBook.name} ${randomChapter.chapter}:${randomVerse.number}`,
  };
};

// Funçao para buscar na bíblia pelo termo (query)
export const searchBible = (query: string) => {
  const results: Array<{
    book: string;
    chapter: number;
    verse: number;
    text: string;
  }> = [];

  for (const book of bibleData) {
    for (const chapter of book.chapters) {
      for (const verse of chapter.verses) {
        if (verse.text.toLowerCase().includes(query.toLowerCase())) {
          results.push({
            book: book.name,
            chapter: chapter.chapter,
            verse: verse.number,
            text: verse.text,
          });
        }
      }
    }
  }

  return results;
};

// Função que retorna os livros pelo testamento
export const getBooksByTestament = (testament: "VT" | "NT"): BibleBook[] => {
  return bibleData.filter((book) => book.testament === testament);
};

// Função que retorna o versículo
export const getVerse = (bookId: string, chapter: number, verse: number) => {
  const chapterData = getChapter(bookId, chapter);
  return chapterData?.verses.find((v) => v.number === verse);
};

// Função que retorna os versículos de determinado capítulo
export const getVerses = (
  bookId: string,
  chapter: number
): BibleVerse[] | undefined => {
  const chapterData = getChapter(bookId, chapter);
  return chapterData?.verses;
};

// Função que retorna as informações do livro da bíblia
export const getBookInfo = (bookId: string) => {
  const book = getBook(bookId);
  if (!book) return null;

  return {
    id: book.id,
    name: book.name,
    author: book.author,
    group: book.group,
    testament: book.testament,
    chaptersCount: book.chapters.length,
  };
};

// Função que retorna a referência bíblica
export const getFullReference = (
  bookId: string,
  chapter: number,
  verse: number
) => {
  const book = getBook(bookId);
  if (!book) return "";

  return `${book.name} ${chapter}:${verse}`;
};

export const Bible: BibleUtils = {
  getBook,
  getChapter,
  getRandomVerse,
  searchBible,
};

export default Bible;
