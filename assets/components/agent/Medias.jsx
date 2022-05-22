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
                    <UploadImages experience={5}/>
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