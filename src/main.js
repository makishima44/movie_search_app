const movieSearchButton = document.getElementById("movieSearchButton");
const movieSearchInput = document.getElementById("movieSearchInput");
const movieContainer = document.getElementById("movieContainer");
const movieSearchForm = document.getElementById("movieSearchForm");

movieSearchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Поиск");
});
