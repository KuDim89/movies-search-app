import React, {useEffect} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import styles from './App.module.scss';
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../screens/Login/Login";
import Register from "../screens/Register/Register";
import Movies from "../screens/Movies/Movies";
import ForgotPass from "../screens/ForgotPassword/ForgotPassword";
import MovieInformation from "../screens/MovieInformation/MovieInformation";
import Loader from "../components/Loader/Loader";
import NotFound from "../screens/NotFound/NotFound";
import Info from "../screens/Info/Info";
import ErrorModal from "../components/ErrorModal/ErrorModal";
import {getFirebaseData, hideLoader, removeError, showLoader} from "../redux/actions";

const App = ({isAuthentication, app, error, getFirebaseData, removeError, hideLoader, showLoader, loader}) => {

  useEffect(async () => {
    await getFirebaseData()
    hideLoader()
  }, [isAuthentication])


  const closeModal = () => {
    removeError()
    getFirebaseData()
    showLoader()
  }

  return (
      <>
        {error
            ? <ErrorModal error={error} closeModal={closeModal}/>
            : <BrowserRouter>
              <div className={styles.App}>
                <Header/>
                <div className="container">
                  <Switch>
                    <Route exact path='/'>
                      {loader ? <Loader/> : <Login/>}
                    </Route>
                    <Route exact path='/register'>
                      {loader ? <Loader/> : <Register siteData={app.loginData}/>}
                    </Route>
                    <Route exact path='/forgotPass'>
                      {loader ? <Loader/> :
                          <ForgotPass siteData={app.forgotPassData} users={app.users}/>}
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
        }
      </>
  );
}

const mapStateToProps = state => {
  return {
    isAuthentication: state.isAuthentication,
    app: state.app,
    error: state.isError,
    loader: state.isLoader
  }
}

const mapDispatchToProps = {
  getFirebaseData,
  removeError,
  hideLoader,
  showLoader
}

export default connect(mapStateToProps, mapDispatchToProps)(App)