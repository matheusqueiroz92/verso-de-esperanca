export default function SearchBar(
  handleSearchSubmit,
  searchQuery,
  setSearchQuery
) {
  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        placeholder="Buscar versículo"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <button type="submit">Buscar</button>
    </form>
  );
}
