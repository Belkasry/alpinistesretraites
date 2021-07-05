import React, {Component} from "react";
import axios from "axios/index";
import {ProgressBar} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useLocation
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
            errorMessage: '',
            isSignedUp: false,
            isLoading:false,
            progressLoading: 10,
            user:{},
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    getInfo = async () => {
        try {
            const login = "guide20";
            const cookies = new Cookies();
            let token= cookies.get('token');
            const instance = axios.create({
                baseURL: `http://127.0.0.1:8000/`,
                headers: {'Authorization': 'Bearer '+token}
            });
            const response = await instance.get(
                `api/users?login=${login}`
            );

                this.setState(
                    {
                        user: response.data["hydra:member"]
                    });
            cookies.set('user', JSON.stringify(this.state.user));
            window.location.replace("/accompagnateur/list");
        } finally {
        }}

    componentDidMount() {
        // const location = useLocation();
        // const { handle } = this.props.match.params
        // console.log(handle);
        // console.log(this.props.match.params.testvalue)
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
        this.getInfo();
        event.preventDefault();
    }

    render() {
        // if (this.state.isSignedUp) {
        //     return <Redirect to={{pathname: "/home"}}/>
        // }else
       const {progressLoading,isLoading}=this.state;
        // if(this.props.location.include("logout")){
        //     const cookies = new Cookies();
        //     cookies.set('token', "");
        // }
        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}


export default Auth