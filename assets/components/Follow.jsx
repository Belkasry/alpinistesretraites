import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown, faCheckDouble, faRss } from "@fortawesome/free-solid-svg-icons/index";
import axios from "axios/index";
import Cookies from 'universal-cookie';

class Follow extends Component {

    constructor(props) {
        super(props);

        this.state = {
            follow: false,
            user: { subscription: 0 }
        }



        this.follow_ = this.follow_.bind(this);
        this.following = this.following.bind(this);
        this.isfollowed = this.isfollowed.bind(this);
    }

    follow_() {

        this.following();
    }

    componentDidMount() {

        this.isfollowed();
    }


    isfollowed = () => {
        try {
            const cookies = new Cookies();
            if (cookies.get('user')) {
                let leuser = cookies.get('user');
                if (leuser.subscription) {
                    var condition = this.props.guide ? ('&guide=' + this.props.guide) : (this.props.experience ? ('&experience=' + this.props.experience) : "");

                    var baseUrl = 'https://127.0.0.1:8000/api/subscriptions?page=1&id=' + leuser.subscription + condition;
                    var config = {
                        method: 'get',
                        url: baseUrl,
                        headers: {}
                    };

                    axios(config)
                        .then((response) => {
                            if (response.data["hydra:totalItems"] > 0) {
                                this.setState(
                                    { follow: true }
                                )
                            } else {
                                this.setState(
                                    { follow: false }
                                )
                            }
                        })
                        .catch((error) => {
                            this.setState(
                                { follow: false }
                            )
                            console.log(error);
                        });
                }
            }

        } finally {
        }
    };

    following() {
        try {
            const cookies = new Cookies();
            let abonne = this.state.follow;
            let entite, id_entite, ObjetData = {};



            if (cookies.get('user')) {
                let leuser = cookies.get('user');
                if (leuser.subscription) {

                    if (this.props.guide) {
                        entite = "guides";
                        id_entite = this.props.guide;
                        ObjetData = {
                            "guide": [
                                "/api/guides/" + id_entite
                            ],

                        };

                    } else if (this.props.experience) {
                        entite = "experiences";
                        id_entite = this.props.experience;
                        ObjetData = {
                            "experience": [
                                "/api/experiences/" + id_entite,
                            ],
                        }
                    }

                    var data = JSON.stringify({
                        ObjetData
                    });
                    var base_url = "https://127.0.0.1:8000/api/subscriptions/" + leuser.subscription;
                    var config = {
                        method: abonne ? 'delete' : 'patch',
                        url: base_url + (abonne ? '/patch' : ''),
                        headers: {
                            'Content-Type': !abonne ? 'application/merge-patch+json' : 'application/json'
                        },
                        data: data
                    };

                    console.log("------------------->> la data experience ou guide");
                    console.log(data);

                    axios(config)
                        .then((response) => {
                            console.log(JSON.stringify(response.data));
                        })
                        .catch((error) => {
                            this.setState({ follow: !abonne });
                            console.log(error);
                        });
                }
            }
        } finally {
        }


    };





    render() {

        const { } = this.state;
        return (
            <React.Fragment>
                <button type="button"
                    className={"btn btn-outline-success " + (this.state.follow ? " clicked" : " btn-alpiniste")}
                    onClick={this.follow_}>
                    <b><FontAwesomeIcon
                        icon={(this.state.follow ? faCheckDouble : faRss)} /> {(this.state.follow ? "" : "Follow")}
                    </b>
                </button>
            </React.Fragment>);
    }
}


export default Follow