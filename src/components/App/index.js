import React from 'react';
import styles from './App.module.scss';
import Header from "../Header";
import {BrowserRouter} from "react-router-dom";
import Footer from "../Footer";

function App() {
  return (
      <BrowserRouter>
        <div className={styles.App}>
            <Header />
            <div className="container">
              {/*<Switch>
              <Route path={'/'} exact component={}/>
            </Switch>*/}
            </div>
            <Footer />
        </div>
      </BrowserRouter>
  );
}

export default App;
