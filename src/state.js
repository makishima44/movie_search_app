let currentMovies = [];
let currentPage = 1;
let currentQuery = "";
let totalResults = 0;
let currentSort = "none";
let favoriteMovies = [];
//---------------------------------------------------------------------//

export function setMovies(movies) {
  currentMovies = movies;
}

export function getMovies() {
  return currentMovies;
}

export function setMoviesPage(page) {
  currentPage = page;
}

export function getMoviesPage() {
  return currentPage;
}

export function setMoviesQuery(query) {
  currentQuery = query;
}

export function getMoviesQuery() {
  return currentQuery;
}
export function setTotalResults(total) {
  totalResults = total;
}

export function getTotalResults() {
  return totalResults;
}

export function setSort(sortType) {
  currentSort = sortType;
}

export function getSort() {
  return currentSort;
}

export function setFavoriteMovies(movies) {
  favoriteMovies = movies;
}

export function getFavoriteMovies() {
  return favoriteMovies;
}

//---------------------------------------------------------------------//
export function setQueryToStorage(query) {
  localStorage.setItem("lastMovieQuery", query);
}

export function loadQueryFromStorage() {
  return localStorage.getItem("lastMovieQuery");
}

export function savePageToStorage(page) {
  localStorage.setItem("lastMoviePage", page);
}

export function loadPageFromStorage() {
  return Number(localStorage.getItem("lastMoviePage"));
}

export function isFavorite(movieId) {
  const favoriteMovies = getFavoriteMovies();
  return favoriteMovies.some((movie) => movie.imdbID === movieId);
}

export function toggleFavorite(movie) {
  const favoriteMovies = getFavoriteMovies();

  if (!isFavorite(movie.imdbID)) {
    setFavoriteMovies([...favoriteMovies, movie]);
  } else {
    const updatedFavorites = favoriteMovies.filter((favoriteMovie) => {
      favoriteMovie.imdbID !== movie.imdbID;
    });
    setFavoriteMovies(updatedFavorites);
  }
}
