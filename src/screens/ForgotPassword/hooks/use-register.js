import {useHistory} from "react-router-dom";

export const useRegister = () => {
  const history = useHistory()
  history.push("/register")
}