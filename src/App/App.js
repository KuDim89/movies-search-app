import React, {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {useDispatch} from "react-redux";
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
import {useAuth} from "../hooks/use-auth";
import {useApp} from "./hooks/use-app";


export default function App () {
  const dispatch = useDispatch()
  const isAuthentication = useAuth()
  const app = useApp()

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
                <Route exact path="/movies" component={Movies} />
                <Route exact path="/movies/:id" component={MovieInformation} />
                <Route exact path="/info" component={Info} />
                <Route component={NotFound}/>
              </Switch>
            </div>
            <Footer siteData={app.otherInfoData}/>
          </div>
        </BrowserRouter>
      </>
  );
}