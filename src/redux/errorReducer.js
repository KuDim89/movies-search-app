import {REMOVE_ERROR, SET_ERROR} from "./types";

export const errorReducer = (state = null, action) => {
  switch (action.type) {
    case SET_ERROR:
      return action.payload
    case REMOVE_ERROR:
      return action.payload
    default:
      return state
  }
}