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
import GuideProfil from "./components/GuideProfil";
import Cookies from 'universal-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
// import Auth from "./components/Auth";


function AppGuides() {

    const cookies = new Cookies();
    cookies.set('myCat', 'Pacman', { path: '/' });
    const [search, setSearch] = useState("");
    const [count, setCount] = useState(0); //test
    const contextValue = {
        search,
        updateSearch: setSearch,
    };

    return (

        <Router>
            <SearchContext.Provider value={contextValue}>
                <div className="App HolyGrail">
                    <header className=""><NavBar page="guide"/>
                        <Route path="/accompagnateur/list">
                            <h1 className="mt-2 mb-2 text-alpiniste border-sketchy-2 bg-light">Liste des Guides</h1>
                        </Route>
                    </header>
                    <div className="HolyGrail-body">
                            <Switch>
                                <Route path="/accompagnateur/auth">
                                    <div className="m-auto">
                                    <main className="bg-light p-3 border-alpiniste border-sketchy " style={{marginLeft:"20vh"}}>
                                    <div/>
                                    </main>
                                    </div>
                                </Route>
                                <Route path="/accompagnateur/list">
                                    <main className="HolyGrail-content bg-light p-3 border-alpiniste border-sketchy ">
                                    <Guides searchValue={search} count={count} onChangeCount={(newCount) => {
                                        setCount(newCount)
                                    }}/>
                                    </main>
                                </Route>
                                <Route path="/accompagnateur/profil/:id">
                                    <main className="HolyGrail-content  ">
                                    <GuideProfil/>
                                    </main>
                                </Route>
                            </Switch>

                        <Switch>
                            <Route path="/accompagnateur/list">
                                <nav className="HolyGrail-nav "><NavSearch/></nav>
                            </Route>
                            <Route path="/accompagnateur/profil">
                                <div className=" border-light bg-transparent border-transparent HolyGrail-nav">

                                </div>
                            </Route>
                        </Switch>
                        <aside className="HolyGrail-ads ">
                            <Route path="/accompagnateur/list">
                                <h2><span className="badge border-cute text-dark border-alpiniste-1 bg-light">{count}</span></h2>
                            </Route>
                        </aside>
                    </div>
                    <footer><Footer/></footer>
                </div>
            </SearchContext.Provider>
        </Router>

    );
}

export default AppGuides 
