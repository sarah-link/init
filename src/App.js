import React, { Fragment, useState, useEffect} from 'react';
import './App.css';
import './resources/rpg-awesome/css/rpg-awesome.css';
import './resources/eva-icons/style/eva-icons.css';
import creaturesJSON from './data/monsters.json';
// import encounterCreaturesJSON from './data/defaultEncounterCreatures.json';
import Modal from 'react-bootstrap/Modal';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import onClickOutside from "react-onclickoutside";

let creatureList = creaturesJSON.creatures;
// let encounterCreatureList = encounterCreaturesJSON.creatures;

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
        let collapseID = ''
        if (this.state.isOpen === true) {
            collapseID = "sidenav-expanded"
        } else {
            collapseID = "sidenav-collapsed"
        }

        return (
            <div className={"sidenav"} id={collapseID}>
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
                <Button text={"View Saved Encounters"} className={"main-button"} url={"/manager"} />
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

function parseCR(CR) {
    switch (CR) {
        case "1/8":
            return 0.125;
        case "1/4":
            return 0.25;
        case "1/2":
            return 0.5;
        default:
            return parseInt(CR);
    }
}

function displayCR(CR) {
    switch (CR) {
        case "1/8":
            return "⅛";
        case "1/4":
            return "¼";
        case "1/2":
            return "½";
        default:
            return CR;
    }
}

class EncounterCreaturesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matching: [],
            notMatching: [],
            sortFn: 'alpha'
        }

        this.creatureSummary = this.props.creatureSummary;
    }

    render() {
        return (
            <div id={"creature-list-wrapper"}>
                <div id={"creature-list-search-module"} >
                    <input type="text" id="creatureSearch" onChange={() => this.applyFilters()} placeholder="Search..." /><br />

                    <div id={"creature-filters"}>

                        <div id={"creature-filters-type"}>
                            {/*<label htmlFor="creatureTypeFilter">Filter by type</label>*/}
                            <select name="creatureTypes" id="creatureTypeFilter" onChange={() => this.applyFilters()}>
                                <option disabled={"yes"} selected={"yes"} value={"all"}>Creature Type</option>
                                <option value="all">All</option>
                                <option value="aberration">Aberration</option>
                                <option value="beast">Beast</option>
                                <option value="celestial">Celestial</option>
                                <option value="construct">Construct</option>
                                <option value="dragon">Dragon</option>
                                <option value="elemental">Elemental</option>
                                <option value="fey">Fey</option>
                                <option value="giant">Giant</option>
                                <option value="humanoid">Humanoid</option>
                                <option value="monstrosity">Monstrosity</option>
                                <option value="ooze">Ooze</option>
                                <option value="plant">Plant</option>
                                <option value="undead">Undead</option>
                            </select>
                            <select name="creatureSizes" id="creatureSizeFilter" onChange={() => this.applyFilters()}>
                                <option disabled={"yes"} selected={"yes"} value={"all"}>Creature Size</option>
                                <option value="all">All</option>
                                <option value="tiny">Tiny</option>
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                                <option value="huge">Huge</option>
                                <option value="gargantuan">Gargantuan</option>
                            </select>
                        </div>

                        <div id={"creature-filters-CR"}>
                            <input type="number" id="minCR" onChange={() => this.applyFilters()} defaultValue={"0"} min={"0"} max={"30"} /><br />

                            <div>&nbsp;to&nbsp;</div>
                            <input type="number" id="maxCR" onChange={() => this.applyFilters()} defaultValue={"30"} min={"0"} max={"30"} /><br />
                        </div>
                    </div>


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
        this.applyFilters();
    }

    matchesSearch(searchTerm, item) {
        if (item.name.toLowerCase().includes(searchTerm)) {
            return true
        } else {
            return false
        }
    }

    matchesFilterType(type, item, filterTypeIsAll) {
        if (filterTypeIsAll) {
            return true
        } else if (item.type.toLowerCase() === type) {
            return true
        } else {
            return false
        }
    }

    matchesFilterSize(size, item, filterTypeIsAll) {
        if (filterTypeIsAll) {
            return true
        } else if (item.size.toLowerCase() === size) {
            return true
        } else {
            return false
        }
    }

    matchesCRRange(minCR, maxCR, item) {
        if (minCR === '') {
            minCR = 0
        }
        if (maxCR === '') {
            maxCR = 200
        }
        console.log(minCR + " " + maxCR)
        if (parseCR(item.challenge_rating) >= minCR && parseCR(item.challenge_rating) <= maxCR) {
            return true
        } else {
            return false
        }
    }

    applyFilters() {
        document.getElementById('creature-list').scrollTop = 0;
        let matchingList = []
        let notMatchingList = []
        let prevAlpha = ''

        let searchTerm = document.getElementById('creatureSearch').value
        let type = document.getElementById('creatureTypeFilter').value
        let size = document.getElementById('creatureSizeFilter').value
        let minCR = document.getElementById('minCR').value
        let maxCR = document.getElementById('maxCR').value
        let typeFilterIsAll = type === 'all'
        let sizeFilterIsAll = size === 'all'

        this.creatureSummary.forEach(item=>{

            let matchesSearch = this.matchesSearch(searchTerm, item)
            let matchesType = this.matchesFilterType(type, item, typeFilterIsAll)
            let matchesCR = this.matchesCRRange(minCR, maxCR, item)
            let matchesSize = this.matchesFilterSize(size, item, sizeFilterIsAll)

            if (matchesSearch && matchesType && matchesCR && matchesSize) {
                if (item.name.charAt(0) !== prevAlpha) { // add the alphabetical sort spacers if this creature starts with a new letter
                    console.log("char: " + item.name.charAt(0))
                    prevAlpha = item.name.charAt(0)
                    matchingList.push( <CreatureSpacer text={prevAlpha} /> )
                }
                matchingList.push( <Creature key={item.name} name={item.name} size={item.size} type={item.type} hit_points={item.hit_points} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature}/>)
            } else {
                notMatchingList.push( <Creature key={item.name} name={item.name} size={item.size} type={item.type} hit_points={item.hit_points} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature}/>)
            }

        })
        this.setState({matching: matchingList, notMatching: notMatchingList})
    }
}

