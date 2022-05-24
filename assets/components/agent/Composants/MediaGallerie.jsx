import { Button, CircularProgress, IconButton } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from "react-grid-gallery";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from 'react-bootstrap';


class MediaGallerie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            images: this.props.images,
            page: 1,
            isLoading: false,
            progressLoading: 10,
            max: false,
            medias: [],
            selectedMedias: {}
        };

        this.onSelectImage = this.onSelectImage.bind(this);
        this.deleteSelection = this.deleteSelection.bind(this);
        this.deleteImg = this.deleteImg.bind(this);

    }

    onSelectImage(index, image) {
        let medias = this.state.medias.slice();
        let selectedMedias = this.state.selectedMedias;
        let img = medias[index];
        if (img.hasOwnProperty("isSelected")) {
            img.isSelected = !img.isSelected;
        }
        else {
            img.isSelected = true;
        }
        if (img.isSelected) {
            selectedMedias[index] = image.id;
        } else {
            delete selectedMedias[index];
        }


        this.setState({
            medias: medias,
            selectedMedias: selectedMedias
        });

        console.log(this.state.selectedMedias)
    }


    deleteImg = async (id, imageId) => {
        let selectedMedias = this.state.selectedMedias;
        let medias = this.state.medias;
        const headers = {};
        let token = "";
        const instance = axios.create({
            baseURL: window.location.origin,
            headers: { 'Authorization': 'Bearer ' + token }
        });
        await instance.delete('api/media/' + imageId, { headers }).then(
            res => console.log(res)
        )

    }

    deleteSelection = async () => {

        let tempselectedMedias= {...this.state.selectedMedias}; 
        let tempItems= [...this.state.medias]; 
      

        const promises = [];

        for (var key in tempselectedMedias) {
            promises.push(this.deleteImg(key, tempselectedMedias[key]));
            // promises.push(console.log(key));
        }

        Promise.all(promises).then(() => {

            for (var id in tempselectedMedias) {
                tempItems.splice(id,1);
            }
            this.setState({
                medias: tempItems,
                selectedMedias: []
            });
            console.log(this.state.medias)
        });
    }


    componentDidMount() {
        this.loadMedias();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page < this.state.page) {
            this.loadMedias();
        } else if (prevProps.update !== this.props.update) {
            console.log(prevProps.update + "        vs        " + this.props.update);
            this.loadMedias(1);
        }
    }


    tick() {
        this.setState(state => ({
            progressLoading: state.progressLoading + 20
        }));
    }

    loadMore = () => {
        this.setState({ page: this.state.page + 1 });
    };
    loadMedias = async (lpage = null) => {
        try {
            const { page } = this.state;
            if (lpage == 1) {
                this.setState({ page: lpage });

            }
            this.setState({ isLoading: true });
            this.interval = setInterval(() => this.tick(), 100);
            let token = "";
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let response = null;

            if (this.props.experience) {
                response = await instance.get(
                    `api/media?experience.id=${this.props.experience}&page=${page}`
                );
            } else if (this.props.guide) {
                response = await instance.get(
                    `api/media?guide.id=${this.props.guide}&page=${page}`
                );
            }

            if (response.data["hydra:member"].length < 1) {
                this.setState({ max: true });
            }
            const pictures = response.data["hydra:member"].map(obj => {
                return {
                    src: "/images/medias/" + obj.imageName,
                    thumbnail: "/images/medias/" + obj.imageName,
                    caption: "test",
                    isSelected: (Math.random() * 100) % 2 == 0,
                    thumbnailWidth: PropTypes.number.isRequired,
                    thumbnailHeight: PropTypes.number.isRequired,
                    id: obj.id
                }
            }
            );
            console.log(pictures);
            if (lpage == 1) {
                this.setState((prevState) => ({

                    medias: [...pictures],
                    progressLoading: 10
                }));

            } else {
                this.setState((prevState) => ({

                    medias: [...prevState.medias, ...pictures],
                    progressLoading: 10
                }));
            }
            clearInterval(this.interval);
        } finally {
            this.setState({ isLoading: false });
        }

    };

    render() {
        const { medias, isLoading, max, progressLoading } = this.state;
        return (
            <>
            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={this.deleteSelection} >
                        Delete Selction
                    </Button>
                <div >
                    
                    <br/>
                    <Gallery
                        images={medias}
                        onSelectImage={this.onSelectImage}
                        lightboxWidth={1536}
                    />
                </div>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%"

                }}>
                    {!max ?
                        <div style={{
                            display: "table",
                            margin: "0 auto"
                        }}>
                            {isLoading ?
                                <CircularProgress value={progressLoading} /> :
                                <Button variant="outlined" color="primary" onClick={this.loadMore} endIcon={<ExpandMoreIcon />}>
                                    Load more
                                </Button>
                            }
                        </div> : <hr />
                    }
                </div>


            </>
        );
    }
}

export default MediaGallerie;