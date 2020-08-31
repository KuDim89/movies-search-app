const testKey1 = "4a3b711b"
const testKey2 = "7a651c56"

export function getMoviesArr (randomWords) {
  const MOVIE_API_URL = `https://www.omdbapi.com/?s=${randomWords}&apikey=${testKey1}`
  return fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}