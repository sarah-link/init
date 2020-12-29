import React, { Fragment, useState, useEffect} from 'react';
import './App.css';
import './resources/rpg-awesome/css/rpg-awesome.css';
import './resources/eva-icons/style/eva-icons.css';
import creaturesJSON from './data/monsters.json';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import NavBar from "./modules/NavBar";
import EncounterBuilder from "./modules/EncounterBuilder";
import Home from "./modules/Home";

let creatureList = creaturesJSON.creatures;

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {

    }

    render() {
        return (
            <Router>
                <div className="App" onClick={this.handleClick}>
                <NavBar />

                    <Switch>    {/* overlays and popups */}
                        <Route path="/login">
                        </Route>

                        <Route path="/signup">
                        </Route>
                    </Switch>

                    <Switch>    {/* main content */}
                        <Route path="/builder">
                            <EncounterBuilder/>
                        </Route>

                        <Route path="/manager">
                        </Route>

                        <Route path="/library">
                        </Route>

                        <Route path="/join">

                        </Route>

                        <Route exact path="/">
                            <Home />
                        </Route>
                    </Switch>

                </div>
            </Router>
        );
    }
}

export default App;
