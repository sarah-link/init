import React from "react";
import {getCreatureIcon, parseCR, displayCR} from './Utilities'
import Creature from './Creature'

class EncounterCreaturesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matching: [],
            notMatching: [],
            sortFn: 'alpha'
        }
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
                                <option value="fiend">Fiend</option>
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

    componentDidUpdate(prevProps) {
        if (this.props.creatureSummary !== prevProps.creatureSummary) {
            this.applyFilters()
        }

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

        this.props.creatureSummary.forEach(item=>{

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
                matchingList.push( <Creature key={item.name} name={item.name} size={item.size} type={item.type} hit_points={item.hit_points} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature} />)
            } else {
                notMatchingList.push( <Creature key={item.name} name={item.name} size={item.size} type={item.type} hit_points={item.hit_points} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature} />)
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

export default EncounterCreaturesList