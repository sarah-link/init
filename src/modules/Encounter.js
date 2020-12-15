import React from "react";
import EncounterCreaturesList from "./EncounterCreaturesList";
import {getCreatureIcon, parseCR, displayCR} from "./Utilities";
import AddedCreature from "./AddedCreature";

class Encounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creatures: new Map(),
            id: 0
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
                <EncounterCreaturesList addCreature={this.addCreature} creatureSummary={this.props.creatureSummary}/>

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

    addCreature = (name, size, type, hit_points, challenge_rating) => {
        let toAddCreature = {
                name: name,
                size: size,
                type: type,
                hit_points: hit_points,
                challenge_rating: challenge_rating
            }
        this.setState({creatures: this.state.creatures.set(this.state.id, toAddCreature)})
        this.setState({id: this.state.id+1});
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

export default Encounter
