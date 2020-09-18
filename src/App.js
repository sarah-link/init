import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import onClickOutside from "react-onclickoutside";

function NavBar() {
    return(
        <header className={"app-navbar"} >
            <div>
                <SideNavClickable />
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
    handleClickOutside = () => {
        this.setState({isOpen: false})
    };
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

var SideNavClickable = onClickOutside(SideNav);

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

class EncounterCreaturesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let itemList=[];
        creatureList.forEach((item,index)=>{
            itemList.push( <Creature name={item.name} desc={item.desc} HP={item.HP} CR={item.CR} addCreature={this.props.addCreature}/>)
        })
        return (
            <div id={"creature-list"}>
                {itemList}
            </div>
        )
    }
}

let toAddCreature = '';
let id = 0;
let creatureToRemoveId = "default";

class Encounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creatures: new Map()
        };

    }

    render() {
        let addedCreatures = [];
        if (this.state.creatures.size >= 0) {
            for (let [key, value] of this.state.creatures.entries()) {
                addedCreatures.push(
                    <AddedCreature key={key} id={key} name={value.name} desc={value.desc} HP={value.HP} CR={value.CR} removeCreature={this.removeCreature}/>
                );
            };
        }

        return(
            <div id="encounter-wrapper">
                <EncounterCreaturesList addCreature={this.addCreature}/>

                <div id="encounter-list">
                    <h1>
                        Add Creatures to Encounter
                    </h1>

                    <div id={"added-creatures"}>
                        {addedCreatures}
                        <div className={"added-creature"}>
                            <div id={"creature-add-btn"}>+</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    addCreature = () => {
        this.setState({creatures: this.state.creatures.set(id, toAddCreature)});
        console.log(this.state.creatures);
        id++;
    };

    removeCreature = (creatureToRemoveId) => {
        let tmpCreatures = this.state.creatures;
        tmpCreatures.delete(creatureToRemoveId);
        this.setState({creatures: tmpCreatures});
    }
}

//will need to replace this with actual data
class Creature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        name: props.name,
        desc: props.desc,
        HP: props.HP,
        CR: props.CR
        }
    }

    click = () => {
        toAddCreature =
            {
                name: this.state.name,
                desc: this.state.desc,
                HP: this.state.HP,
                CR: this.state.CR
            }
        this.props.addCreature();
    }

    render() {
        return (
            <div className={"creature"} onClick={this.click}>
                <div className={"creature-name"}>
                    <h4>{this.state.name}</h4>
                    {this.state.desc}
                </div>

                <div className={"creature-info"}>
                    <span>CR: {this.state.CR}</span>
                    <span>HP: {this.state.HP}</span>
                </div>
            </div>
        );
    }

}

class AddedCreature extends React.Component {
    constructor(props) {
        super(props);
        this.id = props.id
        this.name = props.name
        this.desc = props.desc
        this.HP = props.HP
        this.CR = props.CR
    }

    click = () => {
        creatureToRemoveId = this.id;
        this.props.removeCreature(this.id);
    }

    render() {
        return (
            <div className={"added-creature"}>
                <span>
                    <div className={"bubble"}> {this.CR} </div>
                    <div className={"creature-name"}>
                        <h4>{this.name}</h4>
                        {this.desc}&nbsp;
                    </div>
                </span>
                <button onClick={this.click}>x</button>
            </div>
        );
    }
}

class EncounterBuilder extends React.Component {
    render() {
        return(
            <Router>
                <div className="App-body" id="encounter-body">
                    <Encounter />
                </div>
            </Router>
        )
    }
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
}

//figure out how to move this into its own file later
let creatureList =
    [
        {
            "name": "Goblin",
            "desc": "small goblinoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Goblin Boss",
            "desc": "small goblinoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Young Red Dragon",
            "desc": "small goblinoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Young Red Dragon",
            "desc": "small goblinoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Gnoll",
            "desc": "small goblinoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Orc",
            "desc": "small goblinoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Gelatinous Cube",
            "desc": "small goblinoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Black Pudding",
            "desc": "small goblinoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Ochre Jelly",
            "desc": "small goblinoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Very Small Bird",
            "desc": "small bird",
            "HP": "5",
            "CR": "1"
        }
    ]


export default App;
