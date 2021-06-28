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
        this.state = {}
        const cookies = new Cookies();
        let token = cookies.get('token');

    }




    componentDidMount() {
        let token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2MjQ2MTM5NTMsImV4cCI6MTYyNDY0OTk1Mywicm9sZXMiOlsiUk9MRV9VU0VSIiwiUk9MRV9HVUlERSIsIlJPTEVfQURNSU4iXSwidXNlcm5hbWUiOiJndWlkZTAwNyJ9.oS64oJMC7ZoJzAVdyzJTYCeOOtMEexWZw5RCZyPhsDxLNp0tGF6LK42DNZ7-vlNr-HS9RXAL4_wZtkpHre9G8yXUijpoy1xkztq2WXRC-CRxdnlaq8H72s2sbalmWKGKDVZY-5ynNpTMp8jvNIPzunmRNP4RP-k26NUxlZOu5QqKgx5cGC2gqOZvxPBNDE8bSUmKQ7vxRNBtDUkgLfcNZ-bVNF_ZM8TQ7EhqrWpQOqnuquFv9cSydI5MUEE501-gHKGP3megAfbM1D-E7n13KQGkg1kSxXFIcoV0rhum__N-X0d-IB6mQaVvXaa3TAU-JQx6ODv_n97J8vitW0UcJd7w4gyXCKZ0Kij80Db9jWyWCoLP4rb1hSWGzMrMvmA0EbphvHXq3nwUYiFGmdWNfhu2MUhq2q-M_2-nuq3vpzhi29air2aFhCy4UaMl5V2Z6NaOOdpeTkj-k70ffz2wIrBfyCCyjXMClK1KWWQayecxGMkYD_HBOZoJd2r7q5d_sOQBTZCdURsX9lpD6uQ61GbP7fcF1PpO4p-3LyMR7jnxU0UyZBre6W8Spc7LWGhn-aIV6Gc68h6rZ-xmLYygeLRB86XZZY1Us1Ed6U7UagO5bzpxCjYlohOtmVSExBCkzVymdZqG6hkBGUDhBTCm4pQ5hZMhN9_VWaMXqXJyn2s";
        let decoded = jwt_decode(token);
        console.log(decoded);
    }

    componentWillUnmount() {
    }

    tick() {
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
                            {true ? <Link to={`/accompagnateur/auth`}>
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

