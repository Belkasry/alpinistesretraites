import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import React, { useState, useContext, Component } from "react";
import { Alert, Autocomplete, Box, Button, Card, Chip, Grid, InputAdornment, Paper, Rating, Snackbar, Stack, TextField, Typography } from '@mui/material';
import CustomizedBreadcrumbs from './Breadcrumbs';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SwitchState from "./Composants/SwitchState";



class AppAgentEditExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            loading_save: false,
            titre: "Expérience",
            value_activite: [],
            inputValue_activite: "",
            value_destination: {},
            inputValue_destination: "",
            destinations: [
                { name: 'Toubkal', id: "/api/destinations/1" },
                { name: 'Imlil', id: "/api/destinations/2" },
                { name: 'Tidghine', id: "/api/destinations/3" },
                { name: 'Marzouga', id: "/api/destinations/4" }],
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

    componentDidMount() {
        this.setState({
            value_destination: this.state.destinations[0]
        })
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

    fieldhandleChange(field, value) {
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
        const { errors, fields, titre, destinations, activites, value_activite, inputValue_activite, value_destination, inputValue_destination } = this.state;
        const id_exp = this.props.match.params.id;
        return (
            <Box sx={{ width: 3 / 4, mx: 'auto' }} p={2}>

                <Box sx={{ flexGrow: 1 }} m={2}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h4" component="h1">
                            {`${titre} : ${id_exp}`}
                        </Typography>
                        <CustomizedBreadcrumbs chemin={["Experiences", id_exp]} />
                        <Stack direction="row" spacing={2}>
                            <Button variant="outlined" color="secondary" startIcon={<ArrowBackIosIcon />} size="small" />

                            <SwitchState id={id_exp} etat={false} />

                            <Button variant="outlined" color="secondary" startIcon={<SaveAsIcon />}>Valider</Button>
                            <Button variant="outlined" color="error" startIcon={<DeleteIcon />} >Delete</Button>
                            <Button variant="contained" color="primary" endIcon={<SaveIcon />} >Save </Button>
                        </Stack>
                    </Stack>
                </Box>
                <Paper sx={{
                    p: 2, m: 2
                }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={12} sm={4} md={4} >
                                <TextField
                                    id="title"
                                    autoFocus
                                    label="Titre Experience"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    onChange={this.handleChange.bind(this, "title")}
                                    value={fields["title"]}
                                    error={(errors.hasOwnProperty("title") && errors.title.length) > 0 ? true : false}
                                    helperText={(errors.hasOwnProperty("title") && errors.title.length > 0) ? `${this.renderul(errors["title"])}` : 'Champ obligatoire'}

                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} >
                                <Autocomplete
                                    disablePortal
                                    id="destination"
                                    variant="outlined"
                                    fullWidth
                                    value={value_destination}
                                    options={destinations}
                                    onChange={(event, newValue) => {
                                        this.setState({ value_destination: newValue });
                                        this.fieldhandleChange("destination", newValue && newValue.hasOwnProperty("id") ? newValue.id : "")
                                    }}
                                    inputValue={inputValue_destination}
                                    onInputChange={(event, newInputValue) => {
                                        this.setState({ inputValue_destination: newInputValue })
                                    }}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                            label="Destination"
                                        />}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} >
                                <TextField
                                    error={(errors.hasOwnProperty("prix") && errors.prix.length) > 0 ? true : false}
                                    helperText={(errors.hasOwnProperty("prix") && errors.prix.length > 0) ? `${this.renderul(errors["prix"])}` : ''}

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
                            <Grid item xs={6} sm={4} md={2} >
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker

                                        fullWidth
                                        id="start"
                                        label="Date de debut"
                                        value={fields["start"]}
                                        onChange={(newValue) => { this.fieldhandleChange("start", newValue) }}
                                        renderInput={(params) => <TextField
                                            helperText="Date de début incluse" {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6} sm={4} md={2}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker

                                        fullWidth
                                        id="finish"
                                        minDate={new Date('2022-01-01')}
                                        label="Date de fin"
                                        value={fields["finish"]}
                                        onChange={(newValue) => { this.fieldhandleChange("finish", newValue) }}
                                        renderInput={(params) => <TextField helperText=" " {...params} />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} >
                                <TextField
                                    id="duree"
                                    label="Durée"
                                    type="text"
                                    fullWidth
                                    variant="outlined"
                                    value={fields["duree"]}
                                    onChange={this.handleChange.bind(this, "duree")}
                                    error={(errors.hasOwnProperty("duree") && errors.duree.length) > 0 ? true : false}
                                    helperText={(errors.hasOwnProperty("duree") && errors.duree.length > 0) ? `${this.renderul(errors["duree"])}` : 'Durée est déterminé par le choix de date début et de date de fin'}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} >
                                <Box
                                    sx={{
                                        p: 1,
                                        border: '1px solid',
                                        borderColor: '#c4c4c4',
                                        borderRadius: 2,
                                        fontSize: '0.875rem',
                                        fontWeight: '700',
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        spacing={2}
                                        justifyContent="space-around"
                                        alignItems="center">
                                        <Typography >Difficulté</Typography>
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
                                </Box>
                            </Grid>
                            <Grid item xs={6} sm={2} md={2} >
                                <TextField
                                    id="nbr_participant"

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
                            <Grid item xs={6} sm={2} md={2} >
                                <TextField
                                    id="nbr_participant_restant"

                                    label="Nombre de résérvation"
                                    fullWidth
                                    variant="outlined"
                                    helperText=" --"
                                    onChange={this.handleChange.bind(this, "nbr_participant_restant")}
                                    value={fields["nbr_participant_restant"]}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} >
                                
                                <Autocomplete
                                    fullWidth
                                    multiple
                                    limitTags={2}
                                    id="activites"
                                    options={activites}
                                    getOptionLabel={(option) => option.libelle}
                                    value={value_activite}
                                    onChange={(event, newValue) => {
                                        this.setState({ value_activite: newValue });
                                        this.fieldhandleChange("activites", newValue.map(({ id }) => id));
                                    }}

                                    renderInput={(params) => (
                                        <TextField {...params} label="Activités" />
                                    )}
                                />

                            </Grid>

                            <Grid item xs={4} sm={8} md={8} >
                                <TextField
                                    id="description"
                                    fullWidth
                                    variant="outlined"
                                    label="Description"
                                    multiline
                                    rows={3}
                                    onChange={this.handleChange.bind(this, "description")}
                                    value={fields["description"]}
                                    error={(errors.hasOwnProperty("description") && errors.title.length) > 0 ? true : false}
                                    helperText={(errors.hasOwnProperty("description") && errors.title.length > 0) ? `${this.renderul(errors["description"])}` : 'Helper description'}

                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                <div>{JSON.stringify(this.state.fields)}</div>
            </Box>);

    }
}
export default AppAgentEditExperience;