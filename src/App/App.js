import React, {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
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


export default function App () {

  const isAuthentication = useSelector(state => state.isAuthentication)
  const app = useSelector(state => state.app)

  const dispatch = useDispatch()

  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(null);

  useEffect(() => {
    getAllAppData()
  }, [isAuthentication])

  async function getAllAppData() {
    setLoading(true)
    try {
      await dispatch(getFirebaseData());
    } catch (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const closeModal = () => {
    setLoading(true)
    setError(null)
    getAllAppData()
  }

  return (
      isError
      ? <ErrorModal error={isError} closeModal={closeModal}/>
      : <>
        <BrowserRouter>
          <div className={styles.App}>
            <Header/>
            <div className="container">
              <Switch>
                <Route exact path='/'>
                  {isLoading ? <Loader/> : <Login/>}
                </Route>
                <Route exact path='/register'>
                  {isLoading ? <Loader/> : <Register/>}
                </Route>
                <Route exact path='/forgotPass'>
                  {isLoading ? <Loader/> : <ForgotPassword/>}
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