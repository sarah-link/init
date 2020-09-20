import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import './resources/rpg-awesome/css/rpg-awesome.css';
import './resources/eva-icons/style/eva-icons.css';
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

function getCreatureIcon(creatureType) {
    switch (creatureType) {
        case "aberration":
            return "ra ra-octopus";
        case "beast":
            return "ra ra-pawprint";
        case "celestial":
            return "ra ra-angel-wings";
        case "construct":
            return "ra ra-reactor";
        case "dragon":
            return "ra ra-wyvern";
        case "elemental":
            return "ra ra-fire";
        case "fey":
            return "ra ra-fairy";
        case "fiend":
            return "ra ra-batwings";
        case "giant":
            return "ra ra-muscle-fat";
        case "humanoid":
            return "ra ra-archer";
        case "monstrosity":
            return "ra ra-beetle";
        case "ooze":
            return "ra ra-ice-cube";
        case "plant":
            return "ra ra-flower";
        case "undead":
            return "ra ra-desert-skull";
        default:
            return "ra ra-dinosaur";
    }
}

class EncounterCreaturesList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let itemList=[];
        creatureList.forEach((item,index)=>{
            itemList.push( <Creature name={item.name} size={item.size} type={item.type} HP={item.HP} CR={item.CR} addCreature={this.props.addCreature}/>)
        })
        return (
            <div id={"creature-list"}>
                {itemList}
            </div>
        )
    }

    search() {
        //sort the array for the search
    }
}

let toAddCreature = '';
let id = 0;

class Encounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creatures: new Map()
        };

    }

    render() {
        let addedCreatures = [];
        let totalCR = 0;
        if (this.state.creatures.size >= 0) {
            for (let [key, value] of this.state.creatures.entries()) {
                addedCreatures.push(
                    <AddedCreature key={key} id={key} name={value.name} size={value.size} type={value.type} HP={value.HP} CR={value.CR}
                                   removeCreature={this.removeCreature} moveCreatureUp={this.moveCreatureUp} moveCreatureDown={this.moveCreatureDown}/>
                );
                totalCR += parseInt(value.CR);
            }
        }

        return (
            <div id="encounter-wrapper">
                <EncounterCreaturesList addCreature={this.addCreature}/>

                <div id="encounter-list">
                    <h1>
                        Add Creatures to Encounter
                    </h1>

                    Encounter CR : {totalCR}
                    <div id={"added-creatures"}>
                        {addedCreatures}
                        <div className={"added-creature"}>
                            <div id={"creature-add-btn"}>+</div>
                        </div>
                    </div>
                    <div>
                        <button onClick={this.removeAllCreatures}>Remove All</button>
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

    removeAllCreatures = () => {
        let tmpCreatures = new Map();
        this.setState({creatures: tmpCreatures});
    }

    moveCreatureUp = (creatureToMoveId) => {
        let tmpMap= new Map();
        //doesn't work if there's not at least 2 creatures
        if (this.state.creatures.size <= 1) {
            return;
        }
        let creatureBeforeId = -1
        let creatureBeforeValue = -1
        for (let [key, value] of this.state.creatures.entries()) {
             if (key === creatureToMoveId) {
                 break
             }
             creatureBeforeId = key
             creatureBeforeValue = value
        }
        //already top of list
        if (creatureBeforeId === -1) {
            return;
        }

        for (let [key, value] of this.state.creatures.entries()) {
            if (key === creatureBeforeId) {
                tmpMap.set(creatureToMoveId, this.state.creatures.get(creatureToMoveId))
            }
                tmpMap.set(key, value)
        }
        this.setState({creatures: tmpMap});

    }
    moveCreatureDown = (creatureToMoveId) => {
        let tmpMap= new Map();
        //doesn't work if there's not at least 2 creatures
        if (this.state.creatures.size <= 1) {
            return;
        }
        let creatureAfterId = -1
        let creatureAfterValue = -1
        let foundCreatureToMove = false

        for (let [key, value] of this.state.creatures.entries()) {
            //found target creature on the last iteration
            if (foundCreatureToMove) {
                creatureAfterId = key
                creatureAfterValue = value
                break
            }
            //on target creature
            if (key === creatureToMoveId) {
                foundCreatureToMove = true
            }
        }

        //already last element
        if (creatureAfterId === -1) {
            return
        }

        for (let [key, value] of this.state.creatures.entries()) {
            if (key === creatureToMoveId) {
                continue
            }
            if (key === creatureAfterId) {
                tmpMap.set(creatureAfterId, creatureAfterValue)
                tmpMap.set(creatureToMoveId, this.state.creatures.get(creatureToMoveId))
            }
            tmpMap.set(key, value)
        }
        this.setState({creatures: tmpMap});

    }
}


class Creature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        name: props.name,
        size: props.size,
        type: props.type,
        HP: props.HP,
        CR: props.CR
        }
    }

    click = () => {
        toAddCreature =
            {
                name: this.state.name,
                size: this.state.size,
                type: this.state.type,
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
                    <i>{this.state.size} {this.state.type}</i>
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
        this.size = props.size
        this.type = props.type
        this.HP = props.HP
        this.CR = props.CR
    }

    remove = () => {
        this.props.removeCreature(this.id);
    }

    moveUp = () => {
        this.props.moveCreatureUp(this.id);
    }

    moveDown = () => {
        this.props.moveCreatureDown(this.id);
    }



    render() {
        return (
            <div className={"added-creature"}>
                <span>
                    <div className={"bubble"}><i className={getCreatureIcon(this.type)} /></div>
                    <div className={"creature-name"}>
                        <h4>{this.name}&nbsp;{this.id}</h4>
                        <b>CR {this.CR}</b> - <i>{this.size} {this.type}</i>
                    </div>
                    <div className={"creature-icon-buttons"}>
                        <i className={"eva eva-chevron-up-outline"} onClick={this.moveUp} />
                        <i className={"eva eva-chevron-down-outline"} onClick={this.moveDown} />
                    </div>
                </span>
                <i className={"eva eva-close-outline delete-button"} onClick={this.remove} />
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
            "size": "medium",
            "type": "humanoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Goblin Boss",
            "size": "medium",
            "type": "humanoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Young Red Dragon",
            "size": "large",
            "type": "dragon",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Young Green Dragon",
            "size": "large",
            "type": "dragon",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Gnoll",
            "size": "medium",
            "type": "humanoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Orc",
            "size": "medium",
            "type": "humanoid",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Gelatinous Cube",
            "size": "large",
            "type": "ooze",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Black Pudding",
            "size": "medium",
            "type": "ooze",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Ochre Jelly",
            "size": "medium",
            "type": "ooze",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Very Small Bird",
            "size": "tiny",
            "type": "beast",
            "HP": "5",
            "CR": "100"
        },
        {
            "name": "Zombie",
            "size": "medium",
            "type": "undead",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Myconid",
            "size": "medium",
            "type": "plant",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Hill Giant",
            "size": "large",
            "type": "giant",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Angel",
            "size": "medium",
            "type": "celestial",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Devil",
            "size": "medium",
            "type": "fiend",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Tarrasque",
            "size": "gargantuan",
            "type": "monstrosity",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Iron Golem",
            "size": "large",
            "type": "construct",
            "HP": "5",
            "CR": "1"
        },
        {
            "name": "Mind Flayer",
            "size": "medium",
            "type": "aberration",
            "HP": "5",
            "CR": "1"
        }

    ]


export default App;
