function Shortlist({ movies, onRemove }) {
  return (
    <aside className="shortlist">
      <h2>My Shortlist ({movies.length})</h2>

      {movies.length === 0 ? (
        <p>No movies selected yet.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <span>{movie.title}</span>

              <button
                type="button"
                onClick={() => onRemove(movie.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default Shortlist;
