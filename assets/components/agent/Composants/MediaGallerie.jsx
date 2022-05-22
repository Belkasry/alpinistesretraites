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

MediaGallerie.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element
            ]),
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired,
            isSelected: PropTypes.bool
        })
    ).isRequired
};

MediaGallerie.defaultProps = {
    images: ([
        {
            src: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_b.jpg",
            thumbnail: "https://c5.staticflickr.com/9/8768/28941110956_b05ab588c1_n.jpg",
            caption: "8H (gratisography.com)"
        },
        {
            src: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_b.jpg",
            thumbnail: "https://c3.staticflickr.com/9/8583/28354353794_9f2d08d8c0_n.jpg",
            caption: "286H (gratisography.com)"
        },
        {
            src: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_b.jpg",
            thumbnail: "https://c7.staticflickr.com/9/8569/28941134686_d57273d933_n.jpg",
            caption: "315H (gratisography.com)"
        },
        {
            src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
            isSelected: true,
            caption: "201H (gratisography.com)"
        },
        {
            src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
            caption: "Big Ben (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c1.staticflickr.com/9/8785/28687743710_870813dfde_h.jpg",
            thumbnail: "https://c1.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
            isSelected: true,
            caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8520/28357073053_cafcb3da6f_n.jpg",
            caption: "Wood Glass (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
            thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
            isSelected: true,
            caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
            thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
            isSelected: true,
            caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
            thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
            isSelected: true,
            caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
        }, {
            src: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_b.jpg",
            thumbnail: "https://c6.staticflickr.com/9/8342/28897193381_800db6419e_n.jpg",
            isSelected: true,
            caption: "201H (gratisography.com)"
        },
        {
            src: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_b.jpg",
            thumbnail: "https://c2.staticflickr.com/9/8239/28897202241_1497bec71a_n.jpg",
            caption: "Big Ben (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c1.staticflickr.com/9/8785/28687743710_870813dfde_h.jpg",
            thumbnail: "https://c1.staticflickr.com/9/8785/28687743710_3580fcb5f0_n.jpg",
            isSelected: true,
            caption: "Red Zone - Paris (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
            thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
            isSelected: true,
            caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
        },
        {
            src: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_b.jpg",
            thumbnail: "https://c8.staticflickr.com/9/8104/28973555735_ae7c208970_n.jpg",
            isSelected: true,
            caption: "Flower Interior Macro (Tom Eversley - isorepublic.com)"
        },
    ])
};

export default MediaGallerie;