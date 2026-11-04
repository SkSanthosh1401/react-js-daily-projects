function GenreFilter({ selectedGenre, onGenreChange }) {
  return (
    <div className="genre-filter">
      <label htmlFor="genre">Filter by genre</label>

      <select
        id="genre"
        value={selectedGenre}
        onChange={(event) => onGenreChange(event.target.value)}
      >
        <option value="All">All genres</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="Action">Action</option>
        <option value="Animation">Animation</option>
        <option value="Mystery">Mystery</option>
      </select>
    </div>
  );
}

export default GenreFilter;