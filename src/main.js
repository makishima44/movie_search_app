import { searchMovieByTitle, fetchMovieDetails } from "./api.js";
import { showMessage, renderMovies, clearMovieList, showMovieDetails, startSearch, finishSearch } from "./ui.js";
import { setMovies, getMovies, setMoviesQuery, setMoviesPage, setTotalResults } from "./state.js";

const movieSearchInput = document.getElementById("movieSearchInput");
const movieSearchForm = document.getElementById("movieSearchForm");

function handleBackToResults() {
  clearMovieList();
  renderMovies(getMovies(), handleMovieDetails);
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
    setMoviesPage(page);
    setTotalResults(movieData.totalResults);

    renderMovies(movies, handleMovieDetails);
  } catch (error) {
    showMessage(error.message);
  } finally {
    finishSearch();
  }
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
