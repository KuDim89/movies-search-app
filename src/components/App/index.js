import React, {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter} from "react-router-dom";
import styles from './App.module.scss';
import Header from "../Header";
import Footer from "../Footer";
import Login from "../Login";
import Register from "../Register";
import {db} from "../../firebase";
import {onLog} from "firebase";


export default function App() {
  const [justwatch, setJustwatch] = useState([]);

  useEffect(() => {
    db.collection("justwatch")
        .get()
        .then(querySnapshot => {
          const justwatch = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setJustwatch(justwatch);
        })
        .catch(error => {
          console.log("Error getting documents: ", error);
        });
  },[]);

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

