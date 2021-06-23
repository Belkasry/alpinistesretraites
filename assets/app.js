import ReactDOM from 'react-dom';
import './App.css';
import './css/bootstrap.min.css';
import './css/couche-bootstrap-material.css';
import './css/couche-bootstrap.css';
import './css/flickity.css';
import Guide from "./components/Guide";
import NavBar from "./components/partials/NavBar";
import axios from 'axios';
import {Guides} from "./components/Guides";
import Footer from "./components/partials/Footer";
import NavSearch from "./components/NavSearch";
import React, {useState, useContext} from "react";
import SearchContext from "./SearchContext";
import {GuideProfil} from "./components/GuideProfil";
import AppGuides from "./appGuides";


function App() {
    return (
        <AppGuides/>
);
}

ReactDOM.render(
<React.StrictMode>
<App />
</React.StrictMode>,
document.getElementById('root'));
