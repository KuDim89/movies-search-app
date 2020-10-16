import React, {useState} from "react";
import styles from "./Header.module.scss"
import {useHistory} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import NavigationLinks from "./NavigationLinks/NavigationLinks";
import LogoImg from "../LogoImg/LogoImg";
import ButtonColored from "../ButtonColored/ButtonColored";
import ButtonBurger from "./ButtonBurger/ButtonBurger";
import {logout, removeMovies, showLoginPage} from "../../redux/actions";

export default function Header () {

  const isAuthentication = useSelector(state => state.isAuthentication)
  const isLogin = useSelector(state => state.isLogin)

  const dispatch = useDispatch();

  const [burgerState, setBurgerState] = useState(false)
  const history = useHistory();

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
            <NavigationLinks isTrigger={isTrigger}/>
          </div>

          {isLogin
              ? null
              : <div className="form-inline my-2 my-lg-0">
                {isAuthentication
                    ? <div className={styles.padding_right}>
                      <ButtonColored
                          additionalClasses={"btn-outline-secondary"}
                          onClick={handleLogout}
                      >Logout
                      </ButtonColored>
                    </div>
                    : <div className={styles.padding_right}>
                      <ButtonColored
                          additionalClasses={"btn-outline-secondary"}
                          onClick={handleLogin}
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