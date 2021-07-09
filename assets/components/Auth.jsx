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
            isLoading: false,
            progressLoading: 10,
            user: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.authentificate = this.authentificate.bind(this);
        this.getInfo = this.getInfo.bind(this);

    }

    async getInfo() {
        try {

            if (this.state.isSignedUp) {
                console.log("in");
                const login = this.state.username;
                const cookies = new Cookies();
                let token = cookies.get('token');
                const instance = axios.create({
                    baseURL: `http://127.0.0.1:8000/`,
                    headers: {'Authorization': 'Bearer ' + token}
                });
                const response = await instance.get(
                    `api/users?login=${login}`
                );

                let res = response.data["hydra:member"][0];
                let Leuser = {
                    id: res.id,
                    email: res.email,
                    login: res.login,

                };
                let LeUserComplement = {};
                if (res.guide) {
                    LeUserComplement = {
                        nom: res.guide.nom,
                        prenom: res.guide.prenom,
                        fullName: res.guide.fullName,
                        location: res.guide.location,
                        phone: res.guide.phone,
                        imageName: res.guide.imageName,
                        guide: res.guide.id
                    };
                }
                if(res.utilisateur){
                    LeUserComplement = {
                        nom: res.utilisateur.nom,
                        prenom: res.utilisateur.prenom,
                        fullName: res.utilisateur.fullName,
                        location: res.utilisateur.location,
                        phone: res.utilisateur.phone,
                        imageName: res.utilisateur.imageName,
                    };
                }

                for (var k in LeUserComplement) Leuser[k] = LeUserComplement[k];

                this.setState(
                    {
                        user: Leuser,
                        progressLoading: 10,
                        isLoading: false
                    });

                cookies.set('user', JSON.stringify(this.state.user));
                clearInterval(this.interval);
            }
            window.location.replace("/accompagnateur/list");
        } finally {
            clearInterval(this.interval);
        }
    }

    componentDidMount() {
        // const location = useLocation();
        // const { handle } = this.props.match.params
        // console.log(handle);
        // console.log(this.props.match.params.testvalue)
    }

    componentDidUpdate(prevProps, prevState) {
    }


    async authentificate() {
        try {

            this.setState({isLoading: true});
            this.interval = setInterval(() => this.tick(), 500);

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
                .then((response) => {

                    const cookies = new Cookies();
                    const token = response.data.token;
                    cookies.set('token', token);
                    this.setState({isSignedUp: true});

                }).then(response => {
                    this.getInfo();
                }
            )
                .catch(err => {
                    this.setState({
                        errorMessage: err.response ? err.response.data.message : err.toString(),
                        isSignedUp: false,
                        isLoading:false,

                    });

                });

        } finally {
            console.log('----------------->>>>>>>>');

        }
    }

    tick() {
        if (this.state.isLoading) {
            this.setState(state => ({
                progressLoading: state.progressLoading + 10
            }));
        } else {
            this.setState(state => ({
                progressLoading: 10
            }));

            clearInterval(this.interval);
        }
    }


    handleSubmit(event) {
        this.authentificate();
        event.preventDefault();
    }

    render() {
        const {progressLoading, isLoading} = this.state;
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


                    {isLoading ?
                        <ProgressBar striped animated now={progressLoading}
                                     className="col-md-2 m-auto mt-3 mb-4"
                                     variant="info"/> : ""}

                    {this.state.errorMessage &&
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                        <strong>Oh snap!</strong> <a href="#" className="alert-link">{this.state.errorMessage}</a>
                    </div>}
                    <input type="submit" className="btn btn-primary btn-block" value="Login"/>
                    <div className="text-center mt-2">
                        <a href="#">Forgot Your password?</a>
                    </div>
                    <a href="/accompagnateur/signup" className="text-success">Sign up ?</a>
                </form>
            </React.Fragment>
        )
    }
}


export default Auth