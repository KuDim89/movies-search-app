import React, {useState} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import styles from './App.module.scss';
import Header from "../Header";
import Footer from "../Footer";
import Login from "../Login";
import Register from "../Register";
import Movies from "../Movies";
import ForgotPass from "../ForgotPass";
import {AppProvider} from "../../context";


export default function App() {
  const AppData = {
    active: false, // false
    login: true,  // true
  };

  const [appActive, setAppActive] = useState(AppData.active)
  const [loginPage, setLoginPage] = useState(AppData.login)
  return (
        <AppProvider value={{appActive, setAppActive, loginPage, setLoginPage}}>
          <BrowserRouter>
            <div className={styles.App}>
                <Header />
                <div className="container">
                  <Switch>
                    <Route path={'/'} exact component={Login}/>
                    <Route path={'/register'} exact component={Register}/>
                    <Route path={'/forgotPass'} exact component={ForgotPass}/>
                    <Route exact path="/movies">
                      {!appActive ? <Redirect to="/" /> : <Movies />}
                    </Route>
                  </Switch>
                </div>
                <Footer />
            </div>
          </BrowserRouter>
        </AppProvider>
  );
}

