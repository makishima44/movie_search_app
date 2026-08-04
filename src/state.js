let currentMovies = [];

export function setMovies(movies) {
  currentMovies = movies;
}

export function getMovies() {
  return currentMovies;
}
