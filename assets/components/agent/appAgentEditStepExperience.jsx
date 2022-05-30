import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import React, { useState, useContext, Component } from "react";
import {
    Alert, Autocomplete, Box, Button, Card, Chip, Grid, IconButton,
    InputAdornment, List, ListItem, ListItemText, Paper, Rating, Snackbar,
    Stack, TextField, Typography, FormControl, InputLabel, OutlinedInput, Container, Divider, Input, FormHelperText, Select, MenuItem
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
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomizedTimeline from "./Composants/CustomizedTimeline";
import FileUpload from "react-mui-fileuploader"
import uploadIcon from '../../img/upload.png'




class AppAgentEditStepExperience extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {},
            errors: {},
            loading_save: false,
            titre: "Etapes de l'Expérience",
            value_type_etape: [],
            inputValue_type_etape: "",
            value_destination: {},
            inputValue_destination: "",
            destinations: [
                { name: 'Toubkal', id: "/api/destinations/1" },
                { name: 'Imlil', id: "/api/destinations/2" },
                { name: 'Tidghine', id: "/api/destinations/3" },
                { name: 'Marzouga', id: "/api/destinations/4" }],
            typesEtape: [
                { id: "/api/valeur_referentiels/20", libelle: "Montagne" },
                { id: "/api/valeur_referentiels/21", libelle: "Escalade" },
                { id: "/api/valeur_referentiels/22", libelle: "Alpinisme" },
                { id: "/api/valeur_referentiels/26", libelle: "VTT" }],
            duree_experience: 2,
        }
        this.handleValidation = this.handleValidation.bind(this);
    }

    componentDidMount() {
        this.setState({
            value_destination: this.state.destinations[0],
            value_type_etape: this.state.typesEtape[0],
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
            errors["title"].push("Champ requis");
        }
        if (!fields["jour"]) {
            formIsValid = false;

            errors["jour"] = new Array();
            errors["jour"].push("Champ requis");
        }
        if (!fields["debut"]) {
            formIsValid = false;

            errors["debut"] = new Array();
            errors["debut"].push("Champ requis");
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


    render() {
        const { errors, fields, titre, destinations, type_etape, value_type_etape,
            value_destination, inputValue_destination, inputValue_type_etape, editorState, typesEtape, duree_experience } = this.state;
        const id_exp = this.props.match.params.id;




        return (
            <Container maxWidth="lg" p={2} >
                <Paper sx={{
                    p: 2, m: 2
                }}>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Typography variant="h4" component="h1" sx={{ fontSize: "1.5rem" }}>
                            {`${titre} : ${id_exp}`}
                        </Typography>
                        <CustomizedBreadcrumbs chemin={["Experiences", id_exp, "Etapes"]} />
                        <Stack spacing={2} direction={{ xs: 'column', md: 'row' }} >
                            <Button variant="outlined" color="secondary" startIcon={<ArrowBackIosIcon />} size="small" />
                            <Button variant="contained" color="primary" endIcon={<SaveIcon />} >Save </Button>
                        </Stack>
                    </Stack>
                </Paper>
                <Paper sx={{
                    p: 2, m: 2
                }}>
                    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                        <Grid item xs={4} sm={4} md={4} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disabled
                                    id="start"
                                    label="Date de debut"
                                    value={fields["start"]}
                                    onChange={(newValue) => { this.fieldhandleChange("start", newValue) }}
                                    renderInput={(params) => <TextField
                                        helperText="Date de début incluse" {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disabled
                                    id="finish"
                                    minDate={new Date('2022-01-01')}
                                    label="Date de fin"
                                    value={fields["finish"]}
                                    onChange={(newValue) => { this.fieldhandleChange("finish", newValue) }}
                                    renderInput={(params) => <TextField helperText=" " {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={4} sm={4} md={4} >
                            <TextField
                                disabled
                                id="duree"
                                label="Durée"
                                type="text"
                                onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}
                                variant="outlined"
                                value={fields["duree"]}
                                onChange={this.handleChange.bind(this, "duree")}
                                error={(errors.hasOwnProperty("duree") && errors.duree.length) > 0 ? true : false}
                                helperText={(errors.hasOwnProperty("duree") && errors.duree.length > 0) ? this.renderul(errors["duree"]) : ''}
                            />
                        </Grid>
                    </Grid>
                </Paper>


                <Paper sx={{
                    p: 2, m: 2
                }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 3 }}>

                            <Grid item xs={1} sm={1} md={1} >
                                <Stack
                                    direction="column"
                                    spacing={2}
                                >
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
                                        helperText={(errors.hasOwnProperty("title") && errors.title.length > 0) ? this.renderul(errors["title"]) : 'Champ obligatoire'}
                                    />
                                    <FormControl >
                                        <InputLabel id="demo-simple-select-helper-label">Jour</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            defaultValue={duree_experience}
                                            value={fields["jour"]}
                                            label="Age"
                                            error={(errors.hasOwnProperty("jour") && errors.jour.length) > 0 ? true : false}
                                            onChange={this.handleChange.bind(this, "jour")}
                                        >

                                            {Array.from({ length: duree_experience }, (_, i) => i + 1).map((item, i) =>
                                                <MenuItem value={item} key={i}>Jour {item}</MenuItem>
                                            )}


                                        </Select>
                                        <FormHelperText>{(errors.hasOwnProperty("jour") && errors.jour.length > 0) ? this.renderul(errors["jour"]) : 'Choix du jour obligatoire'}</FormHelperText>
                                    </FormControl>

                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <TimePicker
                                            error={(errors.hasOwnProperty("debut") && errors.debut.length) > 0 ? true : false}
                                            fullWidth
                                            id="debut"
                                            defaultValue=""
                                            label="Heure de départ"
                                            value={fields["debut"]}
                                            onChange={(newValue) => { this.fieldhandleChange("debut", newValue) }}
                                            renderInput={(params) => <TextField
                                                error={(errors.hasOwnProperty("debut") && errors.debut.length) > 0 ? true : false}
                                                helperText={(errors.hasOwnProperty("debut") && errors.debut.length > 0) ? this.renderul(errors["debut"]) : 'Heure de depart (faites gaffe au parametre am et pm ) '}
                                                {...params} />}
                                        />
                                    </LocalizationProvider>
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
                                        value={fields["duree"]}
                                        onChange={this.handleChange.bind(this, "duree")}
                                    />

                                    <TextField
                                        id="resume"
                                        multiline
                                        minRows={2}
                                        label="Description etape"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        onChange={this.handleChange.bind(this, "resume")}
                                        value={fields["description"]}
                                    />

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
                                        getOptionLabel={(option) => option ? option.name : ""}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                label="Destination"
                                            />}
                                    />
                                    <Autocomplete
                                        disablePortal
                                        id="type_etape"
                                        variant="outlined"
                                        fullWidth
                                        value={value_type_etape}
                                        options={typesEtape}
                                        onChange={(event, newValue) => {
                                            this.setState({ value_type_etape: newValue });
                                            this.fieldhandleChange("type_etape", newValue && newValue.hasOwnProperty("id") ? newValue.id : "")
                                        }}
                                        inputValue={inputValue_type_etape}
                                        onInputChange={(event, newInputValue) => {
                                            this.setState({ inputValue_type_etape: newInputValue })
                                        }}
                                        getOptionLabel={(option) => option ? option.libelle : ""}
                                        renderInput={(params) =>
                                            <TextField {...params}
                                                label="Type étape"
                                            />}
                                    />
                                    <FileUpload
                                        multiFile={false}
                                        disabled={false}
                                        title="Image qui définit l'étape"
                                        header="[Drag to drop]"
                                        leftLabel="or"
                                        rightLabel="to select file"
                                        buttonLabel="click here"
                                        buttonRemoveLabel="Remove"
                                        maxFileSize={10}
                                        maxUploadFiles={0}
                                        errorSizeMessage={'fill it or move it to use the default error message'}
                                        allowedExtensions={['jpg', 'jpeg']}
                                        onFilesChange={() => console.log("dd")}
                                        onError={() => console.log("dd")}
                                        imageSrc={uploadIcon}
                                        bannerProps={{ elevation: 0, variant: "outlined" }}
                                        containerProps={{ elevation: 0, variant: "outlined" }}
                                    />

                                    <Button variant="outlined" color="secondary" startIcon={<SaveAsIcon />} onClick={this.handleValidation}
                                    >Valider</Button>


                                </Stack>
                            </Grid>
                            <Grid item xs={1} sm={1} md={2}  >
                                <CustomizedTimeline />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
            </Container>
        );

    }
}
export default AppAgentEditStepExperience;