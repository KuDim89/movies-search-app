import {combineReducers} from "redux";
import {isAuthenticationReducer} from "./isAuthenticationReducer";
import {isLoginReducer} from "./isLoginReducer";
import {isLoaderReducer} from "./isLoaderReducer";
import {errorReducer} from "./errorReducer";
import {appReducer} from "./appReducer";

export const rootReducer = combineReducers({
  isAuthentication: isAuthenticationReducer,
  isLogin: isLoginReducer,
  isLoader: isLoaderReducer,
  isError: errorReducer,
  app: appReducer
})