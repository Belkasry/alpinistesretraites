import React, { Component } from "react";
import axios from "axios/index";
import { FormControlLabel, Stack, Switch, Typography } from '@mui/material';
import { messageService } from "../../../_services/AlertToast";
class SwitchState extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: this.props.etat,
        }
    }

    async switchetat(etatinitial) {
        let self = this;
        this.setState({ active: !etatinitial });
        const experience = { "etat": !etatinitial };
        const headers = {
            'Content-Type': 'application/json'
        };
        axios.put('/rest/experiences/' + this.props.id, experience, { headers })
            .then(response => this.setState({ active: !etatinitial })).then(
                messageService.sendMessage(this.props.id + " " + (!etatinitial ? 'ACTIVE' : 'DESACTIVE'), (!etatinitial ? 'info' : 'warning'))
            );
    }

    render() {

        const { active } = this.state;
        return (
            <FormControlLabel
                control={
                    <Switch
                        onChange={() => {
                            this.switchetat(active)
                        }}
                        checked={active}
                        inputProps={{ 'aria-label': 'controlled' }}
                    />
                }
                labelPlacement="end"
            />
        )
    }
}


export default SwitchState