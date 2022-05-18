import {
    BrowserRouter as Router,
    Switch,
    Route,
    useRouteMatch,
} from "react-router-dom";
import React, { useState, useContext, Component } from "react";
import AppAgentListExperiences from './components/agent/AppAgentListExperiences';
import { Alert, Button, Snackbar } from '@mui/material';
import { messageService } from './_services/AlertToast'
import AppAgentEditExperience from './components/agent/AppAgentEditExperience';
import PrimarySearchAppBar from './components/agent/MenuAgent';

class AppAgent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: "",
            severity: "success"
        }
    }
    handleOpenToast = () => {
        this.setState({ open: true })
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    componentDidMount() {
        // subscribe to home component messages
        this.subscription = messageService.getMessage().subscribe(message => {
            if (message) {
                this.setState({ open: true, message: message });
            } else {
                this.setState({ open: false, message: "" });
            }
        });
    }
    componentWillUnmount() {
        // unsubscribe to ensure no memory leaks
        this.subscription.unsubscribe();
    }

    render() {
        const { open, message, severity } = this.state;
        return (
            <React.Fragment>
                <PrimarySearchAppBar />
                <Switch>
                    <Route exact path="/">
                        <p>---------</p>
                    </Route>
                    <Route exact path="/agent/experiences">
                        <AppAgentListExperiences />
                    </Route>
                    <Route path="/agent/experiences/:id/edit" children={(props) => <AppAgentEditExperience {...props} />} />
                </Switch>
                <Snackbar open={open} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={message.severity ? message.severity : "success"} sx={{ width: '100%' }}>
                        {message.text}
                    </Alert>
                </Snackbar>
            </React.Fragment>

        );
    }
}
export default AppAgent