import ReactDOM from 'react-dom';
import './App.css';
import './css/bootstrap.min.css';
import './css/couche-bootstrap-material.css';
import './css/couche-bootstrap.css';
import './css/flickity.css';
import Guide from "./components/Guide";
import Auth from "./components/Auth";
import NavBar from "./components/partials/NavBar";
import axios from 'axios';
import {Guides} from "./components/Guides";
import Footer from "./components/partials/Footer";
import NavSearch from "./components/NavSearch";
import React, {useState, useContext} from "react";
import SearchContext from "./SearchContext";
import {GuideProfil} from "./components/GuideProfil";
import AppGuides from "./appGuides";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
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
