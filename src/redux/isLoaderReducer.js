import {HIDE_LOADER, SHOW_LOADER} from "./types";

export const isLoaderReducer = (state = true, action) => {
  switch (action.type) {
    case SHOW_LOADER:
      return action.payload
    case HIDE_LOADER:
      return action.payload
    default: return state
  }
}