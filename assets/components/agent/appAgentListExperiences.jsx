import React, { useState, useContext } from "react";
import ExperiencesGridTable from './ExperiencesGridTable';
import CustomizedBreadcrumbs from './Breadcrumbs';
import { AlertTitle, Alert, Box, Button, ButtonGroup, Grid, Stack, Typography, Pagination, Container, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import CommentIcon from '@mui/icons-material/Comment';
import CheckIcon from '@mui/icons-material/CheckCircleOutline';
import DialogFormExperience from './DialogFormExperience';


class AppAgentListExperiences extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            titre: "Liste des Expériences"
        };
        this.onClose = this.onClose.bind(this)
    }

    componentWillMount() {
        this.setState({ titre: "Liste des Expériences" })
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
        const { titre } = this.state;
        return (
            <div>
                <Box sx={{ width: 3 / 4, mx: 'auto' }} >
                    <Paper sx={{ p: 2, m:2,flexGrow: 1 }} >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                        >
                            <Typography variant="h3" component="h1">
                                {titre}
                            </Typography>
                            <CustomizedBreadcrumbs chemin={["Experiences"]} />
                            <Stack direction="row" spacing={2}>
                                <Button onClick={this.Open} variant="outlined" color="secondary" startIcon={<AddIcon />}>Add</Button>,
                                <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>Delete</Button>,
                                <Button variant="contained" color="secondary" endIcon={<SendIcon />}>Send </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                    <DialogFormExperience ouvrir={this.state.open} onClose={this.onClose} />
                    <Stack
                        direction="row"
                        justifyContent="center"
                        alignItems="stretch"
                        spacing={2}
                       sx={{ p: 2, m:2}}
                    >
                        <Alert severity="info" icon={<CommentIcon fontSize="inherit" />} elevation={1}>
                            <AlertTitle>Nombre d'Expériences Active</AlertTitle>
                            <strong><Box sx={{ fontSize: 34 }}>10</Box></strong>
                        </Alert>
                        <Alert severity="success" icon={<CommentIcon fontSize="inherit" />} elevation={1}>
                            <AlertTitle>Nombre de Participants</AlertTitle>
                            <strong><Box sx={{ fontSize: 34 }}>156</Box></strong>
                        </Alert>
                        <Alert severity="info" icon={<CommentIcon fontSize="inherit" />} elevation={1}>
                            <AlertTitle>Nombre de Reviews</AlertTitle>
                            <strong><Box sx={{ fontSize: 34 }}>66</Box></strong>
                        </Alert>
                        <Alert severity="secondary" icon={<CheckIcon fontSize="inherit" />} elevation={1}>
                            <AlertTitle>Nombre de Followers</AlertTitle>
                            <strong><Box sx={{ fontSize: 34 }}>32</Box></strong>
                        </Alert>
                    </Stack>
                    <Paper elevation={1} sx={{ p: 2, m:2}}>
                        <Stack
                            direction="column"
                            justifyContent="center"
                            spacing={2}
                            alignItems="stretch"
                        >
                            <ExperiencesGridTable />
                        </Stack>
                    </Paper>
                </Box>
            </div >
        );
    }
}
export default AppAgentListExperiences