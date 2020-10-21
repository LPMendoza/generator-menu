import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "./assets/App.css";
import './assets/fontawesome/css/all.css'

import { HashRouter, Switch, Route } from 'react-router-dom';

import  ManagmentContainer from './pages/ManagmentContainer';

const {remote}= window.require("electron");

function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ManagmentContainer}></Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
