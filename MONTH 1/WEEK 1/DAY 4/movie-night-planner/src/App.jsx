import { useState } from "react";
import MovieList from "./components/MovieList";
import SearchBar from "./components/SearchBar";
import { movies } from "./data/movies";
import GenreFilter from "./components/GenreFilter";
import Shortlist from "./components/Shortlist";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [shortlistedIds, setShortlistedIds] = useState([]);
  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesGenre =
      selectedGenre === "All" || movie.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });
  const shortlistedMovies = movies.filter((movie) =>
    shortlistedIds.includes(movie.id),
  );
  function handleToggleShortlist(movieId) {
    const isAlreadyShortlisted = shortlistedIds.includes(movieId);

    if (isAlreadyShortlisted) {
      setShortlistedIds(shortlistedIds.filter((id) => id !== movieId));
    } else {
      setShortlistedIds([...shortlistedIds, movieId]);
    }
  }

  return (
    <main className="app">
      <header>
        <span className="eyebrow">WEEKEND WATCHLIST</span>
        <h1>🎬 Movie Night Planner</h1>
        <p>Search, filter, and build the perfect lineup for movie night.</p>

        <div className="hero-stats">
          <div>
            <strong>{movies.length}</strong>
            <span>Total movies</span>
          </div>
          <div>
            <strong>{filteredMovies.length}</strong>
            <span>Showing</span>
          </div>
          <div>
            <strong>{shortlistedIds.length}</strong>
            <span>Shortlisted</span>
          </div>
        </div>
      </header>

      <section className="control-panel">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <GenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </section>

      <Shortlist movies={shortlistedMovies} onRemove={handleToggleShortlist} />

      <div className="section-heading">
        <div>
          <span className="eyebrow">CURATED PICKS</span>
          <h2>Explore movies</h2>
        </div>
        <span className="result-count">{filteredMovies.length} results</span>
      </div>

      <MovieList
        movies={filteredMovies}
        shortlistedIds={shortlistedIds}
        onToggleShortlist={handleToggleShortlist}
        onClearFilters={() => {
          setSearchTerm("");
          setSelectedGenre("All");
        }}
      />
    </main>
  );
}

export default App;
