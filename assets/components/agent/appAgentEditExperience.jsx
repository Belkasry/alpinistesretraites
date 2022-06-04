import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import React, { useState, useContext, Component } from "react";
import {
    Alert, Autocomplete, Box, Button, Card, Chip, Grid, IconButton,
    InputAdornment, List, ListItem, ListItemText, Paper, Rating, Snackbar,
    Stack, TextField, Typography, FormControl, InputLabel, OutlinedInput, Container, Divider, Input, FormHelperText, CircularProgress
} from '@mui/material';
import { styled, ThemeProvider } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
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
import MUIRichTextEditor from "mui-rte";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import MenuDot from "./Composants/MenuDot";
import axios from "axios";
import { findWithAttr, findOneWithAttr, isJson } from "../../lib/utils.js"
import frLocale from 'date-fns/locale/fr';

class AppAgentEditExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: { notices: [], includes: [], requirements: [] },
            errors: {},
            loading_save: false,
            titre: "Expérience",
            description: "",
            value_activite: [],
            inputValue_activite: "",
            value_destination: {},
            inputValue_destination: "",
            destinations: [],
            activites: [],
            loadedActivites: [],
            notices: [],
            notice: { id: null, value: "" },
            include: { id: null, value: "" },
            requirement: { id: null, value: "" },
            isLoading: false,

        }

        this.addtoNoticeList = this.addtoNoticeList.bind(this);
        this.deletefromNoticeList = this.deletefromNoticeList.bind(this);
        this.editfromNoticeList = this.editfromNoticeList.bind(this);

        this.addtoIncludeList = this.addtoIncludeList.bind(this);
        this.editfromIncludeList = this.editfromIncludeList.bind(this);
        this.deletefromIncludeList = this.deletefromIncludeList.bind(this);

        this.addtoRequirementList = this.addtoRequirementList.bind(this);
        this.deletefromRequirementList = this.deletefromRequirementList.bind(this);
        this.editfromRequirementList = this.editfromRequirementList.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.savedraft = this.savedraft.bind(this);
        this.loadFields = this.loadFields.bind(this);
        this.loadFields2 = this.loadFields2.bind(this);
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        const promises = [];

        promises.push(await this.loadActivites());
        promises.push(await this.loadDestination());
        promises.push(await this.loadFields());


        Promise.all(promises).then(() => {
            this.setState({ isLoading: false });
        });


    }

    async loadFields2() {




        let activites = this.state.activites;
        let fields = this.state.fields;
        console.log(fields);
        let indexes = (findWithAttr(activites, "@id", fields["activites"]));
        let loadedActivites = [];
        indexes.forEach((index) => loadedActivites.push(activites[index]));
        this.setState({ value_activite: loadedActivites });
        let index = (findOneWithAttr(this.state.destinations, "@id", fields["destination"]));
        this.setState({ value_destination: this.state.destinations[index] });
        let includes = [];
        let notices = [];
        let requirements = [];
        if (fields.hasOwnProperty("include") && fields["include"]) {
            includes = (fields.hasOwnProperty("include") ? fields["include"] : []).map((x) => {
                return {
                    id: Date.now() * Math.floor(Math.random() * 100),
                    value: x
                }
            }
            );
        }
        if (fields.hasOwnProperty("notice")) {
            notices = (fields.hasOwnProperty("notice") ? fields["notice"] : []).map((x) => {
                return {
                    id: Date.now() * Math.floor(Math.random() * 100),
                    value: x
                }
            }
            );
        }
        if (fields.hasOwnProperty("requirement")) {
            requirements = (fields.hasOwnProperty("requirement") ? fields["requirement"] : []).map((x) => {
                return {
                    id: Date.now() * Math.floor(Math.random() * 100),
                    value: x
                }
            }
            );
        }

        fields["notices"] = notices;
        fields["requirements"] = requirements;
        fields["includes"] = includes;
        console.log(fields);
        this.setState({ fields });


    }

    async loadFields() {
        const options = { method: 'GET', url: '/rest/experiences/' + this.props.match.params.id };
        let self = this;
        await axios.request(options).then(
            function (response) {
                var result = response.data;
                var description = isJson(result["description"]) ? result["description"] :
                    '{"blocks":[{"key": "7v0t4","text": "' + result["description"] + '","type": "unstyled","depth": 0,"inlineStyleRanges": [], "entityRanges": [],"data": {}}], "entityMap": {}}';
                result["description"] = description;
                self.setState({
                    fields: result
                })
                self.loadFields2();
            }
        ).catch(function (error) {
            console.log(error);
        });
        ;
    }
    handleValidation() {

        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;

        //TITLE
        if (!fields["title"]) {
            formIsValid = false;

            errors["title"] = new Array();
            errors["title"].push("Champs requis");
        }
        if (fields["dificulte"]) {
            var dificulte = fields["dificulte"];
            errors["dificulte"] = new Array();
            if (!(!isNaN(parseFloat(dificulte)) && dificulte >= 0 && dificulte <= 5)) {
                formIsValid = false;
                errors["dificulte"].push("Valeur doit etre entre 0 et 5");
            }
        }

        if (fields["prix"]) {
            var prix = fields["prix"];
            errors["prix"] = new Array();
            if (!(/^[+-]?([0-9]*[.])?[0-9]+$/.test(prix))) {
                formIsValid = false;
                errors["prix"].push("Valeur doit etre entre un decimal");
            }
        }

        if (fields["duree"]) {
            var duree = fields["duree"];
            errors["duree"] = new Array();
            if (!(/^-?\d+$/.test(duree))) {
                formIsValid = false;
                errors["duree"].push("Valeur doit etre numérique");
            }
        }

        if (fields["nbr_participant"]) {
            var nbr_participant = fields["nbr_participant"];
            errors["nbr_participant"] = new Array();
            if (!(/^-?\d+$/.test(nbr_participant))) {
                formIsValid = false;
                errors["nbr_participant"].push("Valeur doit etre numérique");
            }
        }
        if (fields["nbr_participant_restant"]) {
            var nbr_participant_restant = fields["nbr_participant_restant"];
            errors["nbr_participant_restant"] = new Array();
            if (!(/^-?\d+$/.test(nbr_participant_restant))) {
                formIsValid = false;
                errors["nbr_participant_restant"].push("Valeur  doit etre numérique");
            }
            if (fields["nbr_participant_restant"] && parseInt(nbr_participant_restant) > parseInt(fields["nbr_participant"])) {
                formIsValid = false;
                errors["nbr_participant_restant"].push("Valeur doit etre numérique et inférieur à celle des participants");
            }
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
        let errors = this.state.errors;
        errors["notices"] = new Array();
        if (!this.state.notice.value) {
            errors["notices"].push("Inserer la notice");
            this.setState({ errors });
            return;
        }

        let fields = this.state.fields;

        let notices = fields.notices;
        let not_id = this.state.notice.id;
        let index_note = notices.findIndex(item => item.id == not_id);
        notices[(index_note == -1) ? notices.length : index_note] = {
            id: Date.now() * Math.floor(Math.random() * 100),
            value: this.state.notice.value
        }
        fields.notices = notices;
        this.setState({ fields, notice: { id: null, value: "" }, errors });
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
        let errors = this.state.errors;
        errors["includes"] = new Array();
        if (!this.state.include.value) {
            errors["includes"].push("Inserer la include");
            this.setState({ errors });
            return;
        }

        let fields = this.state.fields;

        let includes = fields.includes;
        let not_id = this.state.include.id;
        let index_note = includes.findIndex(item => item.id == not_id);
        includes[(index_note == -1) ? includes.length : index_note] = {
            id: Date.now() * Math.floor(Math.random() * 100),
            value: this.state.include.value
        }
        fields.includes = includes;
        this.setState({ fields, include: { id: null, value: "" }, errors });
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
        let errors = this.state.errors;
        errors["requirements"] = new Array();
        if (!this.state.requirement.value) {
            errors["requirements"].push("Inserer la requirement");
            this.setState({ errors });
            return;
        }

        let fields = this.state.fields;

        let requirements = fields.requirements;
        let not_id = this.state.requirement.id;
        let index_note = requirements.findIndex(item => item.id == not_id);
        requirements[(index_note == -1) ? requirements.length : index_note] = {
            id: Date.now() * Math.floor(Math.random() * 100),
            value: this.state.requirement.value
        }
        fields.requirements = requirements;
        this.setState({ fields, requirement: { id: null, value: "" }, errors });
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
        return <ul>
            {arr.map((item) => (
                <li>{item}</li>
            ))}
        </ul>

    }
    handleSubmit = async () => {
        this.setState({ loading_save: true });
        if (this.handleValidation()) {
            alert("submit");
        } return false;
    }
    savedraft = (data) => {
        console.log(data);
        let fields = this.state.fields;
        fields["description"] = data;
        this.setState({
            editorState: EditorState.createWithContent(
                convertFromRaw(JSON.parse(data)),
            ),
            fields
        })


    };
    loadDestination = async () => {
        try {
            let token = "";
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let response = null;

            response = await instance.get(
                `api/destinations`
            );

            const destinations = response.data["hydra:member"];
            this.setState({
                destinations: destinations,
            });
        } finally {
        }

    };

    loadActivites = async () => {
        try {
            let token = "";
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let response = null;

            response = await instance.get(
                `api/valeur_referentiels?id_ref.id=1`
            );

            const activites = response.data["hydra:member"];
            this.setState({
                activites: activites,
            });
        } finally {
        }

    };


    render() {
        const { errors, fields, titre, destinations, activites, value_activite, include, requirement, isLoading,
            notice, value_destination, inputValue_destination } = this.state;
        const id_exp = this.props.match.params.id;


        const theme = createTheme();

        Object.assign(theme, {
            overrides: {
                MUIRichTextEditor: {
                    root: {
                    },
                    editor: {
                        height: "200px",
                        padding: "10px",
                        overflowY: "auto",
                    },
                    placeHolder: {
                        margin: "10px",
                        fontWeight: "lighter",
                        color: "lightgray"
                    }
                }
            }
        })



        return (
            <Container maxWidth="lg" p={2} >
                {isLoading ? <div style={{ width: "100vh" }}>
                    <CircularProgress sx={{
                        m: "auto"
                    }} /></div> :
                    <>
                        <Paper sx={{
                            p: 2, m: 2
                        }} elevation={3}>
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
                                <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} >
                                    <Button variant="outlined" color="secondary" startIcon={<ArrowBackIosIcon />} size="small" />
                                    <SwitchState id={id_exp} etat={fields["etat"]} />
                                    <Button variant="outlined" color="secondary" startIcon={<SaveAsIcon />} onClick={this.handleValidation}
                                    >Valider</Button>
                                    <Button variant="outlined" color="error" startIcon={<DeleteIcon />} >Delete</Button>
                                    <Button variant="contained" color="primary" endIcon={<SaveIcon />} >Save </Button>
                                </Stack>
                            </Stack>
                        </Paper>
                        <Paper sx={{
                            p: 2, m: 2
                        }} elevation={3}>
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
                                            value={fields["title"] || ''}
                                            error={(errors.hasOwnProperty("title") && errors.title.length) > 0 ? true : false}
                                            helperText={(errors.hasOwnProperty("title") && errors.title.length > 0) ? this.renderul(errors["title"]) : 'Champ obligatoire'}
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
                                                this.fieldhandleChange("destination", newValue && newValue.hasOwnProperty("@id") ? newValue["@id"] : "")
                                            }}
                                            inputValue={inputValue_destination}
                                            onInputChange={(event, newInputValue) => {
                                                this.setState({ inputValue_destination: newInputValue })
                                            }}
                                            getOptionLabel={(option) => option ? option.name : ""}
                                            renderInput={(params) =>
                                                <TextField {...params}
                                                    label="Destination"
                                                />}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} >
                                        <TextField
                                            pattern="[0-9]*"
                                            label="Prix"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">MAD</InputAdornment>,
                                            }}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            onChange={this.handleChange.bind(this, "prix")}
                                            value={fields["prix"] || ''}
                                            error={(errors.hasOwnProperty("prix") && errors.prix.length) > 0 ? true : false}
                                            helperText={(errors.hasOwnProperty("prix") && errors.prix.length > 0) ? this.renderul(errors["prix"]) : 'Champ obligatoire'}

                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={2} >
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                                            <DatePicker

                                                fullWidth
                                                id="start"
                                                label="Date de debut"
                                                value={fields["start"] || ''}
                                                onChange={(newValue) => { this.fieldhandleChange("start", newValue) }}
                                                renderInput={(params) => <TextField
                                                    helperText="Date de début incluse" {...params} />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={2}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                                            <DatePicker

                                                fullWidth
                                                id="finish"
                                                label="Date de fin"
                                                value={fields["finish"] || ''}
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
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            variant="outlined"
                                            value={fields["duree"] || ''}
                                            onChange={this.handleChange.bind(this, "duree")}
                                            error={(errors.hasOwnProperty("duree") && errors.duree.length) > 0 ? true : false}
                                            helperText={(errors.hasOwnProperty("duree") && errors.duree.length > 0) ? this.renderul(errors["duree"]) : ''}
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
                                                    readOnly={false}
                                                    defaultValue={0}
                                                    precision={0.5}
                                                    icon={<FitnessCenterIcon fontSize="inherit" />}
                                                    emptyIcon={<FitnessCenterIcon fontSize="inherit" />}
                                                    onChange={this.handleChange.bind(this, "dificulte")}
                                                    value={fields["dificulte"] || 0}
                                                />

                                                <Box sx={{ ml: 2 }}>{fields["dificulte"] || 0}/5</Box>
                                            </Stack>
                                            <Typography color='error'>
                                                {(errors.hasOwnProperty("dificulte") && errors.dificulte.length > 0) ? this.renderul(errors["dificulte"]) : ''}
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={2} >
                                        <TextField
                                            id="nbr_participant"
                                            label="Nombre de participants"
                                            type="text"
                                            fullWidth
                                            variant="outlined"
                                            onChange={this.handleChange.bind(this, "nbr_participant")}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            value={fields["nbr_participant"] || ''}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            error={(errors.hasOwnProperty("nbr_participant") && errors.nbr_participant.length) > 0 ? true : false}
                                            helperText={(errors.hasOwnProperty("nbr_participant") && errors.nbr_participant.length > 0) ? this.renderul(errors["nbr_participant"]) : ''}

                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={2} >
                                        <TextField
                                            id="nbr_participant_restant"
                                            label="Nombre de résérvation"
                                            fullWidth
                                            variant="outlined"
                                            onChange={this.handleChange.bind(this, "nbr_participant_restant")}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}
                                            value={fields["nbr_participant_restant"] || ''}
                                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                            error={(errors.hasOwnProperty("nbr_participant_restant") && errors.nbr_participant_restant.length) > 0 ? true : false}
                                            helperText={(errors.hasOwnProperty("nbr_participant_restant") && errors.nbr_participant_restant.length > 0) ? this.renderul(errors["nbr_participant_restant"]) : ''}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} >
                                        <Autocomplete
                                            fullWidth
                                            multiple
                                            limitTags={2}
                                            id="activites"
                                            options={activites}
                                            getOptionLabel={(option) => option ? option.libelle : ""}
                                            value={value_activite}
                                            onChange={(event, newValue) => {
                                                console.log(value_activite);
                                                this.setState({ value_activite: newValue });
                                                this.fieldhandleChange("activites", newValue.map((v) => v["@id"]));
                                            }}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Activités" />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} sx={{ mb: 2 }}>
                                        <Paper variant="outlined" >
                                            <ThemeProvider theme={theme}>
                                                <MUIRichTextEditor
                                                    label="Type something here..."
                                                    onSave={this.savedraft}
                                                    inlineToolbar={true}
                                                    defaultValue={fields["description"]}
                                                />
                                            </ThemeProvider>
                                        </Paper>
                                        {/* <Editor editorState={editorState} readOnly={true} sx={{ display: 'none' }} /> */}
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={6}>
                                        <Paper elevation={1}>
                                            <FormControl fullWidth sx={{ mb: 1 }}>
                                                <InputLabel htmlFor="outlined-adornment-includes">Includes</InputLabel>
                                                <OutlinedInput
                                                    multiline
                                                    maxRows={3}
                                                    id="outlined-adornment-includes"
                                                    value={include.value}
                                                    onChange={(newValue) => { this.setState({ include: { id: include.id, value: newValue.target.value } }) }}
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
                                                    error={(errors.hasOwnProperty("includes") && errors.includes.length) > 0 ? true : false}
                                                />
                                                <FormHelperText>{(errors.hasOwnProperty("includes") && errors.includes.length > 0) ? this.renderul(errors["includes"]) : '--'}</FormHelperText>
                                            </FormControl>
                                            <List>
                                                {
                                                    fields.includes ? fields.includes.map(note =>
                                                        <ListItem key={note.id}
                                                            secondaryAction={
                                                                <MenuDot
                                                                    note_id={note.id}
                                                                    note_value={note.value}
                                                                    onDelete={this.deletefromIncludeList}
                                                                    onEdit={this.editfromIncludeList} />
                                                            }
                                                        >
                                                            <ListItemText
                                                                primary={note.value}
                                                            />
                                                        </ListItem>
                                                    ) : ''
                                                }
                                            </List>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Paper elevation={1}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="outlined-adornment-notices">Notices</InputLabel>
                                                <OutlinedInput
                                                    multiline
                                                    maxRows={3}
                                                    id="outlined-adornment-notices"
                                                    value={notice.value}
                                                    onChange={(newValue) => { this.setState({ notice: { id: notice.id, value: newValue.target.value } }) }}
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
                                                    error={(errors.hasOwnProperty("notices") && errors.notices.length) > 0 ? true : false}
                                                />
                                                <FormHelperText>{(errors.hasOwnProperty("notices") && errors.notices.length > 0) ? this.renderul(errors["notices"]) : '--'}
                                                </FormHelperText>
                                            </FormControl>
                                            <List>
                                                {fields.notices ? fields.notices.map(note =>
                                                    <ListItem key={note.id}
                                                        secondaryAction={
                                                            <MenuDot
                                                                note_id={note.id}
                                                                note_value={note.value}
                                                                onDelete={this.deletefromNoticeList}
                                                                onEdit={this.editfromNoticeList} />
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={note.value}
                                                        />
                                                    </ListItem>
                                                ) : ''}
                                            </List>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6}>
                                        <Paper elevation={1}>
                                            <FormControl fullWidth>
                                                <InputLabel htmlFor="outlined-adornment-requirements">Requirements</InputLabel>
                                                <OutlinedInput
                                                    multiline
                                                    maxRows={3}
                                                    id="outlined-adornment-requirements"
                                                    value={requirement.value}
                                                    onChange={(newValue) => { this.setState({ requirement: { id: requirement.id, value: newValue.target.value } }) }}
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
                                                    error={(errors.hasOwnProperty("requirements") && errors.requirements.length) > 0 ? true : false}
                                                />
                                                <FormHelperText>{(errors.hasOwnProperty("requirements") && errors.requirements.length > 0) ? this.renderul(errors["requirements"]) : '--'}
                                                </FormHelperText>
                                            </FormControl>
                                            <List>
                                                {fields.requirements ? fields.requirements.map(note =>
                                                    <ListItem key={note.id}
                                                        secondaryAction={
                                                            <MenuDot
                                                                note_id={note.id}
                                                                note_value={note.value}
                                                                onDelete={this.deletefromRequirementList}
                                                                onEdit={this.editfromRequirementList} />
                                                        }
                                                    >
                                                        <ListItemText
                                                            primary={note.value}
                                                        />
                                                    </ListItem>
                                                ) : ''}
                                            </List>
                                        </Paper>
                                    </Grid>

                                </Grid>
                            </Box>
                        </Paper>
                        <p>{JSON.stringify(fields)}</p>
                        <p>{JSON.stringify(errors)}</p>
                    </>}
            </Container >);

    }
}
export default AppAgentEditExperience;