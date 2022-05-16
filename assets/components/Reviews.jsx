import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleDown } from "@fortawesome/free-solid-svg-icons/index";
import axios from "axios/index";
import Cookies from 'universal-cookie';
import ReactStars from "react-stars";

class Reviews extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            isLoading: false,
            progressLoading: 10,
            max: false,
            reviews: [],
            isconnecte: false,
            lanote: 0,
            commentaire: "teeeeeeeeeeeeest",
            commentdone: false
        }
        this.review_ = this.review_.bind(this);
    }



    componentDidMount() {
        const cookies = new Cookies();
        if (cookies.get('user')) {
            let leuser = cookies.get('user');
            if (leuser.id) {
                this.setState({ isconnecte: true })
            }
        }

        this.loadReviews();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.page !== this.state.page) {
            this.loadReviews();
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

    setUser = () => {

        this.setState({ page: this.state.page + 1 });
    }

    loadReviews = async () => {
        try {
            const { page } = this.state;
            this.setState({ isLoading: true });
            this.interval = setInterval(() => this.tick(), 100);
            const cookies = new Cookies();
            let token = cookies.get('token');
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let _condition = "";
            if (this.props.experience_id) {
                _condition = `experience=${this.props.experience_id}`;
            } else if (this.props.guide_id) {
                _condition = `guide=${this.props.guide_id}`;
            }

            const response = await instance.get(
                `api/reviews?page=${page}&` + _condition
            );
            if (response.data["hydra:member"].length < 1) {
                this.setState({ max: true });
            }
            var resultat = response.data["hydra:member"];

            this.setState((prevState) => ({
                reviews: [...prevState.reviews, ...resultat],
                progressLoading: 10
            }));
            clearInterval(this.interval);
        } finally {
            this.setState({ isLoading: false });
        }
    };

    review_() {

        this.postreview();
    }
    postreview = async () => {

        const cookies = new Cookies();

        if (cookies.get('user')) {
            let leuser = cookies.get('user');
            var data = JSON.stringify({});
            if (this.props.experience_id) {
                data = JSON.stringify({
                    "experience": "/api/experiences/" + this.props.experience_id,
                    "mark": this.state.lanote,
                    "comment": this.state.commentaire,
                    "user": "/api/users/" + leuser.id
                });
            } else if (this.props.guide_id) {
                data = JSON.stringify({
                    "guide": "/api/guides/" + this.props.guide_id,
                    "mark": this.state.lanote,
                    "comment": this.state.commentaire,
                    "user": "/api/users/" + leuser.id
                });
            }

            var config = {
                method: 'post',
                url: 'https://127.0.0.1:8000/api/reviews',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            self=this;
            axios(config)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    self.setState({commentdone:true});
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    handleCommentValue = (e) => {
        this.setState({
            commentaire: e.target.value,
        });
    };


    render() {

        const { reviews, isLoading, max, progressLoading, isconnecte, commentaire, lanote, commentdone } = this.state;
        const ratingChanged = (newRating) => {
            this.setState({ lanote: newRating })
        }
        return (
            <React.Fragment>
                {isconnecte ? (
                    commentdone ?
                        <div className="alert alert-dismissible alert-success">
                            <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
                            <strong>Well done!</strong> You successfully reviewed <a href="#" className="alert-link">New Review ?</a>.
                        </div> :
                        <div className="container">
                            <textarea value={commentaire} className="col-12"
                                id="comments-input" onChange={this.handleCommentValue}
                                placeholder="Add a review..." rows="3" />
                            <div className="rating-row">
                                <ReactStars
                                    className={"m-auto"}
                                    edit={true}
                                    count={5}
                                    size={24}
                                    color2={'#ffd700'}
                                    value={lanote}
                                    onChange={ratingChanged} />
                            </div>
                            <button
                                className={"btn btn-primary row"}
                                onClick={this.review_}>
                                Commenter
                            </button></div>
                )
                    :
                    <span ></span>}
                <div className="comment-section">
                    <div className="container">
                        <div className="review">
                            <div className="comment-section">
                                {
                                    reviews.map((review, index) => (
                                        <div className="media media-review p-2 bg-light border-alpiniste-1 text-info card mb-2 " key={"review_" + index}>

                                            <div className="media-body">
                                                <div className="M-flex">
                                                    <div className="media-user"><img src="https://picsum.photos/id/1/600/300" alt=""></img></div>
                                                    <h2 className="title"><span><a href={"/accompagnateur/profil/" + review.user.substring(review.user.lastIndexOf('/') + 1)}> {review.login}</a> </span>DD-MM-YYYY</h2>
                                                    <div className="rating-row">
                                                        <ReactStars
                                                            className={"m-auto"}
                                                            count={5}
                                                            size={24}
                                                            value={review.mark}
                                                            edit={false}
                                                            color2={'#ffd700'} />
                                                    </div>
                                                </div>
                                                <div className="description">{review.comment}</div>
                                            </div>
                                        </div>
                                    ))
                                }



                            </div>
                        </div>
                    </div>
                </div>
                {!max ?
                    <div>
                        {isLoading ?
                            <ProgressBar striped animated now={progressLoading} className="col-md-2 m-auto mt-3 mb-4"
                                variant="info" /> :
                            <a id="button3" className="btn btn-outline-success mt-3 mb-4 pl-2 pr-2 btn-alpiniste"
                                onClick={this.loadMore}>
                                <FontAwesomeIcon icon={faAngleDoubleDown} size="2x" />
                            </a>
                        }
                    </div> :
                    <hr />}

            </React.Fragment>);
    }
}


export default Reviews