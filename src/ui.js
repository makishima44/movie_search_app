const movieContainer = document.getElementById("movieContainer");
const paginationContainer = document.getElementById("paginationContainer");
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

export function showMovieDetails(movie, onBackClick) {
  const { Title, Year, Genre, Director, Poster, Plot } = movie;

  clearMovieList();

  const movieDetailsCard = document.createElement("div");
  movieDetailsCard.classList.add("movie-details-card");

  const movieTitle = document.createElement("h2");
  movieTitle.textContent = `Название: ${Title}`;

  const movieYear = document.createElement("p");
  movieYear.textContent = `Год: ${Year}`;

  const movieGenre = document.createElement("p");
  movieGenre.textContent = `Жанр: ${Genre}`;

  const movieDirector = document.createElement("p");
  movieDirector.textContent = `Режиссёр: ${Director}`;

  const moviePlot = document.createElement("p");
  moviePlot.textContent = `Сюжет: ${Plot}`;

  if (Poster === "N/A") {
    const noPosterText = document.createElement("p");
    noPosterText.textContent = "Постер отсутствует";
    movieDetailsCard.append(noPosterText);
  } else {
    const moviePoster = document.createElement("img");
    moviePoster.classList.add("movie-poster");
    moviePoster.src = Poster;
    moviePoster.alt = `Постер фильма ${Title}`;
    movieDetailsCard.append(moviePoster);
  }

  const backButton = document.createElement("button");
  backButton.textContent = "← Назад к результатам";
  backButton.addEventListener("click", () => {
    onBackClick();
  });

  movieDetailsCard.append(movieTitle, movieYear, movieGenre, movieDirector, moviePlot, backButton);
  movieContainer.append(movieDetailsCard);
}

export function renderPagination(callback, nextPageAvailable) {
  paginationContainer.textContent = "";

  if (!nextPageAvailable) {
    return;
  }

  const nextButton = document.createElement("button");
  nextButton.textContent = "Следующая";
  nextButton.addEventListener("click", () => {
    callback();
  });

  paginationContainer.append(nextButton);
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

export function changeSearchButtonText(text) {
  movieSearchButton.textContent = text;
}

export function startSearch() {
  showLoading();
  changeSearchButtonText("Ищу...");
  disableSearchButton();
}

export function finishSearch() {
  hideLoading();
  changeSearchButtonText("Поиск");
  enableSearchButton();
}
