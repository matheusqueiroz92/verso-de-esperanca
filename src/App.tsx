import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SearchResults from "./components/SearchResults";
import ClickBibleBook from "./components/ClickBibleBook";
import { ThemeProvider } from "./components/ui/theme-provider";

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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
