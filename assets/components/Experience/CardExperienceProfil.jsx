import React, { Component } from "react";
import {
    faMapMarkerAlt,
    faPhone,
    faRss,
    faSms,
    faCheckDouble, faHourglassEmpty, faMoneyBillWave, faArrowAltCircleLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faMailchimp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import background_card from '../../img/alpinistesretraites_bg_small_stars.png'
import axios from "axios/index";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

class CardExperienceProfil extends Component {
    constructor(props) {
        super(props);
        const cookies = new Cookies();
        // let user = cookies.get('user') ? cookies.get('user') : {};
        this.state = {
            follow: false,
            // subscription:user.subscription
        }
        this.follow_ = this.follow_.bind(this);
        // this.following = this.following.bind(this);
        // this.followed = this.followed.bind(this);
    }

    follow_() {
        this.following();

    }



    componentDidMount() {
        console.log(this.props.experience.destination);
        // this.followed();
    }


    following() {
        try {

            let abonne = this.state.follow;
            console.log(">>>>>>>>>>>> abonne >>>>" + abonne);
            this.setState({ follow: false });
            console.log(">>>>>>>>>>>> this.state.follow >>>>" + this.state.follow)
            var data = JSON.stringify({
                "experiences": [
                    "/api/experiences/" + this.props.experience_id,
                ]
            });

            var base_url = "https://127.0.0.1:8000/api/subscriptions/" + this.state.subscription;
            var config = {
                method: abonne ? 'delete' : 'patch',
                url: base_url + (abonne ? '/patch' : ''),
                headers: {
                    'Content-Type': !abonne ? 'application/merge-patch+json' : 'application/json'
                },
                data: data
            };

            console.log(data);

            axios(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    this.setState({ follow: !abonne });
                    console.log(error);
                });

        } finally {
        }


    };
    followed = () => {
        try {
            var baseUrl = 'https://127.0.0.1:8000/api/subscriptions?page=1&id=' + this.state.subscription + '&experiences.id=' + this.props.experience_id;
            var config = {
                method: 'get',
                url: baseUrl,
                headers: {}
            };

            axios(config)
                .then((response) => {
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
                    console.log(error);
                });

        } finally {
        }

    };

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.experience !== this.props.experience) {

        }
    }


    render() {
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
                                    <span className="m-1 badge rounded-pill bg-cute tag ">
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
                                    <button type="button"
                                        className={"btn btn-outline-success " + (this.state.follow ? " clicked" : " btn-alpiniste")}
                                        onClick={this.follow_}>
                                        <b><FontAwesomeIcon
                                            icon={(this.state.follow ? faCheckDouble : faRss)} /> {(this.state.follow ? "" : "Follow")}
                                        </b>
                                    </button>
                                </div>
                                <div></div>
                                <div className="">
                                </div>
                            </div>
                            <div className="description text-center">
                                <a
                                    className="btn btn-just-icon btn-link btn-dribbble text-alpiniste"><FontAwesomeIcon
                                        icon={faFacebook} /></a>

                                <p className="mt-0 mb-3 m-5 card p-5 pt-0 pb-2 text-moyen">
                                    <div dangerouslySetInnerHTML={{ __html: descript }} />
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CardExperienceProfil