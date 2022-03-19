import React, { Component } from "react";
import Flickity from "react-flickity-component";

class Planning extends Component {

    constructor(props) {
        super(props);

        this.state = {
            step_selected: 0
        }
    }
    
    changeStep = e => {
        console.log(e.target.value);
        this.setState({ step_selected: e.target.id });
    };


    render() {
        var data=this.props.listdata;
        var el = data[this.state.step_selected];
        var resume_step = el ? el.resume : '404';
        var titre_step = el ? el.title : '404';


        var j = 0;
        const ListLine = ({ items }) => (
            <ul className="listline col-6 card border-alpiniste">
                {
                    items.map((step, index) => (
                        <li key={step.id} ><button id={index} onClick={this.changeStep} className={"btn btn-outline-success  btn-alpiniste p-2 text-moyen "+(this.state.step_selected==index ? " clicked" : " ")}>{step.title}</button></li>
                    ))
                }
            </ul>
        );
        return (
            <div className="row container">
                <ListLine items={data} />
                <div className=" col-5 mr-1" style={{ height: "fit-content", float: "right" }}>
                    <div className="card border-primary mb-3 " id="ScrollThenFix" style={{ position: "absolute" }} >
                        <div className="card-header">{titre_step}</div>
                        <div className="card-body">
                            <p className="card-text text-moyen">{resume_step}</p>
                        </div>
                    </div>

                </div>
            </div>)
    }
}


export default Planning