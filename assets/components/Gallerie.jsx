import React, {Component} from "react";
import Gallery from "react-grid-gallery";
import axios from "axios/index";
import {faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons/index";
import {ProgressBar} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Cookies from "universal-cookie";

class Gallerie extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            isLoading: false,
            progressLoading: 10,
            max: false,
            medias: [],
        };


    }

    componentDidMount() {
        this.loadMedias();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.loadMedias();
        }
    }


    tick() {
        this.setState(state => ({
            progressLoading: state.progressLoading + 20
        }));
    }

    loadMore = () => {
        this.setState({page: this.state.page + 1});
    };
    loadMedias = async () => {
        try {
            const {page} = this.state;
            this.setState({isLoading: true});
            this.interval = setInterval(() => this.tick(), 100);
            const cookies = new Cookies();
            let token = cookies.get('token');
            const instance = axios.create({
                baseURL: `http://127.0.0.1:8000/`,
                headers: {'Authorization': 'Bearer ' + token}
            });
            let response=null;
            if (this.props.guide ) {
                 response = await instance.get(
                    `api/media?guide=${this.props.guide}&page=${page}`
                );
            }
            if (this.props.experience ) {
                 response = await instance.get(
                    `api/media?experience=${this.props.experience}&page=${page}`
                );
            }
            if (response.data["hydra:member"].length < 1) {
                this.setState({max: true});
            }
            const pictures = response.data["hydra:member"].map(obj => {
                    return {
                        src: "/images/medias/" + obj.imageName,
                        thumbnail: "/images/medias/" + obj.imageName,
                        thumbnailWidth: 200,
                        thumbnailHeight: 212,
                        rowHeight: 200

                    }
                }
            );
            console.log(pictures);
            this.setState((prevState) => ({

                medias: [...prevState.medias, ...pictures],
                progressLoading: 10
            }));
            clearInterval(this.interval);
        } finally {
            this.setState({isLoading: false});
        }

    };

    styleThumbnail() {
        return ({});
    }

    render() {
        const {medias, isLoading, max, progressLoading} = this.state;
        return (
            <React.Fragment>
                <div className="row">
                    <div><Gallery images={this.state.medias} enableImageSelection={false}
                                  margin={"10px"}/>
                    </div>
                    <br/>
                    {!max ?
                        <div>
                            {isLoading ?
                                <ProgressBar striped animated now={progressLoading}
                                             className="col-md-2 m-auto mt-3 mb-4"
                                             variant="info"/> :
                                <a id="button1" className="btn btn-outline-success mt-3 mb-4 pl-2 pr-2 btn-alpiniste"
                                   onClick={this.loadMore}>
                                    <FontAwesomeIcon icon={faAngleDoubleDown} size="2x"/>
                                </a>
                            }
                        </div> : <hr/>}
                </div>
            </React.Fragment>);
    }
}


export default Gallerie