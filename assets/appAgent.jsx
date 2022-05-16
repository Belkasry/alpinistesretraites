import './App.css';
import './css/bootstrap.min.css';
import './css/couche-bootstrap.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import React, { useState, useContext } from "react";
import AppAgentListExperiences from './components/agent/AppAgentListExperiences';

function AppAgent() {

    return (
        <Router>
            <Switch>
                <Route path="/agent/experiences/2">
                    <p>une experience</p>
                </Route>
                <Route path="/agent/experiences">
                    <AppAgentListExperiences />
                </Route>
            </Switch>
        </Router>

    );
}
export default AppAgent