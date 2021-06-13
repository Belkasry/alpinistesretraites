import React, {Component} from "react";
import logo from '../../img/alpinistesretraites.png'
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class NavBar extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    tick() {
    }

    render() {
        return <nav className="navbar navbar-expand-lg navbar-fixed-top bg-light m-2">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src={logo} width="100px"/></a>
                <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                    <FontAwesomeIcon icon={faBars} color="grey"/>
                </button>
                <div id="navbarCollapse" className="collapse navbar-collapse justify-content-start">
                    <div className="navbar-nav">
                        <a href="/"
                           className="nav-item nav-link">Home</a>
                        <a href="/guides"
                           className="nav-item nav-link underline">Guides</a>
                        <a href="#" className="nav-item nav-link ">Agences</a>
                        <a href="/destinations" className="nav-item nav-link ">Destinations</a>
                        <div className="nav-item dropdown">
                            <a href="#" data-toggle="dropdown"
                               className="nav-item nav-link dropdown-toggle">Inscription</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item" href="/guide/nouveau">Nouveau Guide</a>
                                <a className="dropdown-item" href="#">Nouvelle Agence</a>
                                <a className="dropdown-item" href="#">Nouveau Utilisateur</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item" href="#">Separated link</a>
                            </div>
                        </div>
                        <a href="#" className="nav-item nav-link ">About</a>
                    </div>
                </div>
            </div>
        </nav>
    }
}

export default NavBar

