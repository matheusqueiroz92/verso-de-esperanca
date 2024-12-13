import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SearchResults from "./components/SearchResults";
import ClickBibleBook from "./components/ClickBibleBook";
import { ThemeProvider } from "./components/ui/theme-provider";
import Favorites from "./components/Favorites";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="/book/:bookId/chapter/:chapterId"
            element={<ClickBibleBook />}
          />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
