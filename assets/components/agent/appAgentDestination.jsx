import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import React, { Component } from "react";

class AppAgentDestination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            position: [33.8730, 5.5407]
        }
    }



    componentDidMount() { }

    render() {
        const { position } = this.state;
        return <div>
            <MapContainer center={[33.8730, 5.5407]} zoom={12} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[33.8730, 5.5407]}>
                </Marker>
            </MapContainer>

        </div>
    }
}

export default AppAgentDestination;