import React from "react";
import {getCreatureIcon, parseCR, displayCR} from '../Utilities'
import Creature from '../Creature'
import CreatureFilters from "./CreatureFilters";

class EncounterCreaturesList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matching: [],
            notMatching: [],
            sortFn: 'alpha'
        }

        this.creatureList = this.props.creatureList
    }

    render() {
    console.log(this.creatureList)
        return (
            <div id={"creature-list-wrapper"}>
                <div id={"creature-list-search-module"} >
                    <input type="text" id="creatureSearch" onChange={() => this.applyFilters()} placeholder="Search..." /><br />
                    <CreatureFilters applyFilters={() => this.applyFilters()} sortFn={this.state.sortFn} updateSortFn={this.updateSortFn}/>

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

    componentDidUpdate(prevProps) {
        // re compute list when creatureList is populated
        if (this.props.creatureList !== prevProps.creatureList) {
            this.creatureList = this.props.creatureList
            this.sortCreatures(this.state.sortFn)
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
        } else if (item.size === size) {
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
        if (parseCR(item.challenge_rating) >= minCR && parseCR(item.challenge_rating) <= maxCR) {
            return true
        } else {
            return false
        }
    }

    sortCreatures() {
        if (this.state.sortFn === 'alpha') {
            this.creatureList.sort((a, b) => a.name.localeCompare(b.name))
        } else if (this.state.sortFn === 'cr') {
                this.creatureList.sort(function(a, b) {
                    if (parseCR(a.challenge_rating) < parseCR(b.challenge_rating)) {
                        return -1
                    } else {
                        return 1
                    }
                })
        }
    }

    updateSortFn = (newSortFn) => {
        this.setState({sortFn: newSortFn}, function () {
            this.sortCreatures()
            this.applyFilters()})
    }

    applyFilters() {
        document.getElementById('creature-list').scrollTop = 0;
        let matchingList = []
        let notMatchingList = []
        let prevSpacer = ''

        let searchTerm = document.getElementById('creatureSearch').value
        let type = document.getElementById('creatureTypeFilter').value
        let size = document.getElementById('creatureSizeFilter').value
        let minCR = document.getElementById('minCR').value
        let maxCR = document.getElementById('maxCR').value
        let typeFilterIsAll = type === 'all'
        let sizeFilterIsAll = size === 'all'

        this.creatureList.forEach(item=>{

            let matchesSearch = this.matchesSearch(searchTerm, item)
            let matchesType = this.matchesFilterType(type, item, typeFilterIsAll)
            let matchesCR = this.matchesCRRange(minCR, maxCR, item)
            let matchesSize = this.matchesFilterSize(size, item, sizeFilterIsAll)

            if (matchesSearch && matchesType && matchesCR && matchesSize) {
                if (this.state.sortFn === 'alpha') {
                    if (item.name.charAt(0) !== prevSpacer) { // add the alphabetical sort spacers if this creature starts with a new letter
                        prevSpacer = item.name.charAt(0)
                        matchingList.push( <CreatureSpacer text={prevSpacer} /*key={"spacer-" + prevSpacer}*/ /> )
                    }
                } else {
                    if (parseCR(item.challenge_rating) !== prevSpacer) { // add the alphabetical sort spacers if this creature starts with a new letter
                        prevSpacer = parseCR(item.challenge_rating)
                        matchingList.push( <CreatureSpacer text={"CR " + displayCR(item.challenge_rating)} key={"spacer-" + prevSpacer} /> )
                    }
                }
                matchingList.push( <Creature key={item.id} name={item.name} size={item.size} type={item.type} hit_points={item.hit_point_max} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature} />)
            } else {
                notMatchingList.push( <Creature key={item.id} name={item.name} size={item.size} type={item.type} hit_points={item.hit_point_max} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature} />)
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