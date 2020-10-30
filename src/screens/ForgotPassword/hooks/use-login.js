import {useHistory} from "react-router-dom";

export const useLogin = () => {
  const history = useHistory()
  history.push("/")
}