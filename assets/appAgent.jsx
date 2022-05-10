import './App.css';
import './css/bootstrap.min.css';
import './css/couche-bootstrap.css';

import React, { useState, useContext } from "react";

import ExperiencesTable from './components/agent/ExperiencesTable';
import PrimarySearchAppBar from './components/agent/MenuAgent';
import CustomizedBreadcrumbs from './components/agent/Breadcrumbs';
import { AlertTitle, Alert, Box, Button, ButtonGroup, Grid, Stack, Typography, Pagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';


function AppAgent() {

    const buttons = [
        <Button variant="outlined" color="primary" startIcon={<AddIcon />}>Add</Button>,
        <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>Delete</Button>,
        <Button variant="contained" color="secondary" endIcon={<SendIcon />}>Send </Button>
    ];
    return (

        <div>
            <div class="menu">
                <PrimarySearchAppBar />
            </div>
            <navbar>
                <Box sx={{ flexGrow: 1 }} m={2}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}
                    >
                        <Typography variant="h3" component="h1">
                            Title
                        </Typography>
                        <CustomizedBreadcrumbs />
                        <Stack direction="row" spacing={2}>
                            {buttons}
                        </Stack>
                    </Stack>
                </Box>
            </navbar>
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
                <ExperiencesTable />
                <Stack alignItems="flex-end">
                    <Pagination count={10} variant="outlined" shape="rounded" />
                </Stack>
            </Stack>

        </div>

    );
}

export default AppAgent