import axios from 'axios';

const SIX_HOURS = 6 * 60 * 1000; // 6 horas em milissegundos

// Função para obter a imagem da Unsplash e armazenar no localStorage
export const fetchBackgroundImage = async () => {
  const cachedImage = localStorage.getItem('backgroundImage');
  const lastFetchTime = localStorage.getItem('lastFetchTime');
  const currentTime = Date.now(); // Timestamp atual

  // Convertendo 'lastFetchTime' de string para número
  const lastFetchTimeNumber = Number(lastFetchTime); // Solução para o erro

  // Se a última atualização foi há menos de 6 horas, retorna a imagem do cache
  if (cachedImage && lastFetchTimeNumber && (currentTime - lastFetchTimeNumber) < SIX_HOURS) {
    return cachedImage;
  }

  // Caso contrário, faz uma nova requisição
  const response = await axios.get(
    `https://api.unsplash.com/photos/random?query=nature&client_id=RzRfXcqiraotJx6lZPv_ia4WoND21jo_GW3w7ZDnywY`
  );
  const imageUrl = response.data.urls.full;

  // Armazena a nova imagem no localStorage e atualiza o timestamp
  localStorage.setItem('backgroundImage', imageUrl);
  localStorage.setItem('lastFetchTime', currentTime.toString()); // Armazena como string no localStorage

  return imageUrl;
};

// Função para obter o versículo da Bíblia e armazenar no localStorage
export const fetchBibleVerse = async () => {
  const cachedVerse = localStorage.getItem('bibleVerse');
  const lastFetchTime = localStorage.getItem('lastVerseFetchTime');
  const currentTime = Date.now(); // Timestamp atual

  // Convertendo 'lastFetchTime' de string para número
  const lastFetchTimeNumber = Number(lastFetchTime); // Solução para o erro

  // Se o versículo foi buscado há menos de 6 horas, retorna o cache
  if (cachedVerse && lastFetchTimeNumber && (currentTime - lastFetchTimeNumber) < SIX_HOURS) {
    return cachedVerse;
  }

  // Caso contrário, faz uma nova requisição
  const response = await axios.get(
    `https://www.abibliadigital.com.br/api/verses/nvi/random`
  );
  const verseText: string = response.data.text;
  const verseBook: string = response.data.book.name;
  const verseChapter: number = response.data.chapter;
  const verseNumber: number = response.data.number;

  const responseData = `${verseText} ${verseBook} ${verseChapter}:${verseNumber}`;

  // Armazena o novo versículo no localStorage e atualiza o timestamp
  localStorage.setItem('bibleVerse', responseData);
  localStorage.setItem('lastVerseFetchTime', currentTime.toString()); // Armazena como string no localStorage

  return responseData
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

  return responseData
}


// export const fetchBibleVerseSearch = async (param) => {


// }