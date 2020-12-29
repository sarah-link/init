import React, {Fragment, useEffect, useState} from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Encounter from "./Encounter";

function EncounterBuilder (props) {
    const [creatureSummary, setCreatureSummary] = useState([])

    const fetchData = async () => {
        const result = await fetch("/creatureList/")
        const jsonData = await result.json()

        setCreatureSummary(jsonData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return(
        <Router>
            <div className="App-body" id="encounter-body">
                <Encounter creatureSummary={creatureSummary} />
            </div>
        </Router>
    )
}

export default EncounterBuilder