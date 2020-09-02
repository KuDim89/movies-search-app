const testKey1 = "4a3b711b"
const testKey2 = "7a651c56"

export function getMoviesInfo (id) {
  const MOVIE_INFO_API_URL = `http://www.omdbapi.com/?i=${id}&apikey=${testKey1}`
  return fetch(MOVIE_INFO_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        return jsonResponse
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}