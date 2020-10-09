import React, {useState} from "react";
import styles from "./Header.module.scss"
import {useHistory} from "react-router-dom";
import NavigationLinks from "./NavigationLinks/NavigationLinks";
import LogoImg from "../LogoImg/LogoImg";
import ButtonColored from "../ButtonColored/ButtonColored";
import ButtonBurger from "./ButtonBurger/ButtonBurger";
import {connect} from "react-redux";
import {logout, showLoginPage} from "../../redux/actions";

const Header = ({isAuthentication, isLogin, logout, showLoginPage}) => {
  const [burgerState, setBurgerState] = useState(false)
  const history = useHistory();

  const handleLogout = () => {
    logout();
    showLoginPage();
    history.push("/")
  }

  const handleLogin = () => {
    logout();
    showLoginPage();
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

const mapStateToProps = state => {
  return {
    isAuthentication: state.isAuthentication,
    isLogin: state.isLogin
  }
}

const mapDispatchToProps = {
  logout,
  showLoginPage
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);