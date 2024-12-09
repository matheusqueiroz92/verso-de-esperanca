import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bibleBooks } from "../utils/BibleBooks";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false); // Estado para expandir/retrair a barra lateral
  const [expandedOldTestment, setExpandedOldTestment] = useState(false); // Estado para expandir/retrair o velho testamento
  const [expandedNewTestment, setExpandedNewTestment] = useState(false); // Estado para expandir/retrair o novo testamento
  const [expandedBook, setExpandedBook] = useState(""); // Estado para expandir/retrair os livros da bíblia

  const navigate = useNavigate();

  const handleOldTestmentClick = () => {
    setExpandedOldTestment(!expandedOldTestment); // Alterna entre expandido e retraído o velho testamento
  };

  const handleNewTestmentClick = () => {
    setExpandedNewTestment(!expandedNewTestment); // Alterna entre expandido e retraído o novo testamento
  };

  const handleBookClick = (book: string) => {
    setExpandedBook(book); // Alterna entre expandido e retraído
  };

  const handleChapterClick = (abbrevBook: string, chapterNumber: number) => {
    navigate(`/book/${abbrevBook}/chapter/${chapterNumber}/`); // Redireciona para a rota do livro de capítulo clicado
  };

  return (
    <div
      className={`sidebar ${expanded ? "expanded" : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => {
        setExpanded(false);
        setExpandedOldTestment(false);
        setExpandedNewTestment(false);
      }}
    >
      <h2 className="sidebar-title">Bíblia Sagrada</h2>
      <div className="old-testament">
        <button
          className={`sidebar-testament-btn ${expanded ? "expanded" : ""}`}
          onClick={() => handleOldTestmentClick()}
        >
          <h3>Velho Testamento</h3>
        </button>
        {expandedOldTestment && (
          <ul className="sidebar-books">
            {bibleBooks
              .filter((bookFilter) => bookFilter.testament === "VT")
              .map((book) => (
                <li key={book.name} className="sidebar-book">
                  <button
                    className="sidebar-book-btn"
                    onClick={() => handleBookClick(book.name)}
                  >
                    {book.name}
                  </button>
                  {expandedBook === book.name && (
                    <ul className="sidebar-chapters">
                      {Array.from({ length: book.chapters }).map((_, i) => (
                        <li key={i} className="sidebar-chapter">
                          <button
                            onClick={() =>
                              handleChapterClick(book.abbrev.pt, i + 1)
                            }
                          >
                            Capítulo {i + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="new-testament">
        <button
          className={`sidebar-testament-btn ${expanded ? "expanded" : ""}`}
          onClick={() => handleNewTestmentClick()}
        >
          <h3>Novo Testamento</h3>
        </button>
        {expandedNewTestment && (
          <ul className="sidebar-books">
            {bibleBooks
              .filter((bookFilter) => bookFilter.testament === "NT")
              .map((book) => (
                <li key={book.name} className="sidebar-book">
                  <button
                    className="sidebar-book-btn"
                    onClick={() => handleBookClick(book.name)}
                  >
                    {book.name}
                  </button>
                  {expandedBook === book.name && (
                    <ul className="sidebar-chapters">
                      {Array.from({ length: book.chapters }).map((_, i) => (
                        <li key={i} className="sidebar-chapter">
                          <button
                            onClick={() =>
                              handleChapterClick(book.abbrev.pt, i + 1)
                            }
                          >
                            Capítulo {i + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        )}
      </div>

      {/* <h2 className="sidebar-title">Bíblia</h2>
      {Object.entries(books).map(([testament, booksList]) => (
        <div key={testament}>
          <h3 className="sidebar-testament">{testament}</h3>
          <ul className="sidebar-books">
            {booksList.map((book) => (
              <li key={book.name} className="sidebar-book">
                <button className="sidebar-book-btn" onClick={() => handleBookClick(book.name)}>
                  {book.name}
                </button>
                {expandedBook === book.name && (
                  <ul className="sidebar-chapters">
                    {Array.from({ length: book.chapters }).map((_, i) => (
                      <li key={i} className="sidebar-chapter">
                        <button onClick={() => handleChapterClick(book.name, i + 1)}>
                          Capítulo {i + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))} */}
    </div>
  );
}
