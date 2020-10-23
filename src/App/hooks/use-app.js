import {useSelector} from "react-redux";

export const useApp = () => {
  return useSelector(state => state.app)
}