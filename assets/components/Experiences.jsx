import React, {Component} from "react";
import logo from '../img/alpinistesretraites.png'
import {faMapMarkerAlt, faSignature, faMoneyBill} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import Flickity from "react-flickity-component";
import Carousel from "./Carousel";
import {faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons/index";
import axios from "axios/index";
import {ProgressBar} from 'react-bootstrap';
import ReactStars from 'react-stars'
import Cookies from 'universal-cookie';

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
        if (prevState.page !== this.state.page) {
            this.loadExperiences();
        }
    }


    tick() {
        this.setState(state => ({
            progressLoading: state.progressLoading + 20
        }));
    }

    loadMore = () => {
        this.setState({page: this.state.page + 1});
    };
    loadExperiences = async () => {
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
                `api/experiences?guide=${this.props.guide}&page=${page}`
            );
            if (response.data["hydra:member"].length < 1) {
                this.setState({max: true});
            }
            this.setState((prevState) => ({
                experiences: [...prevState.experiences, ...response.data["hydra:member"]],
                progressLoading: 10
            }));
            clearInterval(this.interval);
        } finally {
            this.setState({isLoading: false});
        }

    };

    dateFormat = (ladate) => {
        var date = new Date(ladate)
        var dd = date.getDate();
        var mm = date.getMonth() + 1;

        var yyyy = date.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return dd + '/' + mm + '/' + yyyy;
    }

    render() {
        const {experiences, isLoading, max, progressLoading} = this.state;
        return (
            <React.Fragment>
                <div className="grid-container-3 ">
                    {experiences.map(experience => {
                        return <div className="grid-item pl-2">
                            <div className="card mb-2 thecard border-alpiniste ">
                                <h6 className="card-header bg-light ">
                                    <Link to={`/accompagnateur/experience/${experience.id}`}>
                                        <a href="#" className="text-info">{experience.title}</a></Link>
                                </h6>
                                <div className="card-body m-1 p-1">
                                    <div className="card m-0 p-0 border-alpiniste-1">
                            <span className="m-1 badge rounded-pill bg-cute tag text-sm-center">
                            <FontAwesomeIcon icon={faMapMarkerAlt}
                                             color="#829da7"/>{' '} {experience.destination.name ? experience.destination.name : ""}</span>
                                        <span className="m-1 badge rounded-pill bg-cute tag2 ">
                            <FontAwesomeIcon icon={faMoneyBill} color="black"/>{' '} {experience.prix}</span>
                                        <Carousel medias={experience.medias.slice(0, 3)}/>
                                    </div>
                                </div>
                                <div className="card m-1 p-0 mt-0 text-start bg-light border-alpiniste-1">
                                    <div className="card-body m-1 p-0">
                                        {experience.activites.map(value => {
                                            return <span>{' '}<span
                                                className="badge rounded-pill bg-transparent border-cute text-dark  badge-small">{value.libelle}</span></span>
                                        })}
                                    </div>
                                </div>
                                <div className="card m-1 p-0 mt-0 text-start bg-light border-alpiniste-1">
                                    <div className="card-body m-1 p-0 d-flex flex-column ">
                                        <ReactStars
                                            className={"m-auto"}
                                            count={5}
                                            size={24}
                                            value={experience.dificulte}
                                            edit={false}
                                            color2={'#ffd700'} />
                                        <span
                                            className="badge rounded-pill bg-transparent border-cute text-success  badge-small">Du {this.dateFormat(experience.start)} au {this.dateFormat(experience.finish)} </span>

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
                                         variant="info"/> :
                            <a id="button1" className="btn btn-outline-success mt-3 mb-4 pl-2 pr-2 btn-alpiniste"
                               onClick={this.loadMore}>
                                <FontAwesomeIcon icon={faAngleDoubleDown} size="2x"/>
                            </a>
                        }
                    </div> : <hr/>}

            </React.Fragment>);
    }
}

export default Experiences