import {combineReducers} from "redux";
import {isAuthenticationReducer} from "./isAuthenticationReducer";
import {isLoginReducer} from "./isLoginReducer";
import {appReducer} from "./appReducer";
import {moviesReducer} from "./moviesReducer";

export const rootReducer = combineReducers({
  isAuthentication: isAuthenticationReducer,
  isLogin: isLoginReducer,
  app: appReducer,
  movies: moviesReducer
})