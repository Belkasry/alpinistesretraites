import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import React, { useState, useContext, Component } from "react";
import {
    Alert, Autocomplete, Box, Button, Card, Chip, Grid, IconButton,
    InputAdornment, List, ListItem, ListItemText, Paper, Rating, Snackbar,
    Stack, TextField, Typography, FormControl, InputLabel, OutlinedInput, Container, Divider, Input
} from '@mui/material';

import CustomizedBreadcrumbs from './Breadcrumbs';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import SwitchState from "./Composants/SwitchState";
import SwipeableTextMobileStepper from "./Composants/SwipeableTextMobileStepper";



class AppAgentEditExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { notices: [], includes: [], requirements: [] },
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
                { id: "/api/valeur_referentiels/1", libelle: "Montagne" },
                { id: "/api/valeur_referentiels/2", libelle: "Escalade" },
                { id: "/api/valeur_referentiels/3", libelle: "Alpinisme" },
                { id: "/api/valeur_referentiels/4", libelle: "VTT" }],
            notices: [],
            notice: { id: null, value: "" },
            include: { id: null, value: "" },
            requirement: { id: null, value: "" },
        }
        this.addtoNoticeList = this.addtoNoticeList.bind(this);
        this.addtoIncludeList = this.addtoIncludeList.bind(this);
        this.addtoRequirementList = this.addtoRequirementList.bind(this);
    }

    componentDidMount() {
        this.setState({
            value_destination: this.state.destinations[0],
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

    addtoNoticeList() {
        let fields = this.state.fields;

        let notices = fields.notices;
        let not_id = this.state.notice.id;
        let index_note = notices.findIndex(item => item.id == not_id);
        notices[(index_note == -1) ? notices.length : index_note] = {
            id: Date.now() * Math.floor(Math.random() * 100),
            value: this.state.notice.value
        }
        fields.notices = notices;
        this.setState({ fields, notice: { id: null, value: "" } });
    }

    deletefromNoticeList(id) {
        let fields = this.state.fields;
        let notices = fields.notices;

        notices.splice(notices.findIndex(item => item.id == id), 1)
        this.setState({ fields });

    }
    editfromNoticeList(id, value) {
        this.setState({ notice: { id: id, value: value } });
    }



    addtoIncludeList() {
        let fields = this.state.fields;

        let includes = fields.includes;
        let not_id = this.state.include.id;
        let index_note = includes.findIndex(item => item.id == not_id);
        includes[(index_note == -1) ? includes.length : index_note] = {
            id: Date.now() * Math.floor(Math.random() * 100),
            value: this.state.include.value
        }
        fields.includes = includes;
        this.setState({ fields, include: { id: null, value: "" } });
    }
    deletefromIncludeList(id) {
        let fields = this.state.fields;
        let includes = fields.includes;

        includes.splice(includes.findIndex(item => item.id == id), 1)
        this.setState({ fields });

    }
    editfromIncludeList(id, value) {
        this.setState({ include: { id: id, value: value } });
    }

    addtoRequirementList() {
        let fields = this.state.fields;

        let requirements = fields.requirements;
        let not_id = this.state.requirement.id;
        let index_note = requirements.findIndex(item => item.id == not_id);
        requirements[(index_note == -1) ? requirements.length : index_note] = {
            id: Date.now() * Math.floor(Math.random() * 100),
            value: this.state.requirement.value
        }
        fields.requirements = requirements;
        this.setState({ fields, requirement: { id: null, value: "" } });
    }
    deletefromRequirementList(id) {
        let fields = this.state.fields;
        let requirements = fields.requirements;

        requirements.splice(requirements.findIndex(item => item.id == id), 1)
        this.setState({ fields });

    }
    editfromRequirementList(id, value) {
        this.setState({ requirement: { id: id, value: value } });
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
        const { errors, fields, titre, destinations, activites, value_activite, include, requirement,
            notice, notices, value_destination, inputValue_destination } = this.state;
        const id_exp = this.props.match.params.id;
        

        return (
            <Container maxWidth="lg" p={2}>

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
                            <Grid item xs={6} sm={6} md={2} >
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
                            <Grid item xs={6} sm={6} md={2} >
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
                            <Grid item xs={12} sm={12} md={4} >
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
                            <Grid item xs={12} sm={12} md={4} >
                                <label htmlFor="icon-button-file">
                                    <Input accept="image/*" id="icon-button-file" type="file" sx={{display: 'none'}}/>
                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                        <PhotoCameraIcon />
                                    </IconButton>
                                </label>
                            </Grid>
                            <Grid item xs={12} sm={12}  >
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} >
                                <TextField
                                    id="description"
                                    fullWidth
                                    variant="outlined"
                                    label="Description"
                                    multiline
                                    onChange={this.handleChange.bind(this, "description")}
                                    value={fields["description"]}
                                    error={(errors.hasOwnProperty("description") && errors.title.length) > 0 ? true : false}
                                    helperText={(errors.hasOwnProperty("description") && errors.title.length > 0) ? `${this.renderul(errors["description"])}` : 'Helper description'}

                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <Stack direction={{ xs: 'column', sm: 'row' }}
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={2} >
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Paper elevation={1}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="outlined-adornment-includes">Includes</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-includes"
                                                    value={include.value}
                                                    onChange={(newValue) => { this.setState({ include: { id: include.id, value: newValue.target.value } }) }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            this.addtoIncludeList();
                                                        }
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={this.addtoIncludeList}
                                                                edge="end" >
                                                                <AddIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Includes"
                                                />
                                            </FormControl>
                                            <List>
                                                {fields.includes.map(note =>
                                                    <ListItem key={note.id}
                                                        secondaryAction={
                                                            <Stack
                                                                direction={{ xs: 'column', sm: 'row' }}
                                                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                                            >
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="delete"
                                                                    onClick={() => this.deletefromIncludeList(note.id)}  >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="edit"
                                                                    onClick={() => this.editfromIncludeList(note.id, note.value)}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Stack>
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={note.value}
                                                        />
                                                    </ListItem>
                                                )}
                                            </List>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Paper elevation={1}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="outlined-adornment-notices">Notices</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-notices"
                                                    value={notice.value}
                                                    onChange={(newValue) => { this.setState({ notice: { id: notice.id, value: newValue.target.value } }) }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            this.addtoNoticeList();
                                                        }
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={this.addtoNoticeList}
                                                                edge="end" >
                                                                <AddIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Notices"
                                                />
                                            </FormControl>
                                            <List>
                                                {fields.notices.map(note =>
                                                    <ListItem key={note.id}
                                                        secondaryAction={
                                                            <Stack
                                                                direction={{ xs: 'column', sm: 'row' }}
                                                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                                            >
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="delete"
                                                                    onClick={() => this.deletefromNoticeList(note.id)}  >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="edit"
                                                                    onClick={() => this.editfromNoticeList(note.id, note.value)}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Stack>
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={note.value}
                                                        />
                                                    </ListItem>
                                                )}
                                            </List>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4}>
                                        <Paper elevation={1}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="outlined-adornment-requirements">Requirements</InputLabel>
                                                <OutlinedInput
                                                    id="outlined-adornment-requirements"
                                                    value={requirement.value}
                                                    onChange={(newValue) => { this.setState({ requirement: { id: requirement.id, value: newValue.target.value } }) }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            this.addtoRequirementList();
                                                        }
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                onClick={this.addtoRequirementList}
                                                                edge="end" >
                                                                <AddIcon />
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    label="Requirements"
                                                />
                                            </FormControl>
                                            <List>
                                                {fields.requirements.map(note =>
                                                    <ListItem key={note.id}
                                                        secondaryAction={
                                                            <Stack
                                                                direction={{ xs: 'column', sm: 'row' }}
                                                                spacing={{ xs: 1, sm: 2, md: 4 }}
                                                            >
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="delete"
                                                                    onClick={() => this.deletefromRequirementList(note.id)}  >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                <IconButton
                                                                    edge="end"
                                                                    aria-label="edit"
                                                                    onClick={() => this.editfromRequirementList(note.id, note.value)}
                                                                >
                                                                    <EditIcon />
                                                                </IconButton>
                                                            </Stack>
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={note.value}
                                                        />
                                                    </ListItem>
                                                )}
                                            </List>
                                        </Paper>
                                    </Grid>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                <p>{JSON.stringify(fields)}</p>
            </Container>);

    }
}
export default AppAgentEditExperience;