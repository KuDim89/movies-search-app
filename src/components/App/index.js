import React, {useState} from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import styles from './App.module.scss';
import Header from "../Header";
import Footer from "../Footer";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";
import ForgotPass from "../ForgotPass";
import {AppProvider} from "../../context";


export default function App() {
  const AppData = {
    active: false,
    login: true,
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
                    <Route path={'/home'} exact component={Home}/>
                    <Route path={'/forgotPass'} exact component={ForgotPass}/>
                  </Switch>
                </div>
                <Footer />
            </div>
          </BrowserRouter>
        </AppProvider>
  );
}

