import React, {Component} from "react";
import Flickity from "react-flickity-component";

class Carousel extends Component {

    constructor(props){
        super(props);

    }


    render() {
        const flickityOptions = {
            pageDots: false,

        }
        return (
            <Flickity
                disableImagesLoaded
                options={flickityOptions}

            >
                <img src="https://picsum.photos/id/1/200/300" height="100%" width="100%" style={{objectFit: "cover"}}/>
                <img src="https://picsum.photos/id/1/200/400" height="100%" width="100%" style={{objectFit: "cover"}}/>
                <img src="https://picsum.photos/id/1/600/300" height="100%" width="100%" style={{objectFit: "cover"}}/>

            </Flickity>
        )
    }
}


export default Carousel