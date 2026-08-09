import { API_KEY } from "./config.js";

export async function searchMovieByTitle(title, page = 1) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}&page=${page}`);

    if (!response.ok) {
      throw new Error("Ошибка сети");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Произошла ошибка при запросе: ${error.message}`);
  }
}

export async function fetchMovieDetails(id) {
  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`);

    if (!response.ok) {
      throw new Error("Ошибка сети");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Произошла ошибка при запросе:, ${error.message}`);
  }
}
