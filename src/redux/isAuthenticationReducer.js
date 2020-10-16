import {LOGIN, LOGOUT} from "./types";
import {getFromLocalStorage} from "../utils/localStorage";

const initialState = getFromLocalStorage("authentication") || false

export const isAuthenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return action.payload
    case LOGOUT:
      return action.payload
    default: return state
  }
}