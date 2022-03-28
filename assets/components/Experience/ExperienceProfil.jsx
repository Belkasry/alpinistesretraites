import React, { Component } from "react";
import {
    faBars,
    faMapMarkerAlt,
    faSignature,
    faCameraRetro,
    faUsers,
    faCalendar,
    faPen,
    faPhone,
    faThumbtack,
    faRss,
    faSms
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Experiences from "./Experiences";
import Gallery from "react-grid-gallery";
import Gallerie from "../Gallerie";
import CardExperienceProfil from "./CardExperienceProfil";
import { withRouter } from "react-router";
import axios from "axios/index";
import Cookies from 'universal-cookie';
import Planning from "./Planning";
import { ProgressBar } from "react-bootstrap";
import Followers from "../Followers";
import Reviews from "../Reviews";
import InfoPratique from "./InfoPratique";

export class ExperienceProfil extends Component {
    constructor(props) {
        super(props)
        const text = "Et necessitatibus mo Quisque velit nisi, pretium ut lacinia in,elementum id enim." + "Et necessitatibus mo Quisque velit nisi, pretium ut lacinia in,elementum id enim.";
        const unexperience = {
            id: 0,
            description: text,
            destination: { "name": "xxx" },
            title: "XXXXXXX",
            duree: 0,
            guide_eager: { "fullName": "guide" },
            steps: [],
            requirement: [],
            notice: [],
            include: [],
            subscriptions: [],
            steps_list: {}
        }


        this.state = {
            activites: ["alpinisme", "conyoning", "skying", "escalade"],
            image: "https://randomuser.me/api/portraits/men/" + Math.floor(Math.random() * 70) + ".jpg",
            text: text,
            experience: unexperience,
            renderView: 1,
            step_selected: 0,
            progressLoading: 10,
        }


    }
    leType(obj) {
        return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    }

    componentDidMount() {
        const cookies = new Cookies();
        this.loadExperience();

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.experience !== this.props.experience) {
            this.loadExperience();
        }
    }

    loadExperience = async () => {
        try {
            const id = this.props.match.params.id;
            const cookies = new Cookies();
            let token = cookies.get('token');
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const response = await instance.get(
                `/api/experiences/${id}`
            );
            this.setState(
                {
                    experience: response.data
                });
        } finally {
        }

    };





    clickBtn = e => {
        console.log(e.target.value);
        this.setState({
            renderView: +e.target.value
        });
    };


    render() {

        const steps = this.state.experience ? this.state.experience.steps_list : { "1": [] };
        const requirements = this.state.experience ? this.state.experience.requirement : ["---"];
        const notices = this.state.experience ? this.state.experience.notice : ["---"];
        const including = this.state.experience ? this.state.experience.include : ["---"];


        return <div className="container">
            <CardExperienceProfil experience={this.state.experience} experience_id={this.props.match.params.id} />
            <div className="row ">
                <div className="col-md-12 ml-auto mr-auto">
                    <div className="profile-tabs pl-5">
                        <ul className="nav nav-pills nav-pills-icons m-3 bg-light border-alpiniste justify-content-center justify-content-around pt-3 pb-3 pl-5"
                            role="tablist">
                            <li className="nav-item"></li>
                            <li className="nav-item ">
                                <button className="nav-link active font-weight-bolder" href="#planning" role="tab"
                                    data-toggle="tab" value={1}
                                    onClick={this.clickBtn}>
                                    <FontAwesomeIcon icon={faCalendar} color="white" />{' '}
                                    Planning
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link " href="#medias" role="tab" data-toggle="tab" value={2}
                                    onClick={this.clickBtn}>
                                    <FontAwesomeIcon icon={faCameraRetro} color="white" />{' '}
                                    Medias
                                </button>
                            </li>

                            <li className="nav-item">
                                <button className="nav-link" href="#info_pratique" role="tab" data-toggle="tab" value={5}
                                    onClick={this.clickBtn}>
                                    <FontAwesomeIcon icon={faPen} color="white" />{' '}
                                    Infos Pratiques
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" href="#reviews" role="tab" data-toggle="tab" value={4}
                                    onClick={this.clickBtn}>
                                    <FontAwesomeIcon icon={faPen} color="white" />{' '}
                                    Reviews
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" href="#followers" role="tab" data-toggle="tab" value={3}
                                    onClick={this.clickBtn}>
                                    <FontAwesomeIcon icon={faUsers} color="white" />{' '}
                                    Followers
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="tab-content tab-space card border-alpiniste HolyTabContent">
                <div className="tab-pane text-center gallery active p-3 pt-1 pb-1" id="planning">

                    {this.state.renderView === 1 ?
                        <Planning listdata={steps} />
                        : <p>?????????</p>
                    }
                </div>
                <div className="tab-pane text-center  " id="medias">
                    {this.state.renderView === 2 ?
                        <Gallerie experience={this.props.match.params.id} /> : <p>?????????</p>
                    }
                </div>

                <div className="tab-pane text-center " id="followers">
                    <div className="tab-pane text-center m-5 mt-2" id="followers">

                        {this.state.renderView === 3 ?

                            <div>
                                <Followers experience_id={this.props.match.params.id} />
                            </div>
                            : <p>naaaaaaaay</p>

                        }
                    </div>
                </div>
                <div className="tab-pane  " id="reviews">
                    <div className="m-5 mt-1">
                        {this.state.renderView === 4 ? <Reviews experience_id={this.props.match.params.id} /> :
                            <p>naaaaaaaaaaay</p>
                        }
                    </div>
                </div>

                <div className="tab-pane text-center " id="info_pratique">
                    <div className="tab-pane text-center m-5 mt-2" id="info_pratique">

                        {this.state.renderView === 5 ?
                            <InfoPratique requirements={requirements} notices={notices} including={including} />
                            : <p>naaaaaaaay</p>

                        }
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(ExperienceProfil)