const WORDS_RANDOM_API_URL = "https://random-word-api.herokuapp.com/word?number=1"

export function randomWord () {

  return fetch(WORDS_RANDOM_API_URL)
         .then(response => response.json())
         .then(jsonResponse => {
                  return jsonResponse[0]
           })
         .catch((error) => {
           console.error('Error:', error);
         });
}