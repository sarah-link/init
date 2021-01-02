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
            pinned: [],
            //TODO: hardcoded
            idOfPinnedCreatures: ['c265d404-3673-45d8-ab7d-66c2169c1136'],
            sortFn: 'alpha'
        }

        this.creatureList = this.props.creatureList
    }

    render() {
        return (
            <div id={"creature-list-wrapper"}>
                <div id={"creature-list-search-module"} >
                    <input type="text" id="creatureSearch" onChange={() => this.applyFilters()} placeholder="Search..." /><br />
                    <CreatureFilters applyFilters={() => this.applyFilters()} sortFn={this.state.sortFn} updateSortFn={this.updateSortFn}/>

                </div>
                <div id={"creature-list"}>
                    <div id={"pinned-creature-list"}>
                        {this.state.pinned}
                    </div>
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
            this.sortCreatures()
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
        } else if (item.type === null) {
            return false
        } else if (item.type.toLowerCase() === type) {
            return true
        } else {
            return false
        }
    }

    matchesFilterSize(size, item, filterTypeIsAll) {
        if (filterTypeIsAll) {
            return true
        } else if (item.size === null) {
            return false
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
        } //add creature if CR is null and not filtering by CR
        else if (item.challenge_rating === null && (minCR == 0 && maxCR >= 30)) {
            return true
        }else {
            console.log("sorting out " + item.name)
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
            this.applyFilters()
        })
    }

    applyFilters() {
        document.getElementById('creature-list').scrollTop = 0;
        let matchingList = []
        let notMatchingList = []
        let pinnedList = []
        let prevSpacer = ''

        let searchTerm = document.getElementById('creatureSearch').value
        let type = document.getElementById('creatureTypeFilter').value
        let size = document.getElementById('creatureSizeFilter').value
        let minCR = document.getElementById('minCR').value
        let maxCR = document.getElementById('maxCR').value
        let typeFilterIsAll = type === 'all'
        let sizeFilterIsAll = size === 'all'

        // TODO: change this to a cute pin icon
        pinnedList.push( <CreatureSpacer text={"Pinned " } key={"spacer-pinned"} /> )

        this.creatureList.forEach(item=>{
            let matchesSearch = this.matchesSearch(searchTerm, item)
            let matchesType = this.matchesFilterType(type, item, typeFilterIsAll)
            let matchesCR = this.matchesCRRange(minCR, maxCR, item)
            let matchesSize = this.matchesFilterSize(size, item, sizeFilterIsAll)


            if (matchesSearch && matchesType && matchesCR && matchesSize) {
                if (this.state.idOfPinnedCreatures.indexOf(item.id) != -1) {
                    pinnedList.push( <Creature key={item.id} name={item.name} size={item.size} type={item.type} hit_points={item.hit_point_max} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature} />)

                }
                else if (this.state.sortFn === 'alpha') {
                    if (item.name.charAt(0) !== prevSpacer) { // add the alphabetical sort spacers if this creature starts with a new letter
                        prevSpacer = item.name.charAt(0)
                        matchingList.push( <CreatureSpacer text={prevSpacer} /*key={"spacer-" + prevSpacer}*/ /> )
                    }
                }
                else {
                    if (parseCR(item.challenge_rating) !== prevSpacer) { // add the alphabetical sort spacers if this creature starts with a new letter
                        prevSpacer = parseCR(item.challenge_rating)
                        matchingList.push( <CreatureSpacer text={"CR " + displayCR(item.challenge_rating)} /*key={"spacer-" + prevSpacer}*/ /> )
                    }
                }
                matchingList.push( <Creature key={item.id} name={item.name} size={item.size} type={item.type} hit_points={item.hit_point_max} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature} />)
            } else {
                notMatchingList.push( <Creature key={item.id} name={item.name} size={item.size} type={item.type} hit_points={item.hit_point_max} challenge_rating={item.challenge_rating} addCreature={this.props.addCreature} />)
            }

        })
        this.setState({matching: matchingList, notMatching: notMatchingList, pinned: pinnedList})
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