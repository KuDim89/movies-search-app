import {useSelector} from "react-redux";

export const useUsers = () => {
  return  useSelector(state => state.app.users)
}