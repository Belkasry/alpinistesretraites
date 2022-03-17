import './App.css';
import './css/bootstrap.min.css';
import './css/couche-bootstrap.css';
// import Experience from "./components/Experience";
import NavBar from "./components/partials/NavBar";
import axios from 'axios';
import {Experiences} from "./components/Experience/Experiences";
import Footer from "./components/partials/Footer";
import NavSearch from "./components/NavSearch";
import React, {useState, useContext} from "react";
import SearchContext from "./SearchContext";
// import ExperienceProfil from "./components/ExperienceProfil";
import Cookies from 'universal-cookie';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Auth from "./components/Auth";
import ExperienceProfil from './components/Experience/ExperienceProfil';


function AppExperiences() {

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
                    <header className=""><NavBar page="experience"/>
                        <Route path="/experience/list">
                            <h1 className="mt-2 mb-2 text-alpiniste border-sketchy-2 bg-light">Liste des Experiences</h1>
                        </Route>
                    </header>
                    <div className="HolyGrail-body">
                            <Switch>
                                <Route path="/experience/auth">
                                    <div className="m-auto">
                                    <main className="bg-light p-3 border-alpiniste border-sketchy " style={{marginLeft:"20vh"}}>
                                    <Auth/>
                                    </main>
                                    </div>
                                </Route>
                                <Route path="/experience/list">
                                    <main className="HolyGrail-content bg-light p-3 border-alpiniste border-sketchy ">
                                    <Experiences searchValue={search} count={count} onChangeCount={(newCount) => {
                                        setCount(newCount)
                                    }}/>
                                    </main>
                                </Route>

                                <Route path="/experience/profil/:id">
                                    <main className="HolyGrail-content  ">
                                     <ExperienceProfil/> 
                                    </main>
                                </Route>
                            </Switch>

                        <Switch>
                            <Route path="/experience/list">
                                <nav className="HolyGrail-nav "><NavSearch/></nav>
                            </Route>
                            <Route path="/experience/profil">
                                <div className=" border-light bg-transparent border-transparent HolyGrail-nav">

                                </div>
                            </Route>
                        </Switch>
                        <aside className="HolyGrail-ads ">
                            <Route path="/experience/list">
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

export default AppExperiences 
