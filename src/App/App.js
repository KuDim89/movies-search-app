import React, {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import styles from './App.module.scss';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Movies from "../screens/Movies/Movies";
import ForgotPass from "../screens/ForgotPassword/ForgotPassword";
import {AppProvider} from "../context";
import MovieInformation from "../screens/MovieInformation/MovieInformation";
import {getDataCollection} from "../utils/firebaseFunctions/getDataCollection";
import {findId} from "../utils/findId";
import Loader from "../components/Loader/Loader";
import NotFound from "../screens/NotFound/NotFound";
import Info from "../screens/Info/Info";
import ErrorModal from "../components/ErrorModal/ErrorModal";

export default function App() {
  const initialAppData = {
    active: false, // false
    loginPage: true,  // true
  };

  const initialAppState = {
    loginData: '',
    forgotPassData: '',
    otherInfoData: '',
    users: '',
    loading: true,
    error: null
  }

  const [appData, setAppData] = useState(initialAppData);
  const [appState, setAppState] = useState(initialAppState);

  useEffect(() => {
    getAllData();
  }, [appData.active])


  async function getAllData() {
    try {
      const siteData = await getDataCollection("siteData");
      const userData = await getDataCollection("users");

      const newState = {
        ...appState,
        loginData: findId(siteData, 'login'),
        forgotPassData: findId(siteData, 'forgotPass'),
        otherInfoData: findId(siteData, 'otherInfo'),
        users: userData,
        loading: false
      }
      setAppState(newState)

    } catch (error) {
      const newState = {
        ...appState,
        error: error.message,
        loading: false
      }
      setAppState(newState)
    }
  }

  const closeModal = () => {
    getAllData();
    setAppState({
      ...appState,
      loading: true,
      error: null
    })
  }

  return (
      <>
        {appState.error
            ? <ErrorModal error={appState.error} closeModal={closeModal}/>
            : <AppProvider value={{appData, setAppData}}>
              <BrowserRouter>
                <div className={styles.App}>
                  <Header/>
                  <div className="container">
                    <Switch>
                      <Route exact path='/'>
                        {appState.loading ? <Loader/> : <Login siteData={appState.loginData} users={appState.users}/>}
                      </Route>
                      <Route exact path='/register'>
                        {appState.loading ? <Loader/> : <Register siteData={appState.loginData}/>}
                      </Route>
                      <Route exact path='/forgotPass'>
                        {appState.loading ? <Loader/> :
                            <ForgotPass siteData={appState.forgotPassData} users={appState.users}/>}
                      </Route>
                      <Route exact path="/movies">
                        {appData.active ? <Movies/> : <Redirect to="/"/>}
                      </Route>
                      <Route exact path="/movies/:id">
                        {appData.active ? <MovieInformation/> : <Redirect to="/"/>}
                      </Route>
                      <Route exact path="/info">
                        {appData.active ? <Info/> : <Redirect to="/"/>}
                      </Route>
                      <Route component={NotFound}/>
                    </Switch>
                  </div>
                  <Footer siteData={appState.otherInfoData}/>
                </div>
              </BrowserRouter>
            </AppProvider>
        }
      </>
  );
}

