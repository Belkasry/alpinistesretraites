import React, {Component} from "react";
import Flickity from "react-flickity-component";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook,faGoogle} from "@fortawesome/free-brands-svg-icons";

class FormLogin extends Component {

    constructor(props){
        super(props);

    }


    render() {
        return (
            <form action="" method="post" className="form-login">
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
                           placeholder="Username" required="required"/>
                </div>
                <div className="form-group">
                    <input type="password" name="_password" id="password"
                           className="form-control mb-2"
                           placeholder="Password" required="required"/>
                </div>
                <input type="submit" className="btn btn-primary btn-block" value="Login"/>
                <div className="text-center mt-2">
                    <a href="#">Forgot Your password?</a>
                </div>
            </form>
        )
    }
}


export default FormLogin