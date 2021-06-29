import React, {Component} from "react";
import logo from '../../img/alpinistesretraites.png'
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import FormLogin from "../FormLogin";
import Cookies from 'universal-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import jwt_decode from "jwt-decode";

export class NavBar extends Component {

    constructor(props) {
        super(props)
        const cookies = new Cookies();
        let token = cookies.get('token');
        let decoded = jwt_decode(token);
        this.state = {
            token: token,
            valid: false,
        };
        this.testToken = this.testToken.bind(this);
    }


    componentDidMount() {
        this.interval = setInterval(() => this.testToken(), 1000);
    }

    componentWillUnmount() {
    }

    testToken() {
        let decoded = jwt_decode(this.state.token);
        if (decoded != null) {
            this.setState({
                valid: ((Date.now() - decoded.exp * 1000) < 0)
            });
        }
    }


    render() {
        return <nav className="navbar navbar-expand-lg bg-light m-2 border-alpiniste">
            <div className="container-fluid">
                <a className="navbar-brand" href="/"><img src={logo} height="120%"/></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <FontAwesomeIcon icon={faBars} color="grey"/>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">
                    <ul className="navbar-nav me-auto">
                        <a href="/"
                           className="nav-item nav-link text-alpiniste">Home</a>
                        <a href="/accompagnateur/list"
                           className="nav-item nav-link active text-alpiniste">Guides</a>
                        <a href="#" className="nav-item nav-link text-alpiniste">Agences</a>
                        <a href="/destinations" className="nav-item nav-link text-alpiniste">Destinations</a>
                        <div className="nav-item dropdown">
                            <a href="#" data-toggle="dropdown"
                               className="nav-item nav-link dropdown-toggle text-alpiniste">Inscription</a>
                            <div className="dropdown-menu">
                                <a className="dropdown-item text-alpiniste" href="/guide/nouveau">Nouveau Guide</a>
                                <a className="dropdown-item text-alpiniste" href="#">Nouvelle Agence</a>
                                <a className="dropdown-item text-alpiniste" href="#">Nouveau Utilisateur</a>
                                <div className="dropdown-divider"></div>
                                <a className="dropdown-item text-alpiniste" href="#">Separated link</a>
                            </div>
                        </div>
                    </ul>
                    <div className="d-flex">
                        <div className="navbar-nav ml-auto action-buttons">
                            {!this.state.valid ? <Link to={`/accompagnateur/auth`}>
                                <a href="#" className="nav-item nav-link text-alpiniste">Login</a>
                            </Link> : <Link to={`/accompagnateur/logout`}>
                                <a href="#" className="nav-item nav-link text-alpiniste">Logout</a>
                            </Link>}
                        </div>
                    </div>
                </div>
            </div>
        </nav>


    }
}


export default NavBar

