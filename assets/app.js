import ReactDOM from 'react-dom';
import './App.css';
import './css/bootstrap.min.css';
import './css/couche-bootstrap-material.css';
import './css/couche-bootstrap.css';
import './css/flickity.css';
import Auth from "./components/Auth";
import React, {useState, useContext} from "react";
import AppGuides from "./appGuides";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";


function App() {
    return (
        <Router>
        <Switch>
        <Route path="/">
            <AppGuides/>
        </Route>
        </Switch>
        </Router>
);
}

ReactDOM.render(
<React.StrictMode>
<App/>
</React.StrictMode>,
document.getElementById('root'));
