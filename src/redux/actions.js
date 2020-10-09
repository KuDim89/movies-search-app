import {
  GET_ALL_DATA,
  HIDE_LOADER,
  SHOW_LOGIN_PAGE,
  HIDE_LOGIN_PAGE,
  REMOVE_ERROR,
  SET_ERROR,
  SHOW_LOADER,
  LOGIN,
  LOGOUT,
} from "./types";
import {getDataCollection} from "../utils/firebaseFunctions/getDataCollection";
import {findId} from "../utils/findId";


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
      dispatch({type: SET_ERROR, payload: error.message})
    }
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
    payload: true
  }
}


// === The action of the errorReducer ===
export function setError(error) {
  return {
    type: SET_ERROR,
    payload: error
  }
}

export function removeError() {
  return {
    type: REMOVE_ERROR,
    payload: null
  }
}

// === The action of the isLoaderReducer ===
export function showLoader() {
  return {
    type: SHOW_LOADER,
    payload: true
  }
}

export function hideLoader() {
  return {
    type: HIDE_LOADER,
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