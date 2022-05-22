import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, LinearProgress, Stack } from "@mui/material";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import ImageUploading from "react-images-uploading";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";


class UploadImages extends Component {

    constructor(props) {
        super(props);

        this.state = {
            images: []
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange = (imageList, addUpdateIndex) => {
        console.log(imageList, addUpdateIndex);
        this.setState({ images: imageList });
    };

    render() {
        const maxNumber = 69;
        const { images } = this.state;
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
                                <Button variant="outlined" color="primary" startIcon={<SaveIcon />} onClick={onImageRemoveAll} >Confirmer Upload</Button>
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
