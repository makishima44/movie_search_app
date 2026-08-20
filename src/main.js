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
  setSort,
  getSort,
} from "./state.js";

const movieSearchInput = document.getElementById("movieSearchInput");
const movieSearchForm = document.getElementById("movieSearchForm");
const movieSortSelect = document.getElementById("sortSelect");

// Возвращает пользователя со страницы фильма обратно
// к результатам последнего поиска
function handleBackToResults() {
  clearMovieList();
  const sortType = getSort();
  renderMovies(sortMoviesByYear(sortType), handleMovieDetails);
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

// Загружает следующую страницу результатов.
async function handleNextPage() {
  const query = getMoviesQuery();
  const currentPage = getMoviesPage();
  const nextPage = currentPage + 1;

  await loadMovies(query, nextPage);
}

// Загружает предыдущую страницу результатов.
async function handlePreviousPage() {
  const query = getMoviesQuery();
  const currentPage = getMoviesPage();
  const previousPage = currentPage - 1;

  await loadMovies(query, previousPage);
}

// Загружает подробную информацию о конкретном фильме.
// Получает imdbID фильма, делает запрос к API
// и передаёт полученные данные в UI.
async function handleMovieDetails(id) {
  try {
    const movieDetails = await fetchMovieDetails(id);
    console.log(movieDetails);

    showMovieDetails(movieDetails, handleBackToResults);
  } catch (error) {
    showMessage(error.message);
  }
}

function sortMoviesByYear(sortType) {
  const movies = getMovies();
  let sortedMovies;

  if (sortType === "newest") {
    sortedMovies = [...movies].sort((a, b) => Number(b.Year) - Number(a.Year));
  } else if (sortType === "oldest") {
    sortedMovies = [...movies].sort((a, b) => Number(a.Year) - Number(b.Year));
  } else if (sortType === "none") {
    sortedMovies = movies;
  }

  return sortedMovies;
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

    const sortType = getSort();
    const sortedMovies = sortMoviesByYear(sortType);

    const nextPageAvailable = hasNextPage(movieData.totalResults, page);
    const previousPageAvailable = hasPreviousPage(page);

    renderMovies(sortedMovies, handleMovieDetails);
    renderPagination(handleNextPage, nextPageAvailable, handlePreviousPage, previousPageAvailable);
  } catch (error) {
    showMessage(error.message);
  } finally {
    finishSearch();
  }
}

// Восстанавливает последний поиск после перезагрузки страницы.
// Получает сохранённые query и page из localStorage
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

movieSortSelect.addEventListener("change", (event) => {
  const sortType = event.target.value;
  setSort(sortType);
  const sortedMovies = sortMoviesByYear(sortType);
  clearMovieList();
  renderMovies(sortedMovies, handleMovieDetails);
});

// При запуске приложения пытаемся восстановить последний поиск из localStorage.
restoreLastSearch();
