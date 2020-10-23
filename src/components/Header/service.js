import {useDispatch} from "react-redux";
import {logout, removeMovies, showLoginPage} from "../../redux/actions";

export const useAppLogout = (history) => {
  const dispatch = useDispatch()

  dispatch(logout());
  dispatch(showLoginPage());
  dispatch(removeMovies());
  history.push("/")
}

export const useAppLogin = (history) => {
  const dispatch = useDispatch()

  dispatch(logout());
  dispatch(showLoginPage());
  history.push("/")
}

export const isTrigger = (value) => {
  return !value
}