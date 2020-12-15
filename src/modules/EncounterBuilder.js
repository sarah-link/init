import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import Encounter from "./Encounter";

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

export default EncounterBuilder