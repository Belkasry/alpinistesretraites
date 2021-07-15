import React, {Component, useContext} from "react";
import logo from '../img/alpinistesretraites.png'
import {faMapMarkerAlt, faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ProgressBar} from 'react-bootstrap';
import Guide from "./Guide";
import axios from 'axios';
import Cookies from 'universal-cookie';



export class Guides extends Component {


    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            isLoading: false,
            progressLoading: 10,
            max: false,
            guides: [],
        };


    }

    componentDidMount() {

        this.loadGuides();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page && this.props.searchValue == "") {
            this.loadGuides();
        }
        else if (prevProps.searchValue !== this.props.searchValue) {
            this.searchGuide(false);
        } else if (prevState.page !== this.state.page && prevProps.searchValue == this.props.searchValue) {
            this.searchGuide(true);
        }
    }

    // componentWillReceiveProps() {
    //     this.search();
    //     this.loadGuides();
    //     // this.loadGuides();
    // }

    tick() {
        this.setState(state => ({
            progressLoading: state.progressLoading + 20
        }));
    }

    loadGuides = async () => {
        try {
            const {page} = this.state;
            this.setState({isLoading: true});
            this.interval = setInterval(() => this.tick(), 100);
            const cookies = new Cookies();
            let token= cookies.get('token');
            const instance = axios.create({
                baseURL: `http://127.0.0.1:8000/`,
                headers: {'Authorization': 'Bearer '+token}
            });
            const response = await instance.get(
                `api/guides?page=${page}`, {}
            );
            if (response.data["hydra:member"].length < 1) {
                this.setState({max: true});
            }
            this.setState((prevState) => ({
                guides: [...prevState.guides, ...response.data["hydra:member"]],
                progressLoading: 10
            }));
            clearInterval(this.interval);
            // this.props.count = response.data["hydra:totalItems"];
            this.props.onChangeCount(response.data["hydra:totalItems"]);
        } finally {
            this.setState({isLoading: false});
        }

    };

    componentWillUnmount() {
    }


    loadMore = () => {
        this.setState({page: this.state.page + 1});
    };

    searchGuide = async (more) => {
        try {
            const {page} = this.state;

            if (!more) {
                this.setState({page: 1});
            }
            const val = this.props.searchValue.value;
            const field = this.props.searchValue.field;
            const parametre = {
                params: {}
            };
            parametre["params"][field] = val;

            const cookies = new Cookies();
            let token= cookies.get('token');
            const instance = axios.create({
                baseURL: `http://127.0.0.1:8000/`,
                headers: {'Authorization': 'Bearer '+token}
            });
            const response = await instance.get(
                `api/guides?page=${page}`, parametre
            );
            if (!more) {
                this.setState((prevState) => ({
                    guides: [...response.data["hydra:member"]],

                }));
            }
            else {
                this.setState((prevState) => ({
                    guides: [...prevState.guides, ...response.data["hydra:member"]],
                    progressLoading: 10
                }));
                clearInterval(this.interval);
            }
            this.props.onChangeCount(response.data["hydra:totalItems"]);
            // this.props.count = response.data["hydra:totalItems"];

        } finally {
            this.setState({isLoading: false});
        }

    };


    render() {

        const { guides, isLoading, max, progressLoading} = this.state;
        return <React.Fragment>
            <div className="grid-container ">
                {guides.map(v_guide => {
                    return <div className="grid-item"  key={Math.random().toString()}><Guide guide={v_guide}/></div>
                })
                }
            </div>
            {!max ?
                <React.Fragment>
                    {isLoading ?
                        <ProgressBar striped animated now={progressLoading} className="col-md-2 m-auto mt-3 mb-4"
                                     variant="info"/> :
                        <a id="button1" className="btn btn-outline-success mt-3 mb-4 pl-2 pr-2 btn-alpiniste" onClick={this.loadMore}>
                            <FontAwesomeIcon icon={faAngleDoubleDown} size="2x"/>
                        </a>
                    }
                </React.Fragment> : <hr/>}

        </React.Fragment>


    }
}
