import React, {Component} from "react";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Experiences from "../Experience/Experiences";
import Gallery from "react-grid-gallery";
import Gallerie from "../Gallerie";
import CardGuideProfil from "./CardGuideProfil";
import {withRouter} from "react-router";
import axios from "axios/index";
import Cookies from 'universal-cookie';
import Followers from "../Followers";
import Reviews from "../Reviews";

export class GuideProfil extends Component {
    constructor(props) {
        super(props)
        const text = "Et necessitatibus mo Quisque velit nisi, pretium ut lacinia in,elementum id enim." + "Et necessitatibus mo Quisque velit nisi, pretium ut lacinia in,elementum id enim.";
        const unguide = {
            id:0,
            description: text,
            location: "XXXX",
            fullName: "XXXXXXX"
        }
        this.state = {
            activites: ["alpinisme", "conyoning", "skying", "escalade"],
            image: "https://randomuser.me/api/portraits/men/" + Math.floor(Math.random() * 70) + ".jpg",
            text: text,
            experiences: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            guide: unguide,
            renderView: 1
        }


    }


    componentDidMount() {
        const cookies = new Cookies();
        this.loadGuide();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.guide !== this.props.guide) {
            this.loadGuide();
        }
    }

    loadGuide = async () => {
        try {
            const id = this.props.match.params.id;
            const cookies = new Cookies();
            let token= cookies.get('token');
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: {'Authorization': 'Bearer '+token}
            });
            const response = await instance.get(
                `/api/guides/${id}`
            );
            this.setState(
                {
                    guide: response.data
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


        return <div className="container">
            <CardGuideProfil guide={this.state.guide} guide_id={this.props.match.params.id} />
            <div className="row ">
                <div className="col-md-12 ml-auto mr-auto">
                    <div className="profile-tabs pl-5">
                        <ul className="nav nav-pills nav-pills-icons m-3 bg-light border-alpiniste justify-content-center justify-content-around pt-3 pb-3 pl-5"
                            role="tablist">
                            <li className="nav-item"></li>
                            <li className="nav-item ">
                                <button className="nav-link active font-weight-bolder" href="#activites" role="tab"
                                        data-toggle="tab" value={1}
                                        onClick={this.clickBtn}>
                                    <FontAwesomeIcon icon={faCalendar} color="white"/>{' '}
                                    Activités
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link " href="#medias" role="tab" data-toggle="tab" value={2}
                                        onClick={this.clickBtn}>
                                    <FontAwesomeIcon icon={faCameraRetro} color="white"/>{' '}
                                    Medias
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" href="#followers" role="tab" data-toggle="tab" value={3}
                                        onClick={this.clickBtn}>
                                    <FontAwesomeIcon icon={faUsers} color="white"/>{' '}
                                    Followers
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="nav-link" href="#reviews" role="tab" data-toggle="tab" value={4}
                                        onClick={this.clickBtn}>
                                    <FontAwesomeIcon icon={faPen} color="white"/>{' '}
                                    Reviews
                                </button>
                            </li>
                            <li className="nav-item"></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="tab-content tab-space card border-alpiniste">
                <div className="tab-pane text-center  " id="medias">
                    {this.state.renderView ===2 ?
                    <Gallerie guide={this.props.match.params.id}/> : <p>?????????</p>
                }
                </div>
                <div className="tab-pane text-center gallery active p-3 pt-1 pb-1" id="activites">

                    {this.state.renderView ===1 ?
                    <Experiences guide={this.props.match.params.id}/> : <p>?????????</p>
                }
                </div>
                <div className="tab-pane  " id="reviews">
                    <div className="m-5 mt-1">
                            {this.state.renderView ===4 ?
                             <Reviews  guide_id={this.props.match.params.id}/>
                             
                             :
                            <p>naaaaaaaaaaay</p>
                        }
                    </div>
                </div>
                <div className="tab-pane text-center " id="followers">
                    <div className="tab-pane text-center m-5 mt-2" id="followers">

                        {this.state.renderView === 3 ?
                                <Followers guide_id={this.props.match.params.id}/>
                            : <p>naaaaaaaay</p>
                        }
                    </div>
                </div>
            </div>
        </div>
    }
}

export default withRouter(GuideProfil)