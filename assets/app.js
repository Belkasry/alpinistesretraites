import ReactDOM from 'react-dom';
import './App.css';
import './css/bootstrap.min.css';
import './css/couche-bootstrap.css';
import Guide from "./components/Guide";
import NavBar from "./components/partials/NavBar";
import axios from 'axios';
import {Guides} from "./components/Guides";
import Footer from "./components/partials/Footer";
import NavSearch from "./components/NavSearch";
import React, {useState, useContext} from "react";
import SearchContext from "./SearchContext";


function App() {

    const [search, setSearch] = useState("");
    const [count, setCount] = useState(0); //test

    const contextValue = {
        search,
        updateSearch: setSearch,
    };

    return (

        <SearchContext.Provider value={contextValue}>
        <div className="App HolyGrail">
        <header className=""><NavBar page="guide"/>
        <h1 className="mt-2 mb-2 text-alpiniste">Liste des Guides </h1>
    </header>
    <div className="HolyGrail-body bg-light">
        <main className="HolyGrail-content ">

        <Guides searchValue={search} count={count} onChangeCount={(newCount)=>{setCount(newCount)}}/>
    </main>
    <nav className="HolyGrail-nav "><NavSearch/></nav>
        <aside className="HolyGrail-ads ">
        <h2><span className="badge border-cute text-dark">{count}</span></h2>
    </aside>
    </div>
    <footer><Footer/></footer>
    </div>
    </SearchContext.Provider>

);
}

ReactDOM.render(
<React.StrictMode>
<App />
</React.StrictMode>,
document.getElementById('root'));
