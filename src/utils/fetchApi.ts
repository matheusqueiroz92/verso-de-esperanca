import { api } from "@/lib/api";
import axios from "axios";

interface BibleBook {
  id: string;
  bibleId: string;
  abbreviation: string;
  name: string;
  nameLong: string;
}

interface BibleChapter {
  id: string;
  bibleId: string;
  number: string;
  bookId: string;
  reference: string;
}

interface BibleVerse {
  id: string;
  content: string;
  reference: string;
}

interface APIResponse<T> {
  data: T;
}

interface SearchVerse {
  text: string;
  reference: string;
}

const BIBLE_ID = "90799bb5b996fddc-01";
const SIX_HOURS = 6 * 60 * 1000;

const cleanVerseText = (htmlText: string): string => {
  const textWithoutTags = htmlText.replace(/<[^>]*>/g, "");
  const cleanText = textWithoutTags.trim().replace(/\s+/g, " ");
  return cleanText;
};

export const fetchBackgroundImage = async (): Promise<string> => {
  const cachedImage = localStorage.getItem("backgroundImage");
  const lastFetchTime = localStorage.getItem("lastFetchTime");
  const currentTime = Date.now();

  if (
    cachedImage &&
    Number(lastFetchTime) &&
    currentTime - Number(lastFetchTime) < SIX_HOURS
  ) {
    return cachedImage;
  }

  try {
    const response = await axios.get(
      "https://api.unsplash.com/photos/random?query=nature&client_id=RzRfXcqiraotJx6lZPv_ia4WoND21jo_GW3w7ZDnywY"
    );
    const imageUrl = response.data.urls.full;

    localStorage.setItem("backgroundImage", imageUrl);
    localStorage.setItem("lastFetchTime", currentTime.toString());

    return imageUrl;
  } catch (error) {
    console.error("Erro ao buscar imagem:", error);
    return "";
  }
};

export const fetchBibleVerse = async (): Promise<string> => {
  const cachedVerse = localStorage.getItem("bibleVerse");
  const lastFetchTime = localStorage.getItem("lastVerseFetchTime");
  const currentTime = Date.now();

  if (
    cachedVerse &&
    Number(lastFetchTime) &&
    currentTime - Number(lastFetchTime) < SIX_HOURS
  ) {
    return cachedVerse;
  }

  try {
    const booksResponse = await api.get<APIResponse<BibleBook[]>>(
      `/bibles/${BIBLE_ID}/books`
    );

    const books = booksResponse.data.data;
    const randomBook = books[Math.floor(Math.random() * books.length)];

    const chaptersResponse = await api.get<APIResponse<BibleChapter[]>>(
      `/bibles/${BIBLE_ID}/books/${randomBook.id}/chapters`
    );

    const chapters = chaptersResponse.data.data.filter(
      (chapter) => chapter.number !== "intro"
    );
    const randomChapter = chapters[Math.floor(Math.random() * chapters.length)];

    const versesResponse = await api.get<APIResponse<BibleVerse[]>>(
      `/bibles/${BIBLE_ID}/chapters/${randomChapter.id}/verses`
    );

    const verses = versesResponse.data.data;
    const randomVerse = verses[Math.floor(Math.random() * verses.length)];

    const verseResponse = await api.get<APIResponse<BibleVerse>>(
      `/bibles/${BIBLE_ID}/verses/${randomVerse.id}`
    );

    const verse = verseResponse.data.data;
    const cleanContent = cleanVerseText(verse.content);
    const responseData = `${cleanContent} - ${randomBook.name} ${verse.reference}`;

    localStorage.setItem("bibleVerse", responseData);
    localStorage.setItem("lastVerseFetchTime", currentTime.toString());

    return responseData;
  } catch (error) {
    console.error("Erro ao buscar versículo:", error);
    return "Não foi possível carregar o versículo.";
  }
};

export const searchVerses = async (query: string): Promise<SearchVerse[]> => {
  try {
    const response = await api.get<APIResponse<{ verses: SearchVerse[] }>>(
      `/bibles/${BIBLE_ID}/search?query=${query}`
    );

    return response.data.data.verses.map((verse) => ({
      text: verse.text,
      reference: verse.reference,
      book: {
        name: verse.reference.split(" ")[0],
      },
      chapter: Number.parseInt(
        verse.reference.split(":")[0].split(" ").pop() || "0"
      ),
      number: Number.parseInt(verse.reference.split(":")[1] || "0"),
    }));
  } catch (error) {
    console.error("Erro ao buscar versículos:", error);
    return [];
  }
};

export const getChapterVerses = async (
  chapterId: string
): Promise<BibleVerse | null> => {
  try {
    const response = await api.get<APIResponse<BibleVerse>>(
      `/bibles/${BIBLE_ID}/chapters/${chapterId}`
    );

    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar capítulo:", error);
    return null;
  }
};

export const getBookChapters = async (
  bookId: string
): Promise<BibleChapter[]> => {
  try {
    const response = await api.get<APIResponse<BibleChapter[]>>(
      `/bibles/${BIBLE_ID}/books/${bookId}/chapters`
    );

    return response.data.data.filter((chapter) => chapter.number !== "intro");
  } catch (error) {
    console.error("Erro ao buscar capítulos:", error);
    return [];
  }
};
