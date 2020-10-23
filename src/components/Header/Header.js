import React, {useState} from "react";
import styles from "./Header.module.scss"
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import NavigationLinks from "./NavigationLinks/NavigationLinks";
import LogoImg from "../LogoImg/LogoImg";
import ButtonColored from "../ButtonColored/ButtonColored";
import ButtonBurger from "./ButtonBurger/ButtonBurger";
import {logout, removeMovies, showLoginPage} from "../../redux/actions";
import {useAuth} from "../../hooks/use-auth";
import {useLoginPage} from "../../hooks/use-loginPage";

export default function Header () {
  const history = useHistory();
  const dispatch = useDispatch();
  const isAuthentication = useAuth();
  const isLogin = useLoginPage()

  const [burgerState, setBurgerState] = useState(false)

  const handleLogout = () => {
    dispatch(logout());
    dispatch(showLoginPage());
    dispatch(removeMovies());
    history.push("/")
  }

  const handleLogin = () => {
    dispatch(logout());
    dispatch(showLoginPage());
    history.push("/")
  }

  const isTrigger = () => {
    setBurgerState(!burgerState)
  }

  return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <LogoImg
                additionalClasses={'navbar-brand'}
                width={"7"}
                borderRadius={"10"}/>
          <div className={`collapse navbar-collapse ${burgerState ? "show" : ""}`} id="navbarSupportedContent">
            <NavigationLinks isTrigger={() =>(setBurgerState(isTrigger(burgerState)))}/>
          </div>

          {isLogin
              ? null
              : <div className="form-inline my-2 my-lg-0">
                {isAuthentication
                    ? <div className={styles.padding_right}>
                      <ButtonColored
                          additionalClasses={"btn-outline-secondary"}
                          onClick={handleLogin}
                      >Logout
                      </ButtonColored>
                    </div>
                    : <div className={styles.padding_right}>
                      <ButtonColored
                          additionalClasses={"btn-outline-secondary"}
                          onClick={handleLogout}
                      >Login
                      </ButtonColored>
                    </div>
                }
              </div>
          }
          <span className={styles.absolute}>
            <ButtonBurger
                isTrigger={isTrigger}
            />
          </span>
        </nav>
      </header>
  )
}