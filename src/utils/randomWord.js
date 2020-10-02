export async function randomWord () {
  const WORDS_RANDOM_API_URL = "https://random-word-api.herokuapp.com/word?number=1";
  try {
    const response = await fetch(WORDS_RANDOM_API_URL);
    const data = await response.json();
    if(data && data.length !== 0) {
      return data[0];
    } else {
      throw new Error('No access to the words server.')
    }
  } catch (error) {
    throw error
  }
}