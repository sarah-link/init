import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

function CreatureFilters(props) {
    const [rSelected, setRSelected] = useState(null);

    const buttonClick = (val) => {
        props.updateSortFn(val)
        setRSelected(val)
    }

    return (
        <div id={"creature-filters"}>

            <div id={"creature-filters-type"}>
                {/*<label htmlFor="creatureTypeFilter">Filter by type</label>*/}
                <select name="creatureTypes" id="creatureTypeFilter" onChange={props.applyFilters}>
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
                <select name="creatureSizes" id="creatureSizeFilter" onChange={props.applyFilters}>
                    <option disabled={"yes"} selected={"yes"} value={"all"}>Creature Size</option>
                    <option value="all">All</option>
                    <option value="T">Tiny</option>
                    <option value="S">Small</option>
                    <option value="M">Medium</option>
                    <option value="L">Large</option>
                    <option value="H">Huge</option>
                    <option value="G">Gargantuan</option>
                </select>
            </div>

            <div id={"creature-filters-CR"}>
                <input type="number" id="minCR" onChange={props.applyFilters} defaultValue={"0"} min={"0"} max={"30"} /><br />

                <div>&nbsp;to&nbsp;</div>
                <input type="number" id="maxCR" onChange={props.applyFilters} defaultValue={"30"} min={"0"} max={"30"} /><br />
            </div>
            <div>
                <br /><br />
                <label>sort by</label>
                <ButtonGroup>
                    <Button color="primary" onClick={() =>buttonClick('alpha')} active={rSelected === "alpha"}>Name</Button>
                    <Button color="primary" onClick={() =>buttonClick('cr')} active={rSelected === "cr"}>CR</Button>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default CreatureFilters