import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import '../src/theme/theme.scss'
import App from './App/App';

const app = (
    <React.StrictMode>
      <App />
    </React.StrictMode>
)

ReactDOM.render(app, document.getElementById('root'));


