import {getMoviesArr} from "./omdbFunctions/getMoviesArr";
import {randomWord} from "./randomWord";

export async function randomMovie(count, max) {
  if (count >= max) {
    return await getMoviesArr("boy")
  } else {
    try {
      const word = randomWord();
      const data = await getMoviesArr(word);

      if (data.Response === "True") {
        return data
      } else if (data.Response === "False" && data.Error === "Movie not found!") {
        return await randomMovie(count + 1, max);
      } else {
        throw new Error(data.Error);
      }
    } catch (error) {
      throw error;
    }
  }
}