class CreatureSpacer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className={"creature-spacer"}>
                <span>{this.props.text}</span>
            </div>
        )
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
                totalCR += parseCR(value.challenge_rating);
            }
        }
        return (
            <div id="encounter-wrapper">
                <EncounterCreaturesList addCreature={this.addCreature} creatureSummary={this.props.creatureSummary} />

                <div id="encounter-list">
                    <h1>
                        Add Creatures to
                        <br/>
                        <div>
                            <input type="text" id="encounterName" defaultValue="Encounter"/>
                        </div>
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
                    <span>CR: {displayCR(this.state.challenge_rating)}</span>
                    <span>HP: {this.state.hit_points}</span>
                </div>
            </div>
        );
    }

}

class AddedCreature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id : props.id,
            name : props.name,
            displayName : props.name,
            index : props.index,
            size : props.size,
            type : props.type,
            hit_points : props.hit_points,
            challenge_rating : props.challenge_rating,

            // isEditing: false,
            isEditingName: false
        }
    }

    remove = () => {
        this.props.removeCreature(this.state.id);
    }

    moveUp = () => {
        this.props.moveCreatureUp(this.state.id);
    }

    moveDown = () => {
        this.props.moveCreatureDown(this.state.id);
    }

    render() {
        let creatureName
        if (this.state.isEditingName) {
            creatureName = <CreatureInput type={"text"} size={"17"} value={this.state.displayName} updateFunction={this.updateDisplayName} autoFocus={"yes"} />
        } else {
            creatureName = <span>{this.state.displayName} <i className={"eva eva-edit-2-outline edit-button"} onClick={this.editName}/></span>
        }

        return (
            <div className={"added-creature"}>
                <span>
                    <div className={"bubble"}><i className={getCreatureIcon(this.state.type)} /></div>
                    <div className={"creature-name"}>
                        <h4 className={"creature-name-field"}>
                            {creatureName}
                        </h4>
                        <b>CR {displayCR(this.state.challenge_rating)}</b> - <i>{this.state.size} {this.state.type}</i>
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

    editName = () => {
        this.setState({isEditingName: true})
    }

    updateDisplayName = (newDisplayName) => {
        this.setState({displayName: newDisplayName, isEditingName: false})
        console.log("updated displayName")
    }
}

class CreatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: this.props.value
        }
    }

    updateValue = () => {
        this.props.updateFunction(this.state.input)
    };

    updateInput = (ev) => {
        this.setState({input: ev.target.value})
    }

    handleKeyPress = (ev) => {
        if (ev.key === 'Enter') {
            this.updateValue()
        }
    }

    render() {
        return (
            <input type={this.props.type} defaultValue={this.props.value} size={this.props.size} onChange={this.updateInput} autoFocus={this.props.autoFocus} onBlur={this.updateValue} onKeyDown={this.handleKeyPress} />
        )
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

function Home (props) {
    const [data, setData] = useState([])

    const fetchData = async () => {
        const result = await fetch("/test_table/")
        const jsonData = await result.json()

        setData(jsonData)
    }

    useEffect(() => {
        fetchData()
    }, [])

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

            <MainButtons/>

            <Fragment>
                {data.map(entry => (
                    <div>
                        <b>{entry.name}</b>: {entry.description}
                    </div>
                ))}
            </Fragment>
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
