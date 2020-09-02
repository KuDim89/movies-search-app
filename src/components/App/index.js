import React, {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import styles from './App.module.scss';
import Header from "../Header";
import Footer from "../Footer";
import Login from "../Login";
import Register from "../Register";
import Movies from "../Movies";
import ForgotPass from "../ForgotPass";
import {AppProvider} from "../../context";
import MovieInformation from "../MovieInformation";


export default function App() {
  const appDataDefault = {
    active: false, // false
    loginPage: true,  // true
  };

  const initialAppData = JSON.parse(window.localStorage.getItem("appData")) || appDataDefault;
  const [appData, setAppData] = useState(initialAppData);

  useEffect(() => {
    window.localStorage.setItem("appData", JSON.stringify(appData))
  }, [appData])

  return (
        <AppProvider value={{appData, setAppData}}>
          <BrowserRouter>
            <div className={styles.App}>
                <Header />
                <div className="container">
                  <Switch>
                    <Route exact path={'/'} component={Login}/>
                    <Route exact path={'/register'} component={Register}/>
                    <Route exact path={'/forgotPass'} component={ForgotPass}/>
                    <Route exact path="/movies">
                      {appData.active ? <Movies /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/movies:id">
                      {appData.active ? <MovieInformation /> : <Redirect to="/" />}
                    </Route>
                  </Switch>
                </div>
                <Footer />
            </div>
          </BrowserRouter>
        </AppProvider>
  );
}

