import {MOVIES_DEFAULT, MOVIES_RANDOM, MOVIES_SEARCH, REMOVE_MOVIES} from "./types";

export const moviesReducer = (state = [], action) => {
  switch (action.type) {
    case MOVIES_DEFAULT :
      return [...action.payload]
    case MOVIES_SEARCH :
      return [...action.payload]
    case MOVIES_RANDOM :
      return [...action.payload]
    case REMOVE_MOVIES :
      return [...action.payload]
    default: return state
  }
}