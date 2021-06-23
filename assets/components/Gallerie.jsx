import React, {Component} from "react";
import Gallery from "react-grid-gallery";
import axios from "axios/index";
import {faAngleDoubleDown} from "@fortawesome/free-solid-svg-icons/index";
import {ProgressBar} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class Gallerie extends Component {

    constructor(props) {
        super(props);
        const IMAGES =
            [
                {
                    src: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_b.jpg",
                    thumbnail: "https://c2.staticflickr.com/9/8817/28973449265_07e3aa5d2e_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212,
                    caption: "After Rain (Jeshu John - designerspics.com)",
                    isSelected: false,
                },
                {
                    src: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_b.jpg",
                    thumbnail: "https://c2.staticflickr.com/9/8356/28897120681_3b2c0f43e0_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212,
                    tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
                    caption: "Boats (Jeshu John - designerspics.com)"
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212,
                    tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
                    caption: "Boats (Jeshu John - designerspics.com)"
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212,
                    tags: [{value: "Ocean", title: "Ocean"}, {value: "People", title: "People"}],
                    caption: "Boats (Jeshu John - designerspics.com)"
                },


                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                },

                {
                    src: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_b.jpg",
                    thumbnail: "https://c4.staticflickr.com/9/8887/28897124891_98c4fdd82b_n.jpg",
                    thumbnailWidth: 200,
                    thumbnailHeight: 212
                }
            ];
        this.state = {
            images: IMAGES,
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
            const response = await axios.get(
                `http://127.0.0.1:8000/api/media?guide=23&page=${page}`
            );
            if (response.data["hydra:member"].length < 1) {
                this.setState({max: true});
            }
            const pictures = response.data["hydra:member"].map(obj => {
                    return {
                        src: "/images/medias/" + obj.imageName,
                        thumbnail: "/images/medias/" + obj.imageName,
                        thumbnailWidth: 200,
                        thumbnailHeight: 212,
                        rowHeight:200

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
        return ({

        });
    }

    render() {
        const {medias, isLoading, max, progressLoading} = this.state;
        return (
            <React.Fragment>
                <div className="row">
               <div > <Gallery images={this.state.medias} enableImageSelection={false}
                          margin={"10px"} />
               </div>
                <br/>
                {!max ?
                    <div>
                        {isLoading ?
                            <ProgressBar striped animated now={progressLoading} className="col-md-2 m-auto mt-3 mb-4"
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