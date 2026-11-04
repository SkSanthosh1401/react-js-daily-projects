import MovieCard from "./MovieCard";

function MovieList({
  movies,
  shortlistedIds,
  onToggleShortlist,
  onClearFilters,
}) {
  if (movies.length === 0) {
    return (
      <section className="empty-state">
        <h2>No movies found</h2>
        <p>Try changing your search or genre.</p>

        <button type="button" onClick={onClearFilters}>
          Clear filters
        </button>
      </section>
    );
  }

  return (
    <section className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isShortlisted={shortlistedIds.includes(movie.id)}
          onToggleShortlist={onToggleShortlist}
        />
      ))}
    </section>
  );
}

export default MovieList;