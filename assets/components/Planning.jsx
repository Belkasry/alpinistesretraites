import axios from "axios";
import React, { Component } from "react";
import Flickity from "react-flickity-component";

class Planning extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step_selected: 0,
            step_experience:{
                "id": 3,
                "title": "---------",
                "resume": "-----------",
                "duree": 3,
                "type_etape": {
                    "libelle": "-------",
                    "icon": "faHouse"
                },
                "jour": 1,
                "debut": "1970-01-01T00:00:00+01:00",
                "destination": {
                    "name": "Toubkal"
                }
            }

        }
    }

    changeStep = e => {
        console.log(e.target.value);
        this.loadStepExperience(e.target.id);
        this.setState({ step_selected: e.target.id });
        
    };


    componentDidMount() {
        console.log(this.props.listdata);
    }

    loadStepExperience = async (id) => {
        try {
            // const cookies = new Cookies();
            let token = "";// cookies.get('token');
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: { 'Authorization': 'Bearer ' + token }
            });
            const response = await instance.get(
                `/api/step_experiences/${id}`
            );
            this.setState(
                {
                    step_experience: response.data
                });
        } finally {
        }

    };

    render() {
        var { listdata } = this.props;
        var { step_experience  } = this.state;
        // var el = data[this.state.step_selected];


        var j = 0;

        var jours = Object.keys(listdata);



        const ListLine = ({ items, days }) => (
            <div className=" col-6">{
                days.map((day, index) => (
                    <ul className="listline card border-alpiniste">
                        {
                            items[day].map((step, jndex) => (
                                <li key={step.id} >
                                    <button id={step.id} onClick={this.changeStep}
                                        className={"btn btn-outline-success  btn-alpiniste p-2 text-moyen " + (this.state.step_selected == step.id ? " clicked" : " ")}>{step.title}</button></li>
                            ))
                        }
                    </ul>
                )
                )}
            </div>);
        return (
            <div className="row ">
                <ListLine items={listdata} days={jours} />
                <div className=" col-6 mr-1" style={{ height: "fit-content", float: "right" }}>
                    <div className="card border-primary mb-3 " id="ScrollThenFix" style={{ position: "absolute" }} >
                        <div className="card-header">
                            <h5 class="card-title"> {step_experience.title}</h5>
                            <p className={"btn btn-info disabled p-2 text-moyen border-alpiniste-1"} >
                                <b className="text-danger" >
                                {step_experience.duree}  
                                </b>
                            </p>
                            <h6 class="card-subtitle text-muted">{this.state.step_selected}</h6>
                        </div>
                        <div className="card-body">
                            <p className="card-text text-moyen">{step_experience.resume}</p>
                        </div>
                    </div>

                </div>
            </div>)
    }
}


export default Planning
