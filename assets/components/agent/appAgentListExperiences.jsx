import '../../App.css';
import '../../css/bootstrap.min.css';
import '../../css/couche-bootstrap.css';

import React, { useState, useContext } from "react";
import ExperiencesGridTable from './ExperiencesGridTable';
import PrimarySearchAppBar from './MenuAgent';
import CustomizedBreadcrumbs from './Breadcrumbs';
import { AlertTitle, Alert, Box, Button, ButtonGroup, Grid, Stack, Typography, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import DialogFormExperience from './DialogFormExperience';


class AppAgentListExperiences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.onClose = this.onClose.bind(this)
    }


    Open = () => {
        this.setState({
            open: true
        });
    };
    onClose = () => {
        this.setState({
            open: false
        });
    };


    render() {
        return (

            <div>
                <div className="menu">
                    <PrimarySearchAppBar />
                </div>
                <Box sx={{ flexGrow: 1 }} m={2}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography variant="h3" component="h1">
                            Titre
                        </Typography>
                        <CustomizedBreadcrumbs />
                        <Stack direction="row" spacing={2}>
                            <Button onClick={this.Open} variant="outlined" color="secondary" startIcon={<AddIcon />}>Add</Button>,
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>Delete</Button>,
                            <Button variant="contained" color="secondary" endIcon={<SendIcon />}>Send </Button>
                        </Stack>
                    </Stack>
                </Box>
                <DialogFormExperience ouvrir={this.state.open} onClose={this.onClose}  />
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={2}
                >
                    <Alert severity="error">
                        <AlertTitle>Error</AlertTitle>
                        This is an error alert — <strong>check it out!</strong>
                    </Alert>
                    <Alert severity="warning">
                        <AlertTitle>Warning</AlertTitle>
                        This is a warning alert — <strong>check it out!</strong>
                    </Alert>
                    <Alert severity="info">
                        <AlertTitle>Info</AlertTitle>
                        This is an info alert — <strong>check it out!</strong>
                    </Alert>
                    <Alert severity="success">
                        <AlertTitle>Success</AlertTitle>
                        This is a success alert — <strong>check it out!</strong>
                    </Alert>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="center"
                    spacing={2}
                    alignItems="stretch"
                    m={5}
                >
                    <ExperiencesGridTable newId={31} />
                </Stack>
            </div >
        );
    }
}
export default AppAgentListExperiences