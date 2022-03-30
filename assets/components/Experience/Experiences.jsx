import React, { Component } from "react";
import logo from '../../img/alpinistesretraites.png'
import { faMapMarkerAlt, faSignature, faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import {
    FontAwesomeIcon,
} from "@fortawesome/react-fontawesome"; import {
    faBatteryFull as faDifficulty,
    faBatteryEmpty as faDifficultyEmpty,
    faBatteryHalf as faDifficultyHalf
} from "@fortawesome/free-solid-svg-icons";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Flickity from "react-flickity-component";
import Carousel from "../Carousel";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons/index";
import axios from "axios/index";
import { ProgressBar } from 'react-bootstrap';
import ReactStars from 'react-stars'
import Cookies from 'universal-cookie';
import PrettyRating from "pretty-rating-react";
import {dateFormat} from '../../lib/utils.js';


const icons = {
    difficulty: {
        complete: faDifficulty,
        half: faDifficultyHalf,
        empty: faDifficultyEmpty,
    }
};
const colors = {
    difficulty: ['#17a2b8', '#17a2b8', '#434b4d'],

};

export class Experiences extends Component {

    constructor(props) {
        super(props)
        const text = "Et necessitatibus mo Quisque velit nisi, pretium ut lacinia in,elementum id enim." + "Et necessitatibus mo Quisque velit nisi, pretium ut lacinia in,elementum id enim.";
        this.state = {
            activites: ["alpinisme", "conyoning", "skying", "escalade"],
            image: "https://randomuser.me/api/portraits/" + Math.floor(Math.random() * 70) + ".jpg",
            page: 1,
            isLoading: false,
            progressLoading: 10,
            max: false,
            experiences: [],
        };


    }

    componentDidMount() {
        this.loadExperiences();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page && this.props.searchValue == "") {
            this.loadExperiences();
        }
        else if (prevProps.searchValue !== this.props.searchValue) {
            this.searchExperience(false);
        } else if (prevState.page !== this.state.page && prevProps.searchValue == this.props.searchValue) {
            this.searchExperience(true);
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

    loadExperiences = async () => {
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
            let guide_condition = "";
            if (this.props.guide) {
                guide_condition = `guide=${this.props.guide}`;
            }

            const response = await instance.get(
                `api/experiences?page=${page}&` + guide_condition
            );
            if (response.data["hydra:member"].length < 1) {
                this.setState({ max: true });
            }
            this.setState((prevState) => ({
                experiences: [...prevState.experiences, ...response.data["hydra:member"]],
                progressLoading: 10
            }));
            clearInterval(this.interval);
            this.props.onChangeCount(response.data["hydra:totalItems"]);
        } finally {
            this.setState({ isLoading: false });
        }

    };


    searchExperience = async (more) => {
        try {
            const { page } = this.state;

            if (!more) {
                this.setState({ page: 1 });
            }
            const val = this.props.searchValue.value;
            const field = this.props.searchValue.field;
            const parametre = {
                params: {}
            };
            parametre["params"][field] = val;

            const cookies = new Cookies();
            let token = cookies.get('token');
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const response = await instance.get(
                `api/experiences?page=${page}`, parametre
            );
            if (!more) {
                this.setState((prevState) => ({
                    experiences: [...response.data["hydra:member"]],

                }));
            }
            else {
                this.setState((prevState) => ({
                    experiences: [...prevState.experiences, ...response.data["hydra:member"]],
                    progressLoading: 10
                }));
                clearInterval(this.interval);
            }
            this.props.onChangeCount(response.data["hydra:totalItems"]);
            // this.props.count = response.data["hydra:totalItems"];

        } finally {
            this.setState({ isLoading: false });
        }

    };

  

    render() {
        const { experiences, isLoading, max, progressLoading } = this.state;
        return (
            <React.Fragment>
                <div className="grid-container ">
                    {experiences.map((experience,index) => {
                        return <div className="grid-item pl-2" key={"exp_"+index}>
                            <div className="card mb-2 thecard border-alpiniste ">
                                <h6 className="card-header bg-light ">
                                    <Link to={`/experience/profil/${experience.id}`} className="text-info">{experience.title}</Link>
                                </h6>
                                <div className="card-body m-1 p-1">
                                    <div className="card m-0 p-0 border-alpiniste-1">
                                        <span className="m-1 badge rounded-pill bg-cute tag text-sm-center">
                                            <FontAwesomeIcon icon={faMapMarkerAlt}
                                                color="#829da7" />{' '} {experience.destination.name ? experience.destination.name : ""}</span>
                                        <span className="m-1 badge rounded-pill bg-cute tag2 ">
                                            <FontAwesomeIcon icon={faMoneyBill} color="black" />{' '} {experience.prix}</span>
                                        <Carousel medias={experience.medias.slice(0, 3)} />
                                    </div>
                                </div>
                                <div className="card m-1 p-0 mt-0 text-start bg-light border-alpiniste-1">
                                    <div className="card-body m-1 p-0">
                                        {experience.activites.map((value,index) => {
                                            return <span key={"activite_"+index}>{' '}<span
                                                className="badge rounded-pill bg-transparent border-cute text-dark  badge-small">{value.libelle}</span></span>
                                        })}
                                    </div>
                                </div>
                                <div className="card m-1 p-0 mt-0 text-start bg-light border-alpiniste-1">
                                    <div className="card-body m-1 p-0 d-flex flex-column m-auto">
                                        <PrettyRating
                                            max={5} value={experience.dificulte}
                                            className={"m-auto"} icons={icons.difficulty} colors={colors.difficulty} />
                                        <span
                                            className="badge rounded-pill bg-transparent border-cute text-success  badge-small">
                                                Du {dateFormat(experience.start)} au {dateFormat(experience.finish)} </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                    }</div>
                {!max ?
                    <div>
                        {isLoading ?
                            <ProgressBar striped animated now={progressLoading} className="col-md-2 m-auto mt-3 mb-4"
                                variant="info" /> :
                            <a id="button1" className="btn btn-outline-success mt-3 mb-4 pl-2 pr-2 btn-alpiniste"
                                onClick={this.loadMore}>
                                <FontAwesomeIcon icon={faAngleDoubleDown} size="2x" />
                            </a>
                        }
                    </div> : <hr />}

            </React.Fragment>);
    }
}

export default Experiences