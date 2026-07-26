const movieContainer = document.getElementById("movieContainer");

export function showMessage(message) {
  clearMovieList();

  const errorMessage = document.createElement("p");
  errorMessage.textContent = message;

  movieContainer.append(errorMessage);
}

export function renderMovies(movies) {
  movies.forEach((movie) => {
    const movieCard = document.createElement("div");

    const movieTitle = document.createElement("h2");
    movieTitle.textContent = movie.Title;

    const movieYear = document.createElement("p");
    movieYear.textContent = movie.Year;

    movieCard.append(movieTitle, movieYear);

    movieContainer.append(movieCard);
  });
}

export function clearMovieList() {
  movieContainer.textContent = "";
}
