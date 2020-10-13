import React, {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import styles from './App.module.scss';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Movies from "../screens/Movies/Movies";
import MovieInformation from "../screens/MovieInformation/MovieInformation";
import Loader from "../components/Loader/Loader";
import NotFound from "../screens/NotFound/NotFound";
import Info from "../screens/Info/Info";
import {getFirebaseData} from "../redux/actions";
import ForgotPassword from "../screens/ForgotPassword/ForgotPassword";
import ErrorModal from "../components/ErrorModal/ErrorModal";

const App = ({isAuthentication, app, getFirebaseData}) => {

  const initialState = {
    loader: true,
    error: null
  }

  const [appState, setAppState] = useState(initialState);

  useEffect(() => {
    getAllAppData()
  }, [isAuthentication])

  async function getAllAppData() {
    try {
      await getFirebaseData();
      setAppState({...appState, loader: false})
    } catch (error) {
      setAppState({...appState, loader: false, error: error.message})
    }
  }

  const closeModal = () => {
    setAppState({loader: true, error: null})
    getAllAppData()
  }

  return (
      appState.error
      ? <ErrorModal error={appState.error} closeModal={closeModal}/>
      : <>
        <BrowserRouter>
          <div className={styles.App}>
            <Header/>
            <div className="container">
              <Switch>
                <Route exact path='/'>
                  {appState.loader ? <Loader/> : <Login/>}
                </Route>
                <Route exact path='/register'>
                  {appState.loader ? <Loader/> : <Register/>}
                </Route>
                <Route exact path='/forgotPass'>
                  {appState.loader ? <Loader/> : <ForgotPassword/>}
                </Route>
                <Route exact path="/movies">
                  {isAuthentication ? <Movies/> : <Redirect to="/"/>}
                </Route>
                <Route exact path="/movies/:id">
                  {isAuthentication ? <MovieInformation/> : <Redirect to="/"/>}
                </Route>
                <Route exact path="/info">
                  {isAuthentication ? <Info/> : <Redirect to="/"/>}
                </Route>
                <Route component={NotFound}/>
              </Switch>
            </div>
            <Footer siteData={app.otherInfoData}/>
          </div>
        </BrowserRouter>
      </>
  );
}

const mapStateToProps = state => {
  return {
    isAuthentication: state.isAuthentication,
    app: state.app,
  }
}

const mapDispatchToProps = {
  getFirebaseData
}

export default connect(mapStateToProps, mapDispatchToProps)(App)