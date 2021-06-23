import React, {useState, useContext, useCallback} from "react";
import logo from '../img/alpinistesretraites.png'
import {faMapMarkerAlt, faSignature} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchContext from "../SearchContext";
import {throttle} from "lodash";


function NavSearch(props) {

    const {search, updateSearch} = useContext(SearchContext);

    const changeValue = (value, field) => {

        return {
            'value': value,
            'field': field

        }
    };
    const handleChange = event => {
        // const value =changeValue("sarah", "all");
        const value = changeValue(event.target.value, event.target.dataset.field);
        if (value) {
            updateSearch(value);
        }
    };
    const throttled = useCallback(throttle(handleChange, 1000), []);


    return (
        <form className="p-2 card border-alpiniste-1" id="searchForm">
            <input className="form-control my-2 border-alpiniste-1" type="text" placeholder="Search" defaultValue={search.value}
                   onChange={throttled} data-field="all" name="all"/>
            <input className="form-control my-2 border-alpiniste-1" type="text" placeholder="par Nom"
                   onChange={throttled} data-field="fullName" name="fullName"/>
        </form>
    );
}

export default NavSearch;