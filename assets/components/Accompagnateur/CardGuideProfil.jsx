import React, { Component } from "react";
import {
    faMapMarkerAlt,
    faPhone,
    faRss,
    faSms,
    faCheckDouble
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faMailchimp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import background_card from '../../img/alpinistesretraites_card_bg.png'
import axios from "axios/index";
import Cookies from "universal-cookie";
import Follow from "../Follow";

class CardGuideProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            follow: false,
        }
        const cookies = new Cookies();
        let leuser = cookies.get('user') ;
        this.setState({ user: leuser });
    }

    follow_() {}


    componentDidMount() { }




    componentDidUpdate(prevProps, prevState) {
        if (prevProps.experience !== this.props.experience) {

        }
    }


    render() {
        const { user } = this.state;
        var descript = this.props.guide.description ? this.props.guide.description : "<hr/>";
        var links = this.props.guide.links ? this.props.guide.links : {};
        return (
            <div className="row">
                <h1>{JSON.stringify(user)}</h1>
                <div className="" style={{ zIndex: 3 }}>
                    <img
                        src={this.props.guide.imageName ? "/images/guides/" + this.props.guide.imageName : "https://via.placeholder.com/150/FF0000/FFFFFF?Alpiniste"}
                        alt="Circle Image" height="100px" width="100px" style={{ objectFit: "cover" }}
                        className="img-raised rounded-circle img-fluid border-circle-alpiniste " />
                </div>
                <div className="col-md-12 ml-auto mr-auto ">
                    <div className="profile justify-content-center ">
                        <div className="name card border-alpiniste card-profile" style={{
                            zIndex: 1,
                            marginTop: "-100px",
                            backgroundImage: `url(${background_card})`,
                            backgroundSize: "100%"
                        }}>
                            <h3 className="pt-3 text-alpiniste"
                                style={{ zIndex: 1, marginTop: "100px" }}>{this.props.guide.fullName}</h3>
                            <div className="d-flex justify-content-center ">
                                <div className=" ">
                                    <span className="m-1 badge rounded-pill bg-cute tag text-moyen">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} />{' '} {this.props.guide.location}</span>
                                </div>
                                <div></div>
                                <div className="">
                                    <Follow guide={this.props.guide_id}  />
                                </div>
                                <div></div>
                                <div className="">
                                    <button type="button" className="btn btn-outline-success  btn-alpiniste"
                                        data-toggle="modal"
                                        data-target=".bd-phone-modal-sm"><FontAwesomeIcon
                                            icon={faPhone} /> <b>Afficher le numéro</b>
                                    </button>
                                </div>
                                <div className="">
                                    <button type="button" className="btn btn-outline-success  btn-alpiniste"
                                    ><FontAwesomeIcon
                                            icon={faSms} /> <b>Chat</b>
                                    </button>
                                </div>
                            </div>

                            <div className="description text-center">
                                <a href={`https://fb.com/${links && links.fb_link ? links.fb_link : "zuck"}`}
                                    className="btn btn-just-icon btn-link btn-dribbble text-alpiniste"><FontAwesomeIcon
                                        icon={faFacebook} /></a>
                                <a href={`https://instagram.com/${links && links.ig_link ? links.ig_link : "zuck"}`}
                                    className="btn btn-just-icon btn-link btn-twitter text-alpiniste"><FontAwesomeIcon
                                        icon={faInstagram} /></a>
                                <a href="#pablo"
                                    className="btn btn-just-icon btn-link btn-pinterest text-alpiniste"><FontAwesomeIcon
                                        icon={faMailchimp} /></a>

                                <div className="mt-0 mb-3 m-5 card p-5 pt-0 pb-2">
                                    <div dangerouslySetInnerHTML={{ __html: descript }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal bd-phone-modal-sm border-alpiniste-1">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content border-alpiniste">
                            <div className="modal-body">
                                <h1>{this.props.guide.phone}</h1>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-alpiniste">Copier</button>
                                <button type="button" className="btn btn-success"><FontAwesomeIcon icon={faPhone} />Appeler
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default CardGuideProfil