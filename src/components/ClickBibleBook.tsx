import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface verseType {
  number: number,
  text: string
}

export default function ClickBibleBook() {
  const { abbrevBook, chapterNumber } = useParams<{ abbrevBook: string; chapterNumber: string }>();
  const [verses, setVerses] = useState<verseType[]>([]);
  const [bookName, setBookName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!abbrevBook || !chapterNumber) {
      return;
    }

    const fetchChapterVerses = async () => {
      setLoading(true);
      try {
        // Faz uma requisição à API para buscar os versículos de um capítulo
        const response = await axios.get(
          `https://www.abibliadigital.com.br/api/verses/nvi/${abbrevBook}/${chapterNumber}/`
        );
        setVerses(response.data.verses); // Supondo que a resposta tenha uma chave 'verses'
        setBookName(response.data.book.name);
        console.log(response.data);
        
        
      } catch (error) {
        console.error('Erro ao buscar versículos:', error);
      }
      setLoading(false);
    };

    fetchChapterVerses();
  }, [abbrevBook, chapterNumber]);

  return (
    <div className="chapter-page">
      <h2>{bookName} - Capítulo {chapterNumber}</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        verses.map((verse, index) => (
          <p key={index}>
            {verse.number}. {verse.text}
          </p>
        ))
      )}
    </div>
  );
}