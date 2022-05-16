import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons/index";
import axios from "axios/index";
import Cookies from 'universal-cookie';
import ReactStars from "react-stars";

class InfoPratique extends Component {

    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }



    render() {

        var { requirements, notices, including } = this.props;
        return (
            <React.Fragment>
                <div className="card border-warning  mb-3">

                    <div className="card-header bg-light">Requirements</div>
                    <ol className="m-3" style={{ listStyle: "none", textAlign: "left", borderLeft: "solid 3px #ffc107", paddingLeft: "0.2rem" }}>
                        {
                            requirements.map((requirement, index) => (
                                <li key={"req" + index} >
                                    <button className={"btn btn-outline-light  p-2 text-moyen text-dark bg-white "}>
                                        {requirement}</button></li>
                            ))
                        }
                    </ol>
                </div>
                <div className="card border-danger mb-3">
                    <div className="card-header bg-light">Notices</div>
                    <ol className="m-3" style={{ listStyle: "none", textAlign: "left", borderLeft: "solid 3px #dc3545", paddingLeft: "0.2rem" }}>
                        {
                            notices.map((notice, index) => (
                                <li key={"not" + index} ><button className={"btn btn-outline-light  p-2 text-moyen text-dark  bg-white"}>{notice}</button></li>
                            ))
                        }
                    </ol>
                </div>
                <div className="card border-info  mb-3">
                    <div className="card-header bg-light">Including</div>
                    <ol className="m-3" style={{ listStyle: "none", textAlign: "left", borderLeft: "solid 3px #17a2b8", paddingLeft: "0.2rem" }}>
                        {
                            including.map((include, index) => (
                                <li key={"inc" + index} ><button className={"btn btn-outline-light  p-2 text-moyen text-dark  bg-white"}>{include}</button></li>
                            ))
                        }
                    </ol>

                </div>

            </React.Fragment>);
    }
}


export default InfoPratique