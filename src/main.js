const movieSearchButton = document.getElementById("movieSearchButton");
const movieSearchInput = document.getElementById("movieSearchInput");
const movieContainer = document.getElementById("movieContainer");
const movieSearchForm = document.getElementById("movieSearchForm");

movieSearchForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const currentMovieTitle = movieSearchInput.value.trim();

  if (!currentMovieTitle) {
    movieSearchInput.focus();
    return;
  }

  console.log(currentMovieTitle);
  movieSearchInput.value = "";
});
