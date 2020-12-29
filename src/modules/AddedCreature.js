import React from "react";
import {getCreatureIcon, displayCR, displaySize} from "./Utilities";

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
                        <b>CR {displayCR(this.state.challenge_rating)}</b> - <i>{displaySize(this.state.size)} {this.state.type}</i>
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

export default AddedCreature