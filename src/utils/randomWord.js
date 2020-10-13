import {words} from "./words";

function filterWords() {
  return words.filter(word => word.length >= 3);
}

export function randomWord () {
  const words = filterWords()
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}


