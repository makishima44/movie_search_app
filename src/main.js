import { searchMovieByTitle, fetchMovieDetails } from "./api.js";
import { showMessage, renderMovies, clearMovieList, showMovieDetails, startSearch, finishSearch, renderPagination } from "./ui.js";
import {
  setMovies,
  getMovies,
  setMoviesQuery,
  setMoviesPage,
  setTotalResults,
  getMoviesPage,
  getMoviesQuery,
  getTotalResults,
  setQueryToStorage,
  loadQueryFromStorage,
  savePageToStorage,
  loadPageFromStorage,
} from "./state.js";

const movieSearchInput = document.getElementById("movieSearchInput");
const movieSearchForm = document.getElementById("movieSearchForm");

function handleBackToResults() {
  clearMovieList();
  renderMovies(getMovies(), handleMovieDetails);
}

// Функция для проверки, доступна ли следующая страница
function hasNextPage(totalResults, currentPage) {
  const totalPages = Math.ceil(Number(totalResults) / 10);
  return currentPage < totalPages;
}

// Функция для проверки, доступна ли предыдущая страница
function hasPreviousPage(currentPage) {
  return currentPage > 1;
}

async function handleNextPage() {
  const query = getMoviesQuery();
  const currentPage = getMoviesPage();
  const nextPage = currentPage + 1;

  await loadMovies(query, nextPage);
}

async function handlePreviousPage() {
  const query = getMoviesQuery();
  const currentPage = getMoviesPage();
  const previousPage = currentPage - 1;

  await loadMovies(query, previousPage);
}

async function handleMovieDetails(id) {
  try {
    const movieDetails = await fetchMovieDetails(id);
    showMovieDetails(movieDetails, handleBackToResults);
  } catch (error) {
    showMessage(error.message);
  }
}

async function loadMovies(query, page = 1) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    movieSearchInput.focus();
    return;
  }

  clearMovieList();
  startSearch();

  try {
    const movieData = await searchMovieByTitle(normalizedQuery, page);

    if (movieData.Response === "False") {
      showMessage(movieData.Error);
      return;
    }

    const movies = movieData.Search;

    setMovies(movies);
    setMoviesQuery(normalizedQuery);
    setQueryToStorage(normalizedQuery);
    setMoviesPage(page);
    savePageToStorage(page);
    setTotalResults(movieData.totalResults);

    const nextPageAvailable = hasNextPage(movieData.totalResults, page);
    const previousPageAvailable = hasPreviousPage(page);

    renderMovies(movies, handleMovieDetails);
    renderPagination(handleNextPage, nextPageAvailable, handlePreviousPage, previousPageAvailable);
  } catch (error) {
    showMessage(error.message);
  } finally {
    finishSearch();
  }
}

async function restoreLastSearch() {
  const lastMovieQuery = loadQueryFromStorage();
  const lastMoviePage = loadPageFromStorage();

  if (!lastMovieQuery) {
    return;
  }

  await loadMovies(lastMovieQuery, lastMoviePage || 1);
}

movieSearchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const currentMovieTitle = movieSearchInput.value.trim();

  if (!currentMovieTitle) {
    movieSearchInput.focus();
    return;
  }

  await loadMovies(currentMovieTitle);
  movieSearchInput.value = "";
});


restoreLastSearch();
