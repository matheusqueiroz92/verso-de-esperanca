import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // se estiver usando react-router-dom
import axios from 'axios';

interface BibleVerse {
  book: {
    name: string;
  };
  chapter: number;
  number: number;
  text: string;
}

export default function SearchResults() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  
  // Extrair o termo de busca da URL
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        // Enviar a requisição com o termo no corpo (método POST)
        const response = await axios.post(
          'https://www.abibliadigital.com.br/api/verses/search',
          {
              version: "nvi",
              search: query
          },// O termo de busca enviado no corpo da requisição
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setResults(response.data.verses); // A API pode retornar os resultados sob a chave 'verses'
      } catch (error) {
        console.error('Erro ao buscar versículos:', error);
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="search-results">
      <h2>Resultados da busca: "{query}"</h2>
      { loading ? (
        <p>Carregando...</p>
      ) : results.length > 0 ? (
        results.map((verse: BibleVerse) => (
          <div key={`${verse.book.name}, ${verse.chapter}:${verse.number}`} className="verse-result">
            <p>{verse.text} - {verse.book.name} {verse.chapter}:{verse.number}</p>
          </div>
        ))
      ) : (
        <p>Nenhum versículo encontrado.</p>
      )}
    </div>
  );
}