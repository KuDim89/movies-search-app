import React from "react";
import {useSelector} from "react-redux";

export const useForgotPassData = () => {
  return  useSelector(state => state.app.forgotPassData)
}