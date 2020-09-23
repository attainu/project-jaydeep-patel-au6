import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Register from './Screens/Register.jsx'
import Login from './Screens/Login.jsx'
import Activate from './Screens/Activate'
import ForgetPassword from './Screens/ForgetPassword';

import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" exact render={props => <App {...props} />} />
      <Route path="/register" exact render={props => <Register {...props} />} /> 
      <Route path="/login" exact render={props => <Login {...props} />} /> 
      <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
      <Route path='/users/password/forget' exact render={props => <ForgetPassword {...props} />} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);


