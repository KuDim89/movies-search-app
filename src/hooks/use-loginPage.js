import {useSelector} from "react-redux";

export const useLoginPage = () => {
  return  useSelector(state => state.isLogin);
}
