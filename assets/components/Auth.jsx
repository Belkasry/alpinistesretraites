import React, {Component} from "react";
import Gallery from "react-grid-gallery";
import axios from "axios/index";
import {faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons/index";
import {ProgressBar} from 'react-bootstrap';
import FormLogin from "./FormLogin";
import AppGuides from "../appGuides";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faGoogle} from "@fortawesome/free-brands-svg-icons"
import Cookies from 'universal-cookie';


class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            items: [],
            errorMessage: ''
        };

        this.handleSubmit = this.handleSubmit.bind(this);

    }


    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState) {
    }


    authentificate = async () => {
        try {
            var data = JSON.stringify({
                "username": this.state.username,
                "password": this.state.password
            });

            var config = {
                method: 'post',
                url: 'http://127.0.0.1:8000/api/login_check',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios(config)
                .then(function (response) {

                    const cookies = new Cookies();
                    const token = response.data.token;
                    cookies.set('token', token);
                })
                .catch(err => {
                    this.setState({errorMessage: err.response.data.message});
                });
        } finally {
        }
    }

    handleSubmit(event) {
        this.authentificate();
        event.preventDefault();
    }

    render() {
        return (
            <form method="post" onSubmit={this.handleSubmit}>
                <p className="hint-text">Sign in with your social media account</p>
                <div className="form-group social-btn d-flex">
                    <a href="#" className="btn btn-secondary facebook-btn float-left bg-info ">
                        <b> <FontAwesomeIcon icon={faFacebook}/> Facebook</b></a>
                    <a href="#" className="btn btn-secondary google-btn float-right bg-warning">
                        <b><FontAwesomeIcon icon={faGoogle}/> Google</b></a>
                </div>
                <div className="or-seperator"><b>ou</b></div>
                <div className="form-group">
                    <input name="_username" id="username" type="text" className="form-control mb-2"
                           placeholder="Username" required="required" value={this.state.username}
                           onChange={e => this.setState({username: e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="password" name="_password" id="password"
                           className="form-control mb-2"
                           placeholder="Password" required="required" value={this.state.password}
                           onChange={e => this.setState({password: e.target.value})}/>
                </div>
                {this.state.errorMessage &&
                <div className="alert alert-dismissible alert-danger">
                    <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                    <strong>Oh snap!</strong> <a href="#" className="alert-link">{this.state.errorMessage}</a>
                </div>}
                <input type="submit" className="btn btn-primary btn-block" value="Login"/>
                <div className="text-center mt-2">
                    <a href="#">Forgot Your password?</a>
                </div>
            </form>

        )
    }
}


export default Auth