import React from 'react';
import styles from './style.scss';
import Header from "../Header";
import Switch, {BrowserRouter} from "react-router-dom";
import Route from "react-router-dom";

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
        </div>
      </BrowserRouter>
  );
}

export default App;
