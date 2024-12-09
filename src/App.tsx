import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import SearchResults from "./components/SearchResults";
import ClickBibleBook from "./components/ClickBibleBook";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/search" element={<SearchResults />} />
            <Route
              path="/book/:abbrevBook/chapter/:chapterNumber"
              element={<ClickBibleBook />}
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
