import React, { Component } from "react";
import {
    Alert, Autocomplete, Box, Button, Card, Chip, Grid, IconButton,
    InputAdornment, List, ListItem, ListItemText, Paper, Rating, Snackbar,
    Stack, TextField, Typography, FormControl, InputLabel, OutlinedInput, Container, Divider, Input, FormHelperText, Select, MenuItem
} from '@mui/material';
import CustomizedBreadcrumbs from './Breadcrumbs';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import SaveIcon from '@mui/icons-material/Save';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CustomizedTimeline from "./Composants/CustomizedTimeline";
import FileUpload from "react-mui-fileuploader"
import uploadIcon from '../../img/upload.png'
import frLocale from 'date-fns/locale/fr';
import axios from "axios";



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
            destinations: [],
            typesEtape: [],
            duree_experience: 2,
            date_finish_experience: new Date(),
            date_start_experience: new Date(),
            media: {},
            images: [],
            test: 1,
            id_step: null
        }
        this.handleValidation = this.handleValidation.bind(this);
        this.onUploadtest = this.onUploadtest.bind(this);
        this.loadForm = this.loadForm.bind(this);
        this.loadExperience = this.loadExperience.bind(this);
    }


    componentDidMount() {
        this.loadDestination();
        this.loadTypeEtape();
        this.loadExperience();


    }
    async loadExperience() {
        const options = { method: 'GET', url: '/rest/experiences/' + this.props.match.params.id + "?groups=read_date" };
        let self = this;
        await axios.request(options).then(
            function (response) {
                var result = response.data;
                self.setState({
                    duree_experience: result["duree"],
                    date_finish_experience: result["start"],
                    date_start_experience: result["finish"],
                })
            }
        ).catch(function (error) {
            console.log(error);
        });
        ;
    }

    loadForm(id_step) {

        const options = { method: 'GET', url: '/api/step_experiences/' + id_step };
        let self = this;
        axios.request(options).then(function (response) {
            let step = response.data;
            self.setState({
                fields: step,
                id_step: id_step
            });
        }).catch(function (error) {
            console.log(error);
        });
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
                value_destination: destinations[0],
            });
        } finally {
        }

    };

    loadTypeEtape = async () => {
        try {
            let token = "";
            const instance = axios.create({
                baseURL: `https://127.0.0.1:8000/`,
                headers: { 'Authorization': 'Bearer ' + token }
            });
            let response = null;

            response = await instance.get(
                `api/valeur_referentiels?id_ref.id=2`
            );

            const typesEtape = response.data["hydra:member"];
            this.setState({
                typesEtape: typesEtape,
                value_type_etape: typesEtape[0],
            });
        } finally {
        }

    };

    async onUploadtest() {

        let index = 0;
        let images = this.state.images;
        if (images.length <= 0)
            return;

        let data_url = images[index].path;
        const form = new FormData();
        form.append("base64Image", data_url);
        form.append("experience", "/api/experiences/" + this.props.match.params.id);
        form.append("name", images[index].name);
        let self = this;
        try {
            await axios.post('/api/media', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
                }
            }).then(function (response) {
                console.log(response.data);
                self.setState({ media: response.data });
            }).catch(function (error) {
                console.log(error);
            })
        }
        finally {
        };
    }

    render() {
        const { errors, fields, titre, destinations, type_etape, value_type_etape, date_finish_experience, date_start_experience, images, media,
            value_destination, inputValue_destination, inputValue_type_etape, editorState, typesEtape, duree_experience, test } = this.state;
        const id_exp = this.props.match.params.id;




        return (
            <Container maxWidth="lg" p={2} >
                <Paper sx={{
                    p: 2, m: 2
                }} elevation={2}>
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
                }} elevation={2}>
                    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 4, md: 12 }}>
                        <Grid item xs={4} sm={4} md={4} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    disabled
                                    id="start"
                                    label="Date de debut"
                                    value={date_start_experience}
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
                                    label="Date de fin"
                                    value={date_finish_experience}
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
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Jour</InputAdornment>,
                                }}
                                variant="outlined"
                                value={duree_experience}
                                onChange={this.handleChange.bind(this, "duree")}
                                error={(errors.hasOwnProperty("duree") && errors.duree.length) > 0 ? true : false}
                                helperText={(errors.hasOwnProperty("duree") && errors.duree.length > 0) ? this.renderul(errors["duree"]) : ''}
                            />
                        </Grid>
                    </Grid>
                </Paper>
                <Paper sx={{
                    p: 2, m: 2, backgroundColor: "#fcfcfa"
                }} elevation={2}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 1, sm: 1, md: 3 }}>

                            <Grid item xs={1} sm={1} md={1} >
                                <Stack
                                    direction="column"
                                    spacing={2}
                                >
                                    <TextField
                                        id="title"
                                        multiline
                                        maxRows={3}
                                        autoFocus
                                        label="Titre Experience"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        onChange={this.handleChange.bind(this, "title")}
                                        value={fields["title"] || ""}
                                        error={(errors.hasOwnProperty("title") && errors.title.length) > 0 ? true : false}
                                        helperText={(errors.hasOwnProperty("title") && errors.title.length > 0) ? this.renderul(errors["title"]) : 'Champ obligatoire'}
                                    />
                                    <FormControl >
                                        <InputLabel id="demo-simple-select-helper-label">Jour</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={fields["jour"] || 1}
                                            label="Age"
                                            error={(errors.hasOwnProperty("jour") && errors.jour.length) > 0 ? true : false}
                                            onChange={this.handleChange.bind(this, "jour")}
                                        >
                                            {Array.from({ length: duree_experience }, (_, i) => i + 1).map((item, i) =>
                                                <MenuItem value={item} key={i} >Jour {item}</MenuItem>
                                            )}
                                        </Select>
                                        <FormHelperText>{(errors.hasOwnProperty("jour") && errors.jour.length > 0) ? this.renderul(errors["jour"]) : 'Choix du jour obligatoire'}</FormHelperText>
                                    </FormControl>

                                    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                                        <TimePicker
                                            fullWidth
                                            id="debut"
                                            label="Heure de départ"
                                            value={fields["debut"] || ""}
                                            onChange={(newValue) => { this.fieldhandleChange("debut", newValue) }}
                                            renderInput={(params) => <TextField
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
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">Heure</InputAdornment>,
                                        }}
                                        variant="outlined"
                                        value={fields["duree"] ? parseInt(fields["duree"]) : ''}
                                        onChange={(newValue) => { this.fieldhandleChange("duree", parseInt(newValue.target.value)) }}
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
                                        value={fields["resume"] || ""}
                                    />

                                    <Autocomplete
                                        disablePortal
                                        id="destination"
                                        variant="outlined"
                                        fullWidth
                                        value={fields["destination"] || {}}
                                        options={destinations}
                                        onChange={(event, newValue) => {
                                            this.fieldhandleChange("destination", newValue)
                                        }}
                                        isOptionEqualToValue={(option, value) => option.id === value.id}
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
                                        value={fields["type_etape"] || {}}
                                        options={typesEtape}
                                        onChange={(event, newValue) => {
                                            this.fieldhandleChange("type_etape", newValue)
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
                                        header="Drag to drop"
                                        leftLabel="or"
                                        buttonLabel="click here"
                                        rightLabel=""
                                        buttonRemoveLabel="Remove"
                                        maxUploadFiles={1}
                                        errorSizeMessage={'Erreur lors de l import'}
                                        allowedExtensions={['jpg', 'jpeg', 'png']}
                                        onFilesChange={(files) => this.setState({ images: files })}
                                        onError={() => console.log("error")}
                                        imageSrc={uploadIcon}
                                        bannerProps={{ elevation: 0, variant: "outlined" }}
                                        containerProps={{ elevation: 0, variant: "outlined" }}
                                    />

                                    <Button variant="outlined" color="info" startIcon={<SaveAsIcon />} onClick={this.loadForm}
                                    >Valider</Button>


                                </Stack>
                            </Grid>
                            <Grid item xs={1} sm={1} md={2}  >
                                <CustomizedTimeline experience={this.props.match.params.id} update={false} onEditStep={(id_step) => {
                                    this.loadForm(id_step)
                                }}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </Paper>
                <p>{JSON.stringify(fields)}</p>
                <p>{JSON.stringify(errors)}</p>
            </Container>
        );

    }
}
export default AppAgentEditStepExperience;