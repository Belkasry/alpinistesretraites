import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import React, { useState, useContext, Component } from "react";
import { Alert, Autocomplete, Box, Button, Chip, Grid, InputAdornment, Paper, Rating, Snackbar, Stack, TextField, Typography } from '@mui/material';
import CustomizedBreadcrumbs from './Breadcrumbs';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import CommentIcon from '@mui/icons-material/Comment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';


class AppAgentEditExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            loading_save: false,
            titre: "Expérience",
            destinations: [
                { label: 'Imlil', id: 3 },
                { label: 'Anti Atlas', id: 1 },
                { label: 'Tidghine', id: 4 },
                { label: 'Marzouga', id: 2 }],
            activites: [
                {
                    id: "/api/valeur_referentiels/1",
                    libelle: "Montagne"

                },
                {
                    id: "/api/valeur_referentiels/2",
                    libelle: "Escalade"

                },
                {
                    id: "/api/valeur_referentiels/3",
                    libelle: "Alpinisme"

                },
                {
                    id: "/api/valeur_referentiels/4",
                    libelle: "VTT"
                }]
        }
    }
    handleValidation() {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //TITLE
        if (!fields["title"]) {
            formIsValid = false;

            errors["title"] = new Array();
            errors["title"].push("Cannot be empty");
        }

        this.setState({ errors: errors, loading_save: false });
        return formIsValid;
    }

    handleChange(field, e) {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    timehandleChange(field, value) {
        let fields = this.state.fields;
        fields[field] = value;
        this.setState({ fields });
    }
    renderul(arr) {
        return "" +
            arr.map(item => (
                " ☹ " + item + " , \n "
            ))
            + "";
    }
    handleSubmit = async () => {
        this.setState({ loading_save: true });
        if (this.handleValidation()) {
            alert("submit");
        } return false;
    }

    render() {
        const { errors, fields, titre, destinations, activites } = this.state;
        return (
            <Box sx={{ width: 3 / 4, mx: 'auto' }} >
                <Box sx={{ flexGrow: 1 }} m={2}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h4" component="h1">
                            {`${titre} : ${this.props.match.params.id}`}
                        </Typography>
                        <CustomizedBreadcrumbs chemin={["Experiences", this.props.match.params.id]} />
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" color="secondary" startIcon={<AddIcon />}>Add</Button>
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />}>Delete</Button>
                            <Button variant="contained" color="secondary" endIcon={<SendIcon />}>Send </Button>
                        </Stack>
                    </Stack>
                </Box>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4} >
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
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <Autocomplete
                                disablePortal
                                id="destination"
                                variant="outlined"
                                fullWidth
                                options={destinations}
                                value={fields["destination"]}
                                renderInput={(params) =>
                                    <TextField {...params}
                                        label="Destination"
                                        onChange={this.handleChange.bind(this, "destination")}
                                        helperText={(errors.hasOwnProperty("destination") && errors.destination.length > 0) ? `${this.renderul(errors["destination"])}` : 'Choisissez une destination'}
                                        margin="dense" />}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <TextField
                                error={(errors.hasOwnProperty("prix") && errors.prix.length) > 0 ? true : false}
                                helperText={(errors.hasOwnProperty("prix") && errors.prix.length > 0) ? `${this.renderul(errors["prix"])}` : ''}
                                margin="dense"
                                label="Prix"
                                type="text"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">MAD</InputAdornment>,
                                }}
                                onChange={this.handleChange.bind(this, "prix")}
                                value={fields["prix"]}
                            />
                        </Grid>
                        <Grid item xs={1} sm={2} md={2} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    margin="dense"
                                    fullWidth
                                    id="start"
                                    label="Date de debut"
                                    value={fields["start"]}
                                    onChange={(newValue) => { this.timehandleChange("start", newValue) }}
                                    renderInput={(params) => <TextField
                                        helperText="Date de début incluse" {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={1} sm={2} md={2} paddingTop={1}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    margin="dense"
                                    fullWidth
                                    id="finish"
                                    minDate={new Date('2022-01-01')}
                                    label="Date de fin"
                                    value={fields["finish"]}
                                    onChange={(newValue) => { this.timehandleChange("finish", newValue) }}
                                    renderInput={(params) => <TextField helperText=" " {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <TextField
                                id="duree"
                                margin="dense"
                                label="Durée"
                                type="text"
                                fullWidth
                                variant="outlined"
                                helperText="Durée est déterminé par le choix de date début et de date de fin"
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <Typography component="legend">Difficulté</Typography>
                            <Stack
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                            >

                                <Rating
                                    defaultValue={0}
                                    precision={0.5}
                                    icon={<FitnessCenterIcon fontSize="inherit" />}
                                    emptyIcon={<FitnessCenterIcon fontSize="inherit" />}
                                    name="simple-controlled"
                                    onChange={this.handleChange.bind(this, "dificulte")}
                                    value={fields["dificulte"]}
                                />
                                <Box sx={{ ml: 2 }}>{fields["dificulte"] || 0}/5</Box>
                            </Stack>
                        </Grid>
                        <Grid item xs={1} sm={2} md={2} >
                            <TextField
                                id="nbr_participant"
                                margin="dense"
                                label="Nombre de participants"
                                type="text"
                                fullWidth
                                variant="outlined"
                                helperText=" --"
                                onChange={this.handleChange.bind(this, "nbr_participant")}
                                value={fields["nbr_participant"]}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                        </Grid>
                        <Grid item xs={1} sm={2} md={2} >
                            <TextField
                                id="nbr_participant_restant"
                                margin="dense"
                                label="Nombre de résérvation"
                                fullWidth
                                variant="outlined"
                                helperText=" --"
                                onChange={this.handleChange.bind(this, "nbr_participant_restant")}
                                value={fields["nbr_participant_restant"]}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                        </Grid>
                        <Grid item xs={3} sm={6} md={6} >
                            <Autocomplete
                                multiple
                                id="activites"
                                freeSolo
                                options={activites.map((option) => option.libelle)}
                                defaultValue={[activites[0].libelle]}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Activités"
                                        helperText=" --"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={3} sm={6} md={6} >
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                label="Description"
                                helperText=" --"
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>);

    }
}
export default AppAgentEditExperience;