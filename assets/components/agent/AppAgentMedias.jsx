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
            update: 0
        }
        this.updateGallerie=this.updateGallerie.bind(this);

    }

    updateGallerie = () => {
        console.log(this.state.update);
        this.setState({ update: Math.random() * Math.random() * 10000 })
    }



    render() {
        const { update } = this.state;
        return (
            <Box sx={{ width: 3 / 4, mx: 'auto' }} >
                <Paper elevation={1} sx={{ p: 2, m: 2 }}>
                    <UploadImages experience={this.props.match.params.id} updateGallerie={this.updateGallerie} />
                </Paper>
                <Paper elevation={1} sx={{ p: 2, m: 2 }}>
                    <Stack
                        direction="column"
                        justifyContent="center"
                        spacing={2}
                        alignItems="stretch"
                    >
                        <MediaGallerie experience={this.props.match.params.id} update={update} />
                    </Stack>
                </Paper>
            </Box>
        )
    }
}


export default Medias