import React from "react";
import {displayCR, displaySize} from "./Utilities";

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
        this.props.addCreature(this.state.name, this.state.size, this.state.type, this.state.hit_points, this.state.challenge_rating);
    }

    render() {
        return (
            <div className={"creature"} onClick={this.click}>
                <div className={"creature-name"}>
                    <h4>{this.state.name}</h4>
                    <i>{displaySize(this.state.size)} {this.state.type}</i>
                </div>

                <div className={"creature-info"}>
                    <span>CR: {displayCR(this.state.challenge_rating)}</span>
                    <span>HP: {this.state.hit_points}</span>
                </div>
            </div>
        );
    }

}

export default Creature