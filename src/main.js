import { searchMovieByTitle, fetchMovieDetails } from "./api.js";
import { showMessage, renderMovies, clearMovieList, showMovieDetails, startSearch, finishSearch } from "./ui.js";
import { setMovies, getMovies } from "./state.js";

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
    console.log(error.message);
  }
}

movieSearchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const currentMovieTitle = movieSearchInput.value.trim();

  if (!currentMovieTitle) {
    movieSearchInput.focus();
    return;
  }

  clearMovieList();
  startSearch();

  try {
    const movieData = await searchMovieByTitle(currentMovieTitle);

    if (movieData.Response === "False") {
      showMessage(movieData.Error);
      return;
    }

    const movies = movieData.Search;
    setMovies(movies);
    renderMovies(movies, handleMovieDetails);
    console.log(movies);

    movieSearchInput.value = "";
  } catch (error) {
    showMessage(error.message);
  } finally {
    finishSearch();
  }
});
