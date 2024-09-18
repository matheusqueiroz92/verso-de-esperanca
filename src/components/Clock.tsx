import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('pt-BR'));
  const [date, setDate] = useState(formatDate(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString('pt-BR'));
      setDate(formatDate(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Função para formatar a data e capitalizar a primeira letra
  function formatDate(date: Date) {
    const formattedDate = date.toLocaleDateString('pt-BR', {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
    
    // Capitalizar a primeira letra da string da data
    return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
  }

  return (
    <div className="clock-container">
      <h2 className="clock-date">{date}</h2>
      <h3 className="clock-time">{time}</h3>
    </div>
  );
}