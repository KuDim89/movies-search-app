import {
  GET_ALL_DATA,
  SHOW_LOGIN_PAGE,
  HIDE_LOGIN_PAGE,
  LOGIN,
  LOGOUT,
  MOVIES_DEFAULT, MOVIES_SEARCH, MOVIES_RANDOM, REMOVE_MOVIES,
} from "./types";
import {getDataCollection} from "../utils/firebaseFunctions/getDataCollection";
import {findId} from "../utils/findId";
import {getMoviesArr} from "../utils/omdbFunctions/getMoviesArr";
import {randomMovie} from "../utils/randomMovie";


// === The action of the appReducer === //
export function getFirebaseData() {
  return async dispatch => {
    try {
      const siteData = await getDataCollection("siteData");
      const userData = await getDataCollection("users");

      const newState = {
        loginData: findId(siteData, 'login'),
        forgotPassData: findId(siteData, 'forgotPass'),
        otherInfoData: findId(siteData, 'otherInfo'),
        users: userData,
      }
      dispatch({type: GET_ALL_DATA, payload: newState})

    } catch (error) {
      throw error
    }
  }
}


// === The action of the moviesReducer === //
export function moviesDataDefault() {
  const defaultMovies = [
    {
      Title: "Wonder Woman",
      Year: "2017",
      imdbID: "tt0451279",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BNDFmZjgyMTEtYTk5MC00NmY0LWJhZjktOWY2MzI5YjkzODNlXkEyXkFqcGdeQXVyMDA4NzMyOA@@._V1_SX300.jpg"
    },
    {
      Title: "Pretty Woman",
      Year: "1990",
      imdbID: "tt0100405",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BNjk2ODQzNDYxNV5BMl5BanBnXkFtZTgwMTcyNDg4NjE@._V1_SX300.jpg"
    },
    {
      Title: "Scent of a Woman",
      Year: "1992",
      imdbID: "tt0105323",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BZTM3ZjA3NTctZThkYy00ODYyLTk2ZjItZmE0MmZlMTk3YjQwXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
    },
    {
      Title: "The Woman in Black",
      Year: "2012",
      imdbID: "tt1596365",
      Type: "movie",
      Poster: "https://m.media-amazon.com/images/M/MV5BMjEwMzIxOTg3N15BMl5BanBnXkFtZTcwMjI4ODUzNw@@._V1_SX300.jpg"
    }
  ]
  return async dispatch => {
    try {
      const data = await getMoviesArr("aardvark");
      if (data.Response === "True") {
        dispatch({type: MOVIES_DEFAULT, payload: data.Search})
      } else {
        dispatch({type: MOVIES_DEFAULT, payload: defaultMovies})
        throw new Error(data.Error)
      }
    } catch (error) {
      throw error
    }
  }
}

export function searchMovies(searchValue) {
  return async dispatch => {
    try {
      const data = await getMoviesArr(searchValue);

      if (data.Response === "True") {
        dispatch({type: MOVIES_SEARCH, payload: data.Search})
      } else {
        throw new Error(data.Error)
      }
    } catch (error) {
      throw error
    }
  }
}

export function setRandomMovie() {
  return async dispatch => {
    try {
      const data = await randomMovie(0, 10);
      if (data.Response === "True") {
        dispatch({type: MOVIES_RANDOM, payload: data.Search})
      } else {
        throw new Error(data.Error)
      }
    } catch (error) {
      throw error
    }
  }
}

export function removeMovies() {
  return {
    type: REMOVE_MOVIES,
    payload: []
  }
}

// === The action of the isLoginReducer === //
export function showLoginPage() {
  return {
    type: SHOW_LOGIN_PAGE,
    payload: true
  }
}

export function hideLoginPage() {
  return {
    type: HIDE_LOGIN_PAGE,
    payload: false
  }
}


// === The action of the isAuthenticationReducer ===
export function login() {
  return {
    type: LOGIN,
    payload: true
  }
}

export function logout() {
  return {
    type: LOGOUT,
    payload: false
  }
}