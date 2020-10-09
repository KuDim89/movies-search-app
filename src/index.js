import React from 'react';
import ReactDOM from 'react-dom';
import {compose, createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import thunk from "redux-thunk";
import './index.scss';
import '../src/theme/theme.scss'
import App from './App/App';
import {rootReducer} from "./redux/rootReducer";

const store = createStore(rootReducer, compose(
    applyMiddleware(
        thunk
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))
const app = (
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'));


