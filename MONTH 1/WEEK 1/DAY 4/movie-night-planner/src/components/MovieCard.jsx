function MovieCard({
  movie,
  isShortlisted,
  onToggleShortlist,
}) {
  return (
    <article
      className={`movie-card ${
        isShortlisted ? "movie-card--selected" : ""
    }`}
    >

      <h2>{movie.title}</h2>

      {isShortlisted && (
         <span className="status-badge">✓ Shortlisted</span>
      )}
      <p>Genre: {movie.genre}</p>
      <p>Year: {movie.year}</p>
      <p>Rating: ⭐ {movie.rating}</p>
      <button type="button" onClick={() => onToggleShortlist(movie.id)}>
        {isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
      </button>
    </article>
  );
}

export default MovieCard;