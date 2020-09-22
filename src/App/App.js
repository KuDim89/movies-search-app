import React, {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import styles from './App.module.scss';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Movies from "../screens/Movies/Movies";
import ForgotPass from "../screens/ForgotPass/ForgotPassword";
import {AppProvider} from "../context";
import MovieInformation from "../screens/MovieInformation/MovieInformation";
import {getDataCollection} from "../utils/firebaseFunctions/getDataCollection";
import {findId} from "../utils/findId";
import Loader from "../components/Loader/Loader";
import NotFound from "../screens/NotFound/NotFound";
import Info from "../screens/Info/Info";


export default function  App() {
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
                    <Route exact path="/movies/:id">
                      {appData.active ? <MovieInformation /> : <Redirect to="/" />}
                    </Route>
                    <Route exact path="/info">
                      {appData.active ? <Info /> : <Redirect to="/" />}
                    </Route>
                    <Route component={NotFound}/>
                  </Switch>
                </div>
                <Footer siteData={otherInfoData}/>
            </div>
          </BrowserRouter>
        </AppProvider>
  );
}

