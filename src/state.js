let currentMovies = [];
let currentPage = 1;
let currentQuery = "";
let totalResults = 0;

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
