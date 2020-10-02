export async function getMoviesInfo (id) {
  const testKey1 = "4a3b711b"
  // const testKey2 = "7a651c56"
  const MOVIE_INFO_API_URL = `http://www.omdbapi.com/?i=${id}&apikey=${testKey1}`
  try {
    if (id && typeof id === "string") {
      const response = await fetch(MOVIE_INFO_API_URL);
      return await response.json();
    } else {
      throw new Error('Movies id is not defined')
    }
  } catch (error) {
    throw error
  }
}