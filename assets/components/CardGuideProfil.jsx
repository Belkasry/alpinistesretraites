import React, {Component} from "react";
import {
    faMapMarkerAlt,
    faPhone,
    faRss,
    faSms,
    faCheckDouble
} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram, faMailchimp} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import background_card from '../img/alpinistesretraites_card_bg.png'

class CardGuideProfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            follow: true
        }
        this.follow_ = this.follow_.bind(this);
    }

    follow_() {
        this.setState({follow: !this.state.follow});
    }

    render() {
        var descript = this.props.guide.description ? this.props.guide.description : "";
        return (
            <div className="row">
                <div className="" style={{zIndex: 3}}>
                    <img
                        src={this.props.guide.imageName ? "/images/guides/" + this.props.guide.imageName : "https://via.placeholder.com/150/FF0000/FFFFFF?Alpiniste"}
                        alt="Circle Image" height="100px" width="100px" style={{objectFit: "cover"}}
                        className="img-raised rounded-circle img-fluid border-circle-alpiniste "/>
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
                                style={{zIndex: 1, marginTop: "100px"}}>{this.props.guide.fullName}</h3>
                            <div className="d-flex justify-content-center ">
                                <div className=" ">
                                    <span className="m-1 badge rounded-pill bg-cute tag ">
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>{' '} {this.props.guide.location}</span>
                                </div>
                                <div></div>
                                <div className="">
                                    <button type="button"
                                            className={"btn btn-outline-success " + (this.state.follow ? " clicked" : " btn-alpiniste")}
                                            onClick={this.follow_}>
                                        <b><FontAwesomeIcon
                                            icon={(this.state.follow ? faCheckDouble : faRss)}/> {(this.state.follow ? "" : "Follow")}
                                        </b>
                                    </button>
                                </div>
                                <div></div>
                                <div className="">
                                    <button type="button" className="btn btn-outline-success  btn-alpiniste"
                                            data-toggle="modal"
                                            data-target=".bd-phone-modal-sm"><FontAwesomeIcon
                                        icon={faPhone}/> <b>Afficher le numéro</b>
                                    </button>
                                </div>
                                <div className="">
                                    <button type="button" className="btn btn-outline-success  btn-alpiniste"
                                    ><FontAwesomeIcon
                                        icon={faSms}/> <b>Chat</b>
                                    </button>
                                </div>
                            </div>
                            <div className="description text-center">
                                <a href="#pablo"
                                   className="btn btn-just-icon btn-link btn-dribbble text-alpiniste"><FontAwesomeIcon
                                    icon={faFacebook}/></a>
                                <a href="#pablo"
                                   className="btn btn-just-icon btn-link btn-twitter text-alpiniste"><FontAwesomeIcon
                                    icon={faInstagram}/></a>
                                <a href="#pablo"
                                   className="btn btn-just-icon btn-link btn-pinterest text-alpiniste"><FontAwesomeIcon
                                    icon={faMailchimp}/></a>

                                <p className="mt-0 mb-3 m-5 card p-5 pt-0 pb-2"> {descript}</p>
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
                                <button type="button" className="btn btn-success"><FontAwesomeIcon icon={faPhone}/>Appeler
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