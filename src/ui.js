const movieContainer = document.getElementById("movieContainer");

export function showMessage(message) {
  console.log(message);
}

export function renderMovies(movies) {
  movieContainer.textContent = "";
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
