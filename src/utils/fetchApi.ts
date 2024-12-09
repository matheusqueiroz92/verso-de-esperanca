import axios from "axios";

const SIX_HOURS = 6 * 60 * 1000; // 6 horas em milissegundos

// const API_KEY = "SUA_CHAVE_API";

// const config = {
//   headers: {
//     Authorization: `Bearer ${API_KEY}`,
//   },
// };

// Função para obter a imagem da Unsplash e armazenar no localStorage
export const fetchBackgroundImage = async () => {
  const cachedImage = localStorage.getItem("backgroundImage");
  const lastFetchTime = localStorage.getItem("lastFetchTime");
  const currentTime = Date.now(); // Timestamp atual

  // Convertendo 'lastFetchTime' de string para número
  const lastFetchTimeNumber = Number(lastFetchTime); // Solução para o erro

  // Se a última atualização foi há menos de 6 horas, retorna a imagem do cache
  if (
    cachedImage &&
    lastFetchTimeNumber &&
    currentTime - lastFetchTimeNumber < SIX_HOURS
  ) {
    return cachedImage;
  }

  // Caso contrário, faz uma nova requisição
  const response = await axios.get(
    `https://api.unsplash.com/photos/random?query=nature&client_id=RzRfXcqiraotJx6lZPv_ia4WoND21jo_GW3w7ZDnywY`
  );
  const imageUrl = response.data.urls.full;

  console.log(response);

  // Armazena a nova imagem no localStorage e atualiza o timestamp
  localStorage.setItem("backgroundImage", imageUrl);
  localStorage.setItem("lastFetchTime", currentTime.toString()); // Armazena como string no localStorage

  return imageUrl;
};

// Função para obter o versículo da Bíblia e armazenar no localStorage
export const fetchBibleVerse = async () => {
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

  const response = await axios.get(
    "https://www.abibliadigital.com.br/api/verses/nvi/random"
  );
  const verseText: string = response.data.text;
  const verseBook: string = response.data.book.name;
  const verseChapter: number = response.data.chapter;
  const verseNumber: number = response.data.number;

  const responseData = `${verseText} ${verseBook} ${verseChapter}:${verseNumber}`;

  // Armazena o novo versículo no localStorage e atualiza o timestamp
  localStorage.setItem("bibleVerse", responseData);
  localStorage.setItem("lastVerseFetchTime", currentTime.toString()); // Armazena como string no localStorage

  return responseData;
};

export const fetchBibliVerseButton = async () => {
  const response = await axios.get(
    `https://www.abibliadigital.com.br/api/verses/nvi/random`
  );

  const verseText: string = response.data.text;
  const verseBook: string = response.data.book.name;
  const verseChapter: number = response.data.chapter;
  const verseNumber: number = response.data.number;

  const responseData = `${verseText} ${verseBook} ${verseChapter}:${verseNumber}`;

  return responseData;
};

// export const fetchBibleVerseSearch = async (param) => {

// }

// export const fetchSearchResults = async (query) => {
//   try {
//     // Enviar a requisição com o termo no corpo (método POST)
//     const response = await axios.post(
//       'https://www.abibliadigital.com.br/api/verses/search',
//       {
//           version: "nvi",
//           search: query
//       },// O termo de busca enviado no corpo da requisição
//       {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       }
//     );
//     setResults(response.data.verses); // A API pode retornar os resultados sob a chave 'verses'
//   } catch (error) {
//     console.error('Erro ao buscar versículos:', error);
//   }
// }
