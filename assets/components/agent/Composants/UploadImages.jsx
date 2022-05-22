import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, LinearProgress, Stack } from "@mui/material";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";


class UploadImages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: [],
            confirmer: false
        }
        this.onChange = this.onChange.bind(this);
        this.onUploadtest = this.onUploadtest.bind(this);
    }

    onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        this.setState({ images: imageList, confirmer: (imageList.length > 0) });
    };

    async onUploadtest() {

        let images = this.state.images;
        if (images.length <= 0)
            return;


        let data_url = images[0].data_url;
        const form = new FormData();
        form.append("base64Image", data_url);
        form.append("experience", "/api/experiences/" + this.props.experience);
        form.append("name", "photo6044042163102267173.jpg");

        await axios.post('/api/media', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
            }
        }).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    render() {
        const maxNumber = 69;
        const { images, confirmer } = this.state;
        return (
            <div className="UploadImages" >
                <ImageUploading
                    multiple
                    value={images}
                    onChange={this.onChange}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                    width="data_width"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps
                    }) => (
                        // write your building UI
                        <Stack
                            direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 1 }}
                        >
                            <Stack
                                direction="column"
                                justifyContent="space-around"
                                spacing={2}
                            >
                                <Button variant="outlined" aria-label="upload picture" component="span" size="large"
                                    startIcon={<PhotoCameraIcon />}
                                    color={isDragging ? { color: "error" } : "secondary"}
                                    onClick={onImageUpload}
                                    {...dragProps}
                                >Click or Drop here</Button>
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon />} onClick={onImageRemoveAll} >Delete All</Button>
                                <Button variant="outlined" color="primary" startIcon={<SaveIcon />} onClick={this.onUploadtest} disabled={!confirmer}>Confirmer Upload</Button>
                            </Stack>
                            <Grid container spacing={{ xs: 2, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                {imageList.map((image, index) => (
                                    <Grid item xs={2} sm={4} md={3} key={index}>
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardMedia
                                                component="img"
                                                height="140"
                                                image={image.data_url}
                                                alt="green iguana"
                                            />
                                            <CardContent>
                                                <LinearProgress variant="determinate" value={50} />
                                            </CardContent>

                                            <CardActions>
                                                <IconButton onClick={() => onImageUpdate(index)}><EditIcon /></IconButton>
                                                <IconButton onClick={() => onImageRemove(index)}><DeleteIcon /></IconButton>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Stack>
                    )}
                </ImageUploading>
            </div>
        );
    }
}

export default UploadImages
