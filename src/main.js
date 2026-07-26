import { searchMovieByTitle } from "./api.js";
import { showMessage, renderMovies, clearMovieList } from "./ui.js";

const movieSearchInput = document.getElementById("movieSearchInput");
const movieSearchForm = document.getElementById("movieSearchForm");

movieSearchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const currentMovieTitle = movieSearchInput.value.trim();

  if (!currentMovieTitle) {
    movieSearchInput.focus();
    return;
  }

  clearMovieList();

  try {
    const movieData = await searchMovieByTitle(currentMovieTitle);

    if (movieData.Response === "False") {
      showMessage(movieData.Error);
      return;
    }

    const movies = movieData.Search;
    renderMovies(movies);

    movieSearchInput.value = "";
  } catch (error) {
    showMessage(error.message);
  }
});
