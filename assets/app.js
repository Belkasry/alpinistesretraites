import ReactDOM from 'react-dom';
import './App.css';
import './css/bootstrap.min.css';
import './css/couche-bootstrap-material.css';
import './css/couche-bootstrap.css';
import './css/flickity.css';
import Auth from "./components/Auth";
import React, { useState, useContext } from "react";
import AppGuides from "./appGuides";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AppExperiences from './appExperiences';
import AppAgent from './appAgent';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/accompagnateur">
          <AppGuides />
        </Route>
        <Route path="/experience">
          <AppExperiences />
        </Route>
        <Route path="/auth">
          <AppGuides />
        </Route>
      </Switch>
      <Route path="/agent">
        <AppAgent />
      </Route>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'));