import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { lightBlue } from '@mui/material/colors';
import axios from 'axios';
import React, { useState, useContext } from "react";

class DialogFormExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: "",
            newExp: { id: 0, title: "" }
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.ouvrir !== this.props.ouvrir) {
            this.setState({
                open: this.props.ouvrir
            });
        }
    }

    handleSubmit = async () => {
        var data = JSON.stringify({});
        data = JSON.stringify({
            "title": this.state.title,
        });
        try {
            let self = this;
            const experience = data;
            const headers = {
                'Content-Type': 'application/json'
            };
            axios.post('/rest/experiences', experience, {
                'Content-Type': 'application/json'
            }).then(response => {
                console.log(JSON.stringify(response.data.id));
                window.location = "/agent/experiences?newid=" + response.data.id
            }
            );
        }
        catch (err) {
            console.log(err);
        }

    }

    render() {
        const { title, newExp } = this.state;
        return (
            <div>
                <Dialog open={this.state.open} onClose={this.props.onClose} spacing={2} fullWidth={true} maxWidth={"md"}>
                    <DialogTitle>Nouvelle Experience</DialogTitle>
                    <DialogContent spacing={2}>
                        <DialogContentText>
                            Saisissez le titre
                        </DialogContentText>
                        <TextField
                            id="title"
                            helperText="Chaine de charactere"
                            autoFocus
                            margin="dense"
                            label="Titre Experience"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onInput={e => this.setState({ title: e.target.value })}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} >Cancel</Button>
                        <Button type="submit" onClick={this.handleSubmit}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}
export default DialogFormExperience