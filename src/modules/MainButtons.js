import React, {Fragment} from "react";
import Button from "./Button";

class MainButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: true}
    }

    render() {
        return (
            <div id={"menu-button-wrapper"}>
                <div className={"menu-buttons"}>
                    <Button text={"Create Encounter"} className={"main-button"} url={"/builder"} iconClassName={"eva eva-brush-outline"}/>
                    <Button text={"Saved Encounters"} className={"main-button"} url={"/manager"} iconClassName={"eva eva-bookmark-outline"}/>
                </div>

                <div className={"menu-buttons"}>
                    <Button text={"Manage Library"} className={"main-button"} url={"/library"} iconClassName={"eva eva-book-open-outline"}/>
                    <Button text={"Join Encounter"} className={"main-button"} url={"/join"} iconClassName={"eva eva-play-circle-outline"}/>
                </div>
            </div>
        )
    }
}

export default MainButtons