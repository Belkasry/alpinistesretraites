import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { lightBlue } from '@mui/material/colors';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import React, { useState, useContext } from "react";

class DialogFormExperience extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            title: "",
            newExp: { id: 0, title: "" },
            loading_save:false,
            fields: {},
            errors: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["title"]) {
            formIsValid = false;

            errors["title"] = new Array();
            errors["title"].push("Cannot be empty");
        }

        this.setState({ errors: errors });
        return formIsValid;
    }



    componentDidUpdate(prevProps, prevState) {
        if (prevProps.ouvrir !== this.props.ouvrir) {
            this.setState({
                open: this.props.ouvrir
            });
        }
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    handleSubmit = async () => {
       this.setState({ loading_save:true});
        if (this.handleValidation()) {
            var data = JSON.stringify({});
            data = JSON.stringify({
                "title": this.state.fields["title"],
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
                    self.props.onClose;
                    self.setState({ loading_save:false});
                    window.location = "/agent/experiences?newid=" + response.data.id
                }
                );
            }
            catch (err) {
                console.log(err);
            }
        }
        return false;

    }
    renderul(arr) {
        return "" +
            arr.map(item => (
                " ☹ " + item + " , \n "
            ))
            + "";
    }


    render() {
        const { errors, fields } = this.state;
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
                            error={(errors.hasOwnProperty("title") && errors.title.length) > 0 ? true : false}
                            helperText={(errors.hasOwnProperty("title") && errors.title.length > 0) ? `${this.renderul(errors["title"])}` : 'Champ obligatoire'}
                            autoFocus
                            margin="dense"
                            label="Titre Experience"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={this.handleChange.bind(this, "title")}
                            value={fields["title"]}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.onClose} >Cancel</Button>
                        <LoadingButton
                            type="submit"
                            onClick={this.handleSubmit}
                            loading={this.state.loading_save}
                            loadingPosition='start'
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </LoadingButton>
                    </DialogActions>
                </Dialog>
            </div >
        );
    }
}
export default DialogFormExperience