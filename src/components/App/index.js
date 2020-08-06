import React from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import styles from './App.module.scss';
import Header from "../Header";
import Footer from "../Footer";
import Login from "../Login";
import Register from "../Register";

export default function App() {
  return (
      <BrowserRouter>
        <div className={styles.App}>
            <Header />
            <div className="container">
            <Switch>
              <Route path={'/'} exact component={Login}/>
              <Route path={'/register'} exact component={Register}/>
            </Switch>
            </div>
            <Footer />
        </div>
      </BrowserRouter>
  );
}

