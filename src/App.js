import React from 'react';
import './App.css';
import './resources/rpg-awesome/css/rpg-awesome.css';
import './resources/eva-icons/style/eva-icons.css';
import creaturesJSON from './data/monsters.json';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import onClickOutside from "react-onclickoutside";

let creatureList = creaturesJSON.creatures;

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
        <Link to={props.url} className={props.className}>
            {props.text}
        </Link>
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
                    <i className={"eva eva-arrow-ios-forward navbar-button"} id={"menu-button"} onClick={() => this.toggleSidebar()} />
                </div>
            )
        }
        return (
            <div className={"sidenav"} id={"sidenav-collapsed"}>
                <i className={"eva eva-arrow-ios-forward navbar-button"} id={"menu-button"} onClick={() => this.toggleSidebar()} />
            </div>
        )
    }
}

const SideNavClickable = onClickOutside(SideNav);

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
    /* Returns string for RPG-Awesome icon class for every creature type */
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
        this.state = {
            matching: [],
            notMatching: []
        }

        this.creatureSummary = this.props.creatureSummary;
    }

    render() {
        return (
            <div id={"creature-list-wrapper"}>
                <div id={"creature-list-search-module"} >
                    <input type="text" id="creatureSearch" onInput={() => this.search()} placeholder="Search..." /><br />
                    <label htmlFor={"creatureTypeFilter"}>Filter by type</label>
                    <select name="creatureTypes" id="creatureTypeFilter">
                        <option value="all">All</option>
                        <option value="humanoid">Humanoid</option>
                        <option value="ooze">Ooze</option>
                        <option value="undead">Undead</option>
                    </select>
                </div>
                <div id={"creature-list"}>
                    <div id={"matching-creature-list"}>
                        {this.state.matching}
                        </div>
                    <div id={"no-match-creature-list"}>
                        {this.state.notMatching}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.search();
    }

    search() {
        document.getElementById('creature-list').scrollTop = 0;
        let matchingList = []
        let notMatchingList = []
        let searchTerm = document.getElementById('creatureSearch').value

        this.creatureSummary.forEach(item=>{
            if (item.name.toLowerCase().match(searchTerm)) {
                matchingList.push( <Creature key={item.name} name={item.name} size={item.size} type={item.type} hit_points={item.hit_points} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature}/>)
            } else {
                notMatchingList.push( <Creature key={item.name} name={item.name} size={item.size} type={item.type} hit_points={item.hit_points} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature}/>)
            }
        })
        
        this.setState({matching: matchingList, notMatching: notMatchingList})
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
                    <AddedCreature key={key} id={key} name={value.name} size={value.size} type={value.type} hit_points={value.hit_points} challenge_rating={value.challenge_rating}
                                   removeCreature={this.removeCreature} moveCreatureUp={this.moveCreatureUp} moveCreatureDown={this.moveCreatureDown}/>
                );
                totalCR += parseInt(value.challenge_rating);
            }
        }
        return (
            <div id="encounter-wrapper">
                <EncounterCreaturesList addCreature={this.addCreature} creatureSummary={this.props.creatureSummary} />

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
        this.setState({creatures: this.state.creatures.set(id, toAddCreature)})
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
        let creatureBeforeId = -1
        let creatureBeforeValue = -1

        for (let [key, value] of this.state.creatures.entries()) {
            if (key === creatureToMoveId && tmpMap.size !== 0) {
                tmpMap.delete(creatureBeforeId)
                tmpMap.set(creatureToMoveId, this.state.creatures.get(creatureToMoveId))
                tmpMap.set(creatureBeforeId, creatureBeforeValue);
                continue
            }
            tmpMap.set(key, value)
             creatureBeforeId = key
             creatureBeforeValue = value
        }
        this.setState({creatures: tmpMap});

    }
    moveCreatureDown = (creatureToMoveId) => {
        let tmpMap= new Map();
        let foundCreatureToMove = false

        for (let [key, value] of this.state.creatures.entries()) {
            if (foundCreatureToMove) {
                tmpMap.set(key, value)
                tmpMap.set(creatureToMoveId, this.state.creatures.get(creatureToMoveId))
                foundCreatureToMove = false
                continue
            }
            if (key === creatureToMoveId) {
                foundCreatureToMove = true
                //target is the last element
                if (this.state.creatures.size === tmpMap.size + 1) {
                    tmpMap.set(key, value)
                }
                continue
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
        hit_points: props.hit_points,
        challenge_rating: props.challenge_rating
        }
    }

    click = () => {
        toAddCreature =
            {
                name: this.state.name,
                size: this.state.size,
                type: this.state.type,
                hit_points: this.state.hit_points,
                challenge_rating: this.state.challenge_rating
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
                    <span>CR: {this.state.challenge_rating}</span>
                    <span>HP: {this.state.hit_points}</span>
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
        this.index = props.index
        this.size = props.size
        this.type = props.type
        this.hit_points = props.hit_points
        this.challenge_rating = props.challenge_rating
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
                        <b>CR {this.challenge_rating}</b> - <i>{this.size} {this.type}</i>
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
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <Router>
                <div className="App-body" id="encounter-body">
                    <Encounter creatureSummary={this.props.creatureSummary} />
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

        this.creatureSummary = []

        for (let item of creatureList) {
            let tmpCreature = {
                name: item.name,
                size: item.size,
                type: item.type,
                hit_points: item.hit_points,
                challenge_rating: item.challenge_rating
            }

            this.creatureSummary.push(tmpCreature)
        }
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
                            <EncounterBuilder creatureSummary={this.creatureSummary} />
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
