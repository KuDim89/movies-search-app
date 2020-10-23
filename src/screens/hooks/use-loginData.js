import React from "react";
import {useSelector} from "react-redux";

export const useLoginData = () => {
  return  useSelector(state => state.app.loginData)
}