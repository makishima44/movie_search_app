const movieContainer = document.getElementById("movieContainer");
const loadingContainer = document.getElementById("loadingContainer");
const movieSearchButton = document.getElementById("movieSearchButton");

export function showMessage(message) {
  clearMovieList();

  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;

  movieContainer.append(errorMessage);
}

export function renderMovies(movies, onDetailsClick) {
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.Title;

    const movieYear = document.createElement("p");
    movieYear.textContent = movie.Year;

    const movieDetailsButton = document.createElement("button");
    movieDetailsButton.classList.add("movie-details-button");
    movieDetailsButton.textContent = "Подробнее";
    movieDetailsButton.addEventListener("click", () => {
      onDetailsClick(movie.imdbID);
    });

    if (movie.Poster === "N/A") {
      const noPosterText = document.createElement("p");
      noPosterText.textContent = "Постер отсутствует";
      movieCard.append(noPosterText);
    } else {
      const moviePoster = document.createElement("img");
      moviePoster.classList.add("movie-poster");
      moviePoster.src = movie.Poster;
      moviePoster.alt = `Постер фильма ${movie.Title}`;
      movieCard.append(moviePoster);
    }

    movieCard.append(movieTitle, movieYear, movieDetailsButton);
    movieContainer.append(movieCard);
  });
}

export function clearMovieList() {
  movieContainer.textContent = "";
}

export function showLoading() {
  loadingContainer.textContent = "Загрузка...";
}

export function hideLoading() {
  loadingContainer.textContent = "";
}

export function disableSearchButton() {
  movieSearchButton.disabled = true;
}

export function enableSearchButton() {
  movieSearchButton.disabled = false;
}
