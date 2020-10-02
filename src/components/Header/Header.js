import React, {useContext, useState} from "react";
import styles from "./Header.module.scss"
import {useHistory} from "react-router-dom";
import AppContext from "../../context";
import NavigationLinks from "./NavigationLinks/NavigationLinks";
import LogoImg from "../LogoImg/LogoImg";
import ButtonColored from "../ButtonColored/ButtonColored";
import ButtonBurger from "./ButtonBurger/ButtonBurger";

const Header = () => {
  const {appData, setAppData} = useContext(AppContext)
  const [show, setShow] = useState(false)
  const history = useHistory();

  const handleLogout = () => {
    const newAppData = {
      ...appData,
      active: false,
      loginPage: true
    }
    history.push("/")
    setAppData(newAppData);
  }

  const handleLogin = () => {
    const newAppData = {
      ...appData,
      active: false,
      loginPage: true
    }
    history.push("/")
    setAppData(newAppData);
  }

  const isTrigger = () => {
    setShow(!show)
  }

  return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <LogoImg
                additionalClasses={'navbar-brand'}
                width={"7"}
                borderRadius={"10"}/>
          <div className={`collapse navbar-collapse ${show ? "show" : ""}`} id="navbarSupportedContent">
            <NavigationLinks isTrigger={isTrigger}/>
          </div>

          {appData.loginPage
              ? null
              : <div className="form-inline my-2 my-lg-0">
                {appData.active
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
                show={show}
                setShow={setShow}
                isTrigger={isTrigger}
            />
          </span>
        </nav>
      </header>
  )
}

export default Header;