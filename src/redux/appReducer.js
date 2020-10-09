import {GET_ALL_DATA} from "./types";

const initialState = {
  loginData: {},
  forgotPassData: {},
  otherInfoData:{},
  users: []
}

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_DATA :
      return Object.assign({}, state, action.payload)
    default: return state
  }
}