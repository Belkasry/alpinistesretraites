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


    following = () => { this.setState({ follow: !this.state.follow }); };

    isfollowed = () => {
        try {
            var baseUrl = 'https://127.0.0.1:8000/api/subscriptions?page=1&id=' + this.props.subscription + '&guide=' + this.props.guide;
            var config = {
                method: 'get',
                url: baseUrl,
                headers: {}
            };

            axios(config)
                .then((response) => {
                    console.log("--------   -------");
                    console.log(JSON.stringify(response.data));
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