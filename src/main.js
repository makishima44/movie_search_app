import { searchMovieByTitle } from "./api.js";

const movieSearchInput = document.getElementById("movieSearchInput");
const movieContainer = document.getElementById("movieContainer");
const movieSearchForm = document.getElementById("movieSearchForm");

movieSearchForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const currentMovieTitle = movieSearchInput.value.trim();

  if (!currentMovieTitle) {
    movieSearchInput.focus();
    return;
  }

  const movieData = await searchMovieByTitle(currentMovieTitle);
  console.log(movieData);

  movieSearchInput.value = "";
});
