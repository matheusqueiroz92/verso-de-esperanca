import { useEffect, useState } from 'react';
import { fetchBibleVerse } from '../utils/fetchApi';

export default function BibleVerse() {
  const [verse, setVerse] = useState('');
  const [copied, setCopied] = useState(false); // Estado para mostrar feedback ao usuário


  useEffect(() => {
    const loadVerse = async () => {
      const verse = await fetchBibleVerse();
      setVerse(verse);
    };
    loadVerse();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(verse)
      .then(() => {
        setCopied(true); // Atualiza o estado para mostrar o feedback
        setTimeout(() => setCopied(false), 2000); // Limpa o feedback após 2 segundos
      })
      .catch((error) => console.error('Erro ao copiar: ', error));
  };

  return (
    <div className="verse-container" onClick={copyToClipboard} style={{ cursor: 'pointer' }}>
      <p className="verse-text">{verse}</p>
      {copied && <p style={{ color: 'blue' }}>Versículo copiado!</p>} {/* Feedback visual */}
    </div>
  );
}