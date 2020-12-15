import React from "react";
import Button from "./Button";

class MainButtons extends React.Component {
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

export default MainButtons