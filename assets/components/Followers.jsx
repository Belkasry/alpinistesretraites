import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons/index";
import axios from "axios/index";
import Cookies from 'universal-cookie';

class Followers extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            isLoading: false,
            progressLoading: 10,
            max: false,
            subscriptions: [],
        }
    }

    componentDidMount() {
        this.loadSubscriptions();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.loadSubscriptions();
            ;
        }
    }

    tick() {
        this.setState(state => ({
            progressLoading: state.progressLoading + 20
        }));
    }

    loadMore = () => {
        this.setState({ page: this.state.page + 1 });
    };


    loadSubscriptions = async () => {
        try {
            const { page } = this.state;
            this.setState({ isLoading: true });
            this.interval = setInterval(() => this.tick(), 100);
            const cookies = new Cookies();
            let token = cookies.get('token');
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let _condition = "";
            if (this.props.experience_id) {
                _condition = `experience=${this.props.experience_id}`;
            }
            else if (this.props.guide_id) {
                _condition = `guide=${this.props.guide_id}`;
            }

            

            const response = await instance.get(
                `api/subscriptions?page=${page}&` + _condition
            );
            if (response.data["hydra:member"].length < 1) {
                this.setState({ max: true });
            }
            this.setState((prevState) => ({
                subscriptions: [...prevState.subscriptions, ...response.data["hydra:member"]],
                progressLoading: 10
            }));
            clearInterval(this.interval);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    render() {

        const { subscriptions, isLoading, max, progressLoading } = this.state;
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row justify-content-md-center">
                        {
                            subscriptions.map((subscription, index) => (
                                <div key={"not" + index} className="col" ><button className={"btn btn-outline-secondary  p-2 text-moyen text-dark  bg-white"}>
                                    {subscription.login}</button></div>
                            ))
                        }
                    </div>
                </div>
                {!max ?
                    <div>
                        {isLoading ?
                            <ProgressBar striped animated now={progressLoading} className="col-md-2 m-auto mt-3 mb-4"
                                variant="info" /> :
                            <a id="button3" className="btn btn-outline-success mt-3 mb-4 pl-2 pr-2 btn-alpiniste"
                                onClick={this.loadMore}>
                                <FontAwesomeIcon icon={faAngleDoubleDown} size="2x" />
                            </a>
                        }
                    </div> :
                    <hr />}

            </React.Fragment>);
    }
}


export default Followers