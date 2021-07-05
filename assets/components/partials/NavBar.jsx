import React, {Component} from "react";
import logo from '../../img/alpinistesretraites.png'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faBell, faComment, faCommentAlt, faUserAlt, faSignOutAlt} from "@fortawesome/free-solid-svg-icons";
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
        let token = cookies.get('token') ? cookies.get('token') : "";
        let decoded = "";
        if (token !== "")
            decoded = jwt_decode(token);

        let user = cookies.get('user') ? cookies.get('user') : {};
        let profil = user[0];

        this.state = {
            token: token,
            valid: true,
            decoded: decoded,
            user: profil
        }
        this.testToken = this.testToken.bind(this);
    }


    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get("token") != "")
            this.interval = setInterval(() => this.testToken(), 100);
        else {
            this.setState({
                valid: false
            });
        }


    }

    componentWillUnmount() {
    }

    logout = async () => {

        const cookies = new Cookies();
        cookies.set('token', "");
        this.setState({
            valid: false
        });
    }

    testToken() {
        let decoded = "";
        if (this.state.token !== "")
            decoded = jwt_decode(this.state.token);

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
                                </Link> :
                                <div className="navbar-nav ml-auto mr-3">
                                    <a href="#" className="nav-item nav-link notifications">
                                        <FontAwesomeIcon icon={faBell} color="#637b86"/>
                                        <span className="badge">1</span></a>
                                    <a href="#" className="nav-item nav-link messages">
                                        <FontAwesomeIcon icon={faCommentAlt} color="#637b86"/>
                                        <span className="badge">10</span></a>
                                    <div className="nav-item dropdown">
                                        <a href="#" data-toggle="dropdown"
                                           className="nav-link dropdown-toggle user-action">
                                            <img src={this.state.user.guide.imageName ? "/images/guides/" + this.state.user.guide.imageName : "https://via.placeholder.com/150/FF0000/FFFFFF?Alpiniste"} height="50px" className="avatar"
                                                 alt="Avatar"/> {this.state.user ? this.state.user.guide.fullName : ""} </a>
                                        <div className="dropdown-menu">

                                            <a href="/account" className="dropdown-item">
                                                <FontAwesomeIcon icon={faUserAlt} color="grey" className="mr-3"/>
                                                {"  "}Profile</a>
                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item ml-2" onClick={this.logout}>
                                                <FontAwesomeIcon icon={faSignOutAlt} color="grey" className="mr-3"/>
                                                {"  "}Logout</a>
                                        </div>
                                    </div>
                                </div>

                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>


    }
}


export default NavBar

