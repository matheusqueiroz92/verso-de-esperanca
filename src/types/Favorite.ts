export interface Favorite {
  id: string; // ID único para o favorito
  bookId: string; // ID do livro
  chapter: number; // Número do capítulo
  verse: number; // Número do versículo
  text: string; // Texto do versículo
  reference: string; // Referência completa
  dateAdded: string; // Data em que foi adicionado
}
