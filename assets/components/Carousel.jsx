import React, {Component} from "react";
import Flickity from "react-flickity-component";

class Carousel extends Component {

    constructor(props) {
        super(props);

    }


    render() {
        const flickityOptions = {
            pageDots: false,

        }
        const medias = this.props.medias;
        return (

            <Flickity
                disableImagesLoaded
                options={flickityOptions}

            > {medias.length > 0 ?
                medias.map((srcMedia,index) => {
                        return <img src={"/images/medias/" + srcMedia.imageName} height="100%" width="100%" key={"img_"+index}
                                    style={{objectFit: "cover"}}/>

                    }
                ) :
                <img src="https://picsum.photos/id/1/600/300" height="100%" width="100%" style={{objectFit: "cover"}}/>
            }
            </Flickity>
        )
    }
}


export default Carousel