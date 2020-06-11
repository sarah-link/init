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

function Encouter() {
    return (
        <EncounterDiv />
    )
}

function IconButton(props) {
    return (
            <svg id="menu-button" width="40" height="40" viewBox="0 0 20 20" onClick={props.onClick}
                 xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd"
                      d="M6.646 3.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L12.293 10 6.646 4.354a.5.5 0 010-.708z"
                      clip-rule="evenodd"/>
            </svg>
    )
}

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false}
    }
    toggleSidebar() {
        console.log("hek")
        if (this.state.isOpen == true) {
            document.getElementById("mySidenav").style.left = "0px";
            document.getElementById("mySidenav").style.boxShadow = "0px 0px 50px rgba(0,0,0,0.5)";
            document.getElementById("menu-button").style.left = "405px";
            document.getElementById("menu-button").style.fill = "#EFFCF6";
            document.getElementById("menu-button").style.transform = "rotate(180deg)";
        } else {
            document.getElementById("mySidenav").style.left = "-450px";
            document.getElementById("mySidenav").style.boxShadow = "0px 0px 20px rgba(0,0,0,0)";
            document.getElementById("menu-button").style.left = "5px";
            document.getElementById("menu-button").style.fill = "#147D64";
            document.getElementById("menu-button").style.transform = "rotate(0deg)";
        }
        this.setState({isOpen: !this.state.isOpen})
    }
    render() {
        return (
            <div id={"mySidenav"}>
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
    startEncounter() {
        ReactDOM.unmountComponentAtNode(document.getElementById('menuButtons'));
        ReactDOM.render(<EncounterDiv />, document.getElementById('body'))
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

class EncounterDiv extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                < EncounterCreatures />
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
                <Creature name={"Dragon"} />
                <Creature name={"Elf"} />
                <Creature name={"Very Large Bird"} />
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
        <div className="App-body" id="body">
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

function App() {
    return (
        <Router>
            <div className="App">
            <NavBar />

                <Switch>
                    <Route path="/builder">

                    </Route>
                    <Route path="/library">
                
                    </Route>
                    <Route path="/join">
                
                    </Route>
                    <Route path="/login">
                
                    </Route>
                    <Route path="/signup">
                
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>

            </div>
        </Router>
    );
}

export default App;
