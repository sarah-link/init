import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function NavBar() {
    return(
        <header className={"app-navbar"} >
            <div>
                <SideNav />
                <Button text={"HOME"} className={"navbar-button"} url={"/"} />
            </div>
            <div>
                <Button text={"Log\u00a0In"} className={"navbar-button"} url={"login"} />
                <Button text={"Sign\u00a0Up"} className={"navbar-button"} url={"signup"} />
            </div>

        </header>
    )
}

function MainButtons() {
    return (
        <MainButtonDiv />
    )
}

function Button(props) {
    return(
        // <button className={props.className} onClick={props.onClick}>
        //     {props.text}
        // </button>

        <Link to={props.url} className={props.className}>
            {props.text}
        </Link>
    )
}

function IconButton(props) {
    return (
            <svg id="menu-button" width="40" height="40" viewBox="0 0 20 20" onClick={props.onClick}
                 xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
                      clipRule="evenodd"/>
            </svg>
    )
}

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false}
    }
    toggleSidebar() {
        this.setState({isOpen: !this.state.isOpen})
    }
    render() {
        if (this.state.isOpen === true) {
            return (
                <div className={"sidenav"} id={"sidenav-expanded"}>
                    <IconButton className={"navbar-button"} onClick={() => this.toggleSidebar()} />
                </div>
            )
        }
        return (
            <div className={"sidenav"} id={"sidenav-collapsed"}>
                <IconButton className={"navbar-button"} onClick={() => this.toggleSidebar()} />
            </div>
        )
    }
}

class MainButtonDiv extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: true}
    }

    render() {
        return (
            <div id={"menuButtons"} >
                <Button text={"Create Encounter"} className={"main-button"} url={"/builder"} />
                <Button text={"Manage Library"} className={"main-button"} url={"/library"} />
                <Button text={"Join Encounter"} className={"main-button"} url={"/join"} />
            </div>

        )
    }
}

class EncounterCreatures extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div id={"creature-list"}>
                <Creature name={"Goblin"} />
                <Creature name={"Goblin Boss"} />
                <Creature name={"Young Red Dragon"} />
                <Creature name={"Gnoll"} />
                <Creature name={"Orc"} />
                <Creature name={"Gelatinous Cube"} />
                <Creature name={"Black Pudding"} />
                <Creature name={"Ochre Jelly"} />
                <Creature name={"Yuan-ti"} />
                <Creature name={"Yuan-ti Pureblood"} />
                <Creature name={"Beholder"} />
                <Creature name={"Mindflayer"} />
                <Creature name={"Elf Battlemaster"} />
                <Creature name={"Very Large Bird"} />
                <Creature name={"Very Small Bird"} />
                <Creature name={"Normal Bird"} />
                <Creature name={"Dwarf Pikeman"} />
                <Creature name={"Dwarf Archer"} />
                <Creature name={"Human Soldier"} />
                <Creature name={"Human Wizard"} />
                <Creature name={"Young Green Dragon"} />
                <Creature name={"Adult Green Dragon"} />
                <Creature name={"Ancient Green Dragon"} />
            </div>
        )
    }
}

//will need to replace this with actual data
function Creature(props) {
    return <li class={"creature"}> {props.name}</li>;
}

function Home(props) {
    return (
        <div className="App-body" id="home-body">
            <div className="App-header">
                <h1>
                    <b>Roll Initiative!</b>
                </h1>

                <h4>
                    A better way to roll initiative or something idk
                </h4>
            </div>

            <MainButtons />
        </div>
    )
}

class EncounterBuilder extends React.Component {
    render() {
        return(
            <Router>
                <EncounterCreatures />

                <div className="App-body" id="encounter-body">
                    <h1>
                        Add Creatures to Encounter
                    </h1>
                </div>
            </Router>
        )
    }
}

function App() {
    return (
        <Router>
            <div className="App">
            <NavBar />

                <Switch>    {/* overlays and popups} */}
                    <Route path="/login">
                    
                    </Route>
                    <Route path="/signup">
                
                    </Route>
                </Switch>

                <Switch>    {/* main content */}
                    <Route path="/builder">
                        <EncounterBuilder />
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

export default App;
