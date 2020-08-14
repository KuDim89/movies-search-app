import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import styles from './App.module.scss';
import Header from "../Header";
import Footer from "../Footer";
import Login from "../Login";
import Register from "../Register";
import Home from "../Home";

export default function Index() {
  return (
        <BrowserRouter>
          <div className={styles.App}>
              <Header />
              <div className="container">
                <Switch>
                  <Route path={'/'} exact component={Login}/>
                  <Route path={'/register'} exact component={Register}/>
                  <Route path={'/home'} exact component={Home}/>
                </Switch>
              </div>
              <Footer />
          </div>
        </BrowserRouter>
  );
}

