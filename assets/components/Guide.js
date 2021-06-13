import React, {Component} from "react";
import logo from '../img/alpinistesretraites.png'
import {faMapMarkerAlt,faSignature} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export class Guide extends Component {

    constructor(props) {
        super(props)
        const text = "Et necessitatibus mo Quisque velit nisi, pretium ut lacinia in,elementum id enim." + "Et necessitatibus mo Quisque velit nisi, pretium ut lacinia in,elementum id enim.";
        this.state = {
            activites: ["alpinisme", "conyoning","skying","escalade"],
            image :     "https://randomuser.me/api/portraits/men/"+Math.floor(Math.random() * 70)+".jpg"
        }
    }


    ntimes(element,n){
        var rows = [];
        for (var i = 0; i < n; i++) {
            rows.push(element);
        }
        return rows;
    }

    render() {
        var descript=this.props.guide.description?this.props.guide.description:"";
        return <div className="card mb-2 thecard border-alpiniste ">
            <h4 className="card-header bg-light ">{this.props.guide.id}<a href="#" className="text-info">{this.props.guide.fullName}</a></h4>
            <div className="card-body m-1 p-1">
                <div className="card m-0 p-0">
                   <span className="m-1 badge rounded-pill bg-cute tag ">
                            <FontAwesomeIcon icon={faMapMarkerAlt}/>{' '} {this.props.guide.location}</span>
                    <img src={this.state.image?this.state.image:"https://i.imgur.com/61Q4z5o.jpg"} className="d-block user-select-none m-0 p-0" width="100%"
                         height="120vh" style={{objectFit: 'cover', objectPosition: 100 % 0}}/>
                </div>
                <div className="card-body m-0 p-0 mt-1 bg-gradient">
                    <p className="card-text m-0 p-0">
                        {descript.length>100?`${descript.substring(0, 100)}...`:[descript,"  "].concat(this.ntimes(<FontAwesomeIcon icon={faSignature} size="xs" color="grey"/>,(50-descript.length)))}
                    </p>

                </div>
            </div>
            <div className="card m-1 p-0 mt-0 text-start bg-light ">
                <div className="card-body m-1 p-0">

                    {this.state.activites.map(value => {
                        return <span>{' '}<span className="badge rounded-pill bg-transparent border-cute text-dark  badge-small">{value}</span></span>
                    })}
                </div>
            </div>
        </div>
    }
}

export default Guide