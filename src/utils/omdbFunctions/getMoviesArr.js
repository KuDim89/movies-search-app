export async function getMoviesArr (randomWords) {
  // const testKey1 = "4a3b711b"
  const testKey2 = "7a651c56"
  const MOVIE_API_URL = `https://www.omdbapi.com/?s=${randomWords}&apikey=${testKey2}`
  try {
    if (randomWords instanceof Error) {
      throw randomWords
    } else if (randomWords === undefined) {
      throw new Error('Word is undefined')
    } else {
      const response = await fetch(MOVIE_API_URL);
      return  await response.json();
    }
  } catch (error) {
    throw error
  }
}