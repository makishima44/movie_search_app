import { searchMovieByTitle, fetchMovieDetails } from "./api.js";
import { showMessage, renderMovies, clearMovieList, showLoading, hideLoading, disableSearchButton, enableSearchButton } from "./ui.js";

const movieSearchInput = document.getElementById("movieSearchInput");
const movieSearchForm = document.getElementById("movieSearchForm");

async function handleMovieDetails(id) {
  try {
    const movieDetails = await fetchMovieDetails(id);

    console.log(movieDetails);
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

  showLoading();
  disableSearchButton();

  try {
    const movieData = await searchMovieByTitle(currentMovieTitle);

    if (movieData.Response === "False") {
      showMessage(movieData.Error);
      return;
    }

    const movies = movieData.Search;
    renderMovies(movies, handleMovieDetails);
    console.log(movies);

    movieSearchInput.value = "";
  } catch (error) {
    showMessage(error.message);
  } finally {
    hideLoading();
    enableSearchButton();
  }
});
