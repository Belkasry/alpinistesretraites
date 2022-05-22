import { Button, CircularProgress, IconButton } from '@mui/material';
import axios from 'axios';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from "react-grid-gallery";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
        };

        this.onSelectImage = this.onSelectImage.bind(this);

    }

    onSelectImage(index, image) {
        var medias = this.state.medias.slice();
        var img = medias[index];
        if (img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            medias: medias
        });
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
        this.setState({ page: this.state.page + 1 });
    };
    loadMedias = async () => {
        try {
            const { page } = this.state;
            this.setState({ isLoading: true });
            this.interval = setInterval(() => this.tick(), 100);
            let token = "";
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let response = null;
            if (this.props.guide) {
                response = await instance.get(
                    `api/media?guide=${this.props.guide}&page=${page}`
                );
            }
            if (this.props.experience) {
                response = await instance.get(
                    `api/media?experience=${this.props.experience}&page=${page}`
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
            this.setState({ isLoading: false });
        }

    };

    render() {
        const { medias, isLoading, max, progressLoading } = this.state;
        return (
            <>
                <div >
                    <Gallery
                        images={this.state.medias}
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