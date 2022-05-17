import './App.css';
import './css/bootstrap.min.css';
import './css/couche-bootstrap.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import React, { useState, useContext, Component } from "react";
import AppAgentListExperiences from './components/agent/AppAgentListExperiences';
import { Alert, Button, Snackbar } from '@mui/material';
import { messageService } from './_services/AlertToast'

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
                <Router>
                    <Switch>
                        <Route path="/agent/experiences/2">
                            <p>une experience</p>
                        </Route>
                        <Route path="/agent/experiences">
                            <AppAgentListExperiences />
                        </Route>
                    </Switch>
                </Router>
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