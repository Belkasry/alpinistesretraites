import React, { Component } from "react";
import { Box, Button, FormControlLabel, Grid, Input, Paper, Stack, Switch, Typography } from '@mui/material';
import { messageService } from "../../_services/AlertToast";
import axios from "axios";
import Gallerie from "../Gallerie";
import MediaGallerie from "./Composants/MediaGallerie";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadImages from "./Composants/UploadImages";
class Medias extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    async upload() {


        const form = new FormData();
        form.append("file", "C:\\Users\\belka\\Pictures\\Camera Roll\\WIN_20220227_09_57_23_Pro.jpg");
        form.append("experience", "/api/experiences/2");
        form.append("guide", "/api/guides/2");

        const options = {
            method: 'POST',
            url: '/api/media',
            headers: {
                'Content-Type': 'multipart/form-data',
                'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
            },
            data: '[form]'
        };

        axios.request(options).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });



    }

    changeHandler = (e) => {
        const { files } = e.target
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(file) // OR const file = files.item(i);
        }

    }

    render() {

        return (
            <Box sx={{ width: 3 / 4, mx: 'auto' }} >
                <Paper elevation={1} sx={{ p: 2, m: 2 }}>
                    <UploadImages />
                </Paper>
                <Paper elevation={1} sx={{ p: 2, m: 2 }}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        spacing={2}
                        alignItems="stretch"
                    >
                        <MediaGallerie experience={5} />
                    </Stack>
                </Paper>
            </Box>
        )
    }
}


export default Medias