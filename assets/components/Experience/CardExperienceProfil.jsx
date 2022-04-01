import React, { Component } from "react";
import {
    faMapMarkerAlt,
    faPhone,
    faRss,
    faSms,
    faCheckDouble, faHourglassEmpty, faMoneyBillWave, faArrowAltCircleLeft,
    faHeart,
    faStar,
    faHeartBroken,
    faStarHalfAlt,
    faHeart as farHeart,
    faStar as farStar,
    faCircle as faCircle,
    faCircleHalfStroke as faCircleHalfStroke,
    faBatteryFull as faDifficulty,
    faBatteryEmpty as faDifficultyEmpty,
    faBatteryHalf as faDifficultyHalf,

} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faMailchimp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import background_card from '../../img/alpinistesretraites_bg_small_stars.png'
import axios from "axios/index";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import ReactStars from 'react-stars';
import PrettyRating from "pretty-rating-react";
import { dateFormat } from '../../lib/utils.js';
import Follow from "../Follow";

const icons = {
    star: {
        complete: faStar,
        half: faStarHalfAlt,
        empty: farStar,
    },
    difficulty: {
        complete: faDifficulty,
        half: faDifficultyHalf,
        empty: faDifficultyEmpty,
    }
};
const colors = {
    star: ['#d9ad26', '#d9ad26', '#434b4d'],
    difficulty: ['#17a2b8', '#17a2b8', '#434b4d'],

};

class CardExperienceProfil extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        // let user = cookies.get('user') ? cookies.get('user') : {};
        this.state = {
            // subscription:user.subscription
        }
        // this.following = this.following.bind(this);
        // this.followed = this.followed.bind(this);
    }




    componentDidMount() {
        console.log(this.props.experience.destination);
        // this.followed();
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.experience !== this.props.experience) {

        }
    }


    render() {

        const { experience } = this.props;
        var descript = this.props.experience.description ? this.props.experience.description : "<hr/>";
        var destination = this.props.experience.destination ? this.props.experience.destination.name : "<hr/>";
        var currency = " DHS"
        return (
            <div className="row">
                <div className="" style={{ zIndex: 3 }}>
                    <img
                        src={this.props.experience.imageName ? "/images/experiences/" + this.props.experience.imageName : "https://via.placeholder.com/150/FF0000/FFFFFF?Alpiniste"}
                        alt="Circle Image" height="100px" width="100px" style={{ objectFit: "cover" }}
                        className="img-raised rounded-circle img-fluid border-circle-alpiniste " />
                </div>
                <div className="col-md-12 ml-auto mr-auto ">
                    <div className="profile justify-content-center ">
                        <div className="name card border-alpiniste card-profile" style={{
                            zIndex: 1,
                            marginTop: "-100px",
                            backgroundImage: `url(${background_card})`,
                            backgroundRepeat: "repeat",
                            backgroundSize: "300px",
                        }}>
                            <div className="mt-2 d-flex justify-content-center ">
                                <h2 className=" p-2 bg-light border-alpiniste-1 text-info"
                                    style={{ zIndex: 1, marginTop: "100px" }}>{this.props.experience.title}</h2>

                            </div>
                            <div className="d-flex justify-content-center ">
                                <div className=" ">
                                    <span className="m-1 badge rounded-pill bg-cute tag text-moyen">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />{' '} {destination}</span>
                                </div>
                                <div className="">
                                    <Link to={`/accompagnateur/profil/${this.props.experience.guide_eager.id}`} >
                                        <button type="button"
                                            className={"btn btn-outline-danger "}>

                                            <b><FontAwesomeIcon icon={faArrowAltCircleLeft} />{'  '}
                                                {this.props.experience.guide_eager.fullName}
                                            </b>
                                        </button>
                                    </Link>
                                </div>
                                <div className="">
                                    <p className={"btn btn-warning disabled p-2 text-moyen border-alpiniste-1"} >
                                        <b className="text-dark" >
                                            <FontAwesomeIcon icon={faMoneyBillWave} />
                                            {"  "}   {this.props.experience.prix}{currency}
                                        </b>
                                    </p>
                                </div>
                                <div className="">
                                    <p className={"btn btn-info disabled p-2 text-moyen border-alpiniste-1"} >
                                        <b className="text-white" >
                                            <FontAwesomeIcon icon={faHourglassEmpty} />
                                            {"  "}   {this.props.experience.duree}{' jours'}
                                        </b>
                                    </p>
                                </div>
                                <div className="">
                                <Follow experience={this.props.experience_id}  />
                                </div>
                                <div></div>
                                <div className="">

                                </div>
                            </div>
                            <div className="description text-center">
                                <div className="m-2 d-flex justify-content-center">
                                    <div className="p-2  btn btn-light disabled p-2 text-moyen border-alpiniste-1">
                                        <PrettyRating max={5} value={this.props.experience.dificulte}
                                            className={"m-auto"} icons={icons.difficulty} colors={colors.difficulty} />


                                    </div>
                                </div>
                                <div className="m-2 d-flex justify-content-center">
                                    <div className="p-2  btn btn-info disabled p-2 text-moyen border-alpiniste-1">
                                        Du <strong className="text-black">{dateFormat(experience.start)}</strong>
                                        au <b className="text-">{dateFormat(experience.finish)}</b>
                                    </div>
                                </div>

                                <div className="mt-0 mb-3 m-5 card p-5 pt-0 pb-2 text-moyen">
                                    <div dangerouslySetInnerHTML={{ __html: descript }} />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CardExperienceProfil