import axios from "axios";

interface AxiosConfig {
  headers: {
    "api-key": string;
  };
}

interface BibleBook {
  id: string;
  name: string;
}

interface BibleChapter {
  id: string;
  reference: string;
}

interface BibleVerse {
  id: string;
  reference: string;
  content: string;
}

interface SearchVerse {
  text: string;
  reference: string;
}

interface APIResponse<T> {
  data: T;
}

interface UnsplashResponse {
  urls: {
    full: string;
  };
}

const API_KEY = "af8b25f22a16a3b76ad6744bff1e8950";
const BIBLE_ID = "90799bb5b996fddc-01";
const SIX_HOURS = 6 * 60 * 1000;

const config: AxiosConfig = {
  headers: {
    "api-key": API_KEY,
  },
};

export const fetchBackgroundImage = async (): Promise<string> => {
  const cachedImage = localStorage.getItem("backgroundImage");
  const lastFetchTime = localStorage.getItem("lastFetchTime");
  const currentTime = Date.now();

  const lastFetchTimeNumber = Number(lastFetchTime);

  if (
    cachedImage &&
    lastFetchTimeNumber &&
    currentTime - lastFetchTimeNumber < SIX_HOURS
  ) {
    return cachedImage;
  }

  try {
    const response = await axios.get<UnsplashResponse>(
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
  const cleanVerseText = (htmlText: string): string => {
    // Remove todas as tags HTML exceto o conteúdo
    const textWithoutTags = htmlText.replace(/<[^>]*>/g, "");

    // Remove espaços extras e quebras de linha
    const cleanText = textWithoutTags.trim().replace(/\s+/g, " ");

    // Remove "data added" e referências duplicadas
    return cleanText.replace(/\[.*?\]/g, "").replace(/\s+/g, " ");
  };

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
    const booksResponse = await axios.get<APIResponse<BibleBook[]>>(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/books`,
      config
    );
    const books = booksResponse.data.data;
    const randomBookIndex = Math.floor(Math.random() * books.length);
    const randomBook = books[randomBookIndex];

    const chaptersResponse = await axios.get<APIResponse<BibleChapter[]>>(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/books/${randomBook.id}/chapters`,
      config
    );
    const chapters = chaptersResponse.data.data;
    const randomChapterIndex = Math.floor(Math.random() * chapters.length);
    const randomChapter = chapters[randomChapterIndex];

    const versesResponse = await axios.get<APIResponse<BibleVerse[]>>(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/chapters/${randomChapter.id}/verses`,
      config
    );
    const verses = versesResponse.data.data;
    const randomVerseIndex = Math.floor(Math.random() * verses.length);
    const randomVerse = verses[randomVerseIndex];

    const verseResponse = await axios.get<APIResponse<BibleVerse>>(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/verses/${randomVerse.id}`,
      config
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

export const fetchBibliVerseButton = async (): Promise<string> => {
  return fetchBibleVerse();
};

export const searchVerses = async (query: string): Promise<SearchVerse[]> => {
  try {
    const response = await axios.get<APIResponse<{ verses: SearchVerse[] }>>(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/search?query=${query}`,
      config
    );

    return response.data.data.verses.map((verse) => ({
      text: verse.text,
      reference: verse.reference,
      book: {
        name: verse.reference.split(" ")[0],
      },
      chapter: parseInt(verse.reference.split(":")[0].split(" ").pop() || "0"),
      number: parseInt(verse.reference.split(":")[1] || "0"),
    }));
  } catch (error) {
    console.error("Erro ao buscar versículos:", error);
    return [];
  }
};

export const getChapterVerses = async (
  bookId: string,
  chapterNumber: number
): Promise<BibleVerse | null> => {
  try {
    const response = await axios.get<APIResponse<BibleVerse>>(
      `https://api.scripture.api.bible/v1/bibles/${BIBLE_ID}/chapters/${bookId}.${chapterNumber}`,
      config
    );

    return response.data.data;
  } catch (error) {
    console.error("Erro ao buscar capítulo:", error);
    return null;
  }
};
