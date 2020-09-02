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
import {getDataCollection} from "../../utils/api";
import {findId} from "../../utils/findId";
import Loader from "../Loader";


export default function App() {
  const appDataDefault = {
    active: false, // false
    loginPage: true,  // true
  };

  const initialAppData = JSON.parse(window.localStorage.getItem("appData")) || appDataDefault;
  const [appData, setAppData] = useState(initialAppData);
  const [loginData, setLoginData] = useState('');
  const [forgotPassData, setForgotPassData] = useState('');
  const [otherInfoData, setOtherInfoData] = useState('');
  const [users, setUsers] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDataCollection("siteData")
        .then( data => {
              setLoginData(findId(data, 'login'))
              setForgotPassData(findId(data, 'forgotPass'))
              setOtherInfoData(findId(data, 'otherInfo'))
              setLoading(false);
            }
        );
    getDataCollection("users").then(setUsers);
    window.localStorage.setItem("appData", JSON.stringify(appData))
  }, [appData])

  return (
        <AppProvider value={{appData, setAppData}}>
          <BrowserRouter>
            <div className={styles.App}>
                <Header />
                <div className="container">
                  <Switch>
                    <Route exact path='/'>
                      {loading ? <Loader /> : <Login siteData={loginData} users={users}/>}
                    </Route>
                    <Route exact path='/register'>
                      {loading ? <Loader /> : <Register siteData={loginData}/>}
                    </Route>
                    <Route exact path='/forgotPass'>
                      {loading ? <Loader /> : <ForgotPass siteData={forgotPassData} users={users}/>}
                    </Route>
                    <Route exact path="/movies">
                      {appData.active ? <Movies /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/movies:id">
                      {appData.active ? <MovieInformation /> : <Redirect to="/" />}
                    </Route>
                  </Switch>
                </div>
                <Footer siteData={otherInfoData}/>
            </div>
          </BrowserRouter>
        </AppProvider>
  );
}

