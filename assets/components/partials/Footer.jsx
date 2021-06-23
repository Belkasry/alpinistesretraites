import React, {Component} from "react";
import logo from '../../img/alpinistesretraites.png'
import {faPaperPlane,faBaby} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class Footer extends Component {

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
        return <footer className="bg-light card border-alpiniste m-2">
            <div className="container py-1">
                <div className="row py-4">
                    <div className="col-lg-4 col-md-6 mb-4 mb-lg-0"><img src={logo} alt="" width="180"
                                                                         className="mb-3"/>
                        <p className="font-italic text-muted">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit,sed do eiusmod tempor
                            incididunt.</p>
                        <ul className="list-inline mt-4">
                            <li className="list-inline-item"><a href="#" target="_blank" title="twitter">
                                <FontAwesomeIcon icon={faBaby}/></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"
                                                                title="facebook"><FontAwesomeIcon icon={faBaby}/></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"
                                                                title="instagram"><FontAwesomeIcon icon={faBaby}/></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank"
                                                                title="pinterest"><FontAwesomeIcon icon={faBaby}/></a></li>
                            <li className="list-inline-item"><a href="#" target="_blank" title="vimeo"><FontAwesomeIcon
                                icon={faBaby}/></a></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <h6 className="text-uppercase font-weight-bold mb-4">Shop</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><a href="#" className="text-muted">For Women</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">For Men</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Stores</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Our Blog</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
                        <h6 className="text-uppercase font-weight-bold mb-4">Company</h6>
                        <ul className="list-unstyled mb-0">
                            <li className="mb-2"><a href="#" className="text-muted">Login</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Register</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Wishlist</a></li>
                            <li className="mb-2"><a href="#" className="text-muted">Our Products</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-4 col-md-6 mb-lg-0">
                        <h6 className="text-uppercase font-weight-bold mb-4">Newsletter</h6>
                        <p className="text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
                            itaque
                            temporibus.</p>
                        <div className="p-1 rounded border">
                            <div className="input-group">
                                <input type="email" placeholder="Enter your email address"
                                       aria-describedby="button-addon1"
                                       className="form-control border-0 shadow-0"/>
                                <div className="input-group-append">
                                    <button id="button-addon1" type="submit" className="btn btn-link"><FontAwesomeIcon
                                        icon={faPaperPlane}/></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-light ">
                <div className="container text-center">
                    <p className="text-muted mb-0 py-2">© 2021 Alpinistes Retraites All rights reserved.</p>
                </div>
            </div>
        </footer>
    }
}

export default Footer
