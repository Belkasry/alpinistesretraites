import React, {Component} from "react";
import logo from '../img/alpinistesretraites.png'
import {faMapMarkerAlt, faSignature} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";

export class Guide extends Component {

    constructor(props) {
        super(props)
        const text = "Et necessitatibus mo Quisque velit nisi, pretium ut lacinia in,elementum id enim." + "Et necessitatibus mo Quisque velit nisi, pretium ut lacinia in,elementum id enim.";
        this.state = {
            activites: ["alpinisme", "conyoning", "skying", "escalade"],
        }
    }


    ntimes(element, n) {
        var rows = [];
        for (var i = 0; i < n; i++) {
            rows.push(element);
        }
        return rows;
    }

    render() {
        var descript = this.props.guide.description ? this.props.guide.description : "";
        return <div className="card mb-2 thecard border-alpiniste ">
            <h5 className="card-header bg-light ">
                <Link to={`/accompagnateur/profil/${this.props.guide.id}`}>
                    <a href="#" className="text-info">{this.props.guide.fullName}</a></Link>
            </h5>
            <div className="card-body m-1 p-1">
                <div className="card m-0 p-0 border-alpiniste-1">
                   <span className="m-1 badge rounded-pill bg-cute tag ">
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>{' '} {this.props.guide.location}</span>
                    <img
                        src={this.props.guide.imageName !== "" ? "/images/guides/" + this.props.guide.imageName : "https://placeimg.com/640/480/animals/" + Math.random() * 30}
                        className="d-block user-select-none m-0 p-0 " width="100%"
                        height="120vh" style={{objectFit: 'cover'}}/>
                </div>
                <div className="card-body m-0 p-0 mt-1 bg-gradient">
                    <p className="card-text m-0 p-0">
                        {descript.substring(0, 100).replace(/<[^>]*>/g, '')}
                        {this.ntimes(
                            <FontAwesomeIcon icon={faSignature} size="xs" color="grey"/>
                            , (50 - descript.length))
                        }
                    </p>
                </div>
            </div>
            <div className="card m-1 p-0 mt-0 text-start bg-light border-alpiniste-1">
                <div className="card-body m-1 p-0">
                    {this.state.activites.map(value => {
                        return <span key={Math.random().toString()}>{' '}<span
                            className="badge rounded-pill bg-transparent border-cute text-dark  badge-small">{value}</span></span>
                    })}
                </div>
            </div>
        </div>
    }
}

export default Guide