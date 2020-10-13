import {HIDE_LOGIN_PAGE, SHOW_LOGIN_PAGE} from "./types";

export const isLoginReducer = (state = true, action) => {
  switch (action.type) {
    case SHOW_LOGIN_PAGE :
      return action.payload
    case HIDE_LOGIN_PAGE :
      return action.payload
    default: return state
  }
}