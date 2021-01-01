import React, {Fragment} from "react";
import InitButton from "./InitButton";

class MainButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: true}
    }

    render() {
        return (
            <div id={"menu-button-wrapper"}>
                <div className={"menu-buttons"}>
                    <InitButton text={"Create Encounter"} className={"main-button"} url={"/builder"} iconClassName={"eva eva-brush-outline"}/>
                    <InitButton text={"Saved Encounters"} className={"main-button"} url={"/manager"} iconClassName={"eva eva-bookmark-outline"}/>
                </div>

                <div className={"menu-buttons"}>
                    <InitButton text={"Manage Library"} className={"main-button"} url={"/library"} iconClassName={"eva eva-book-open-outline"}/>
                    <InitButton text={"Join Encounter"} className={"main-button"} url={"/join"} iconClassName={"eva eva-play-circle-outline"}/>
                </div>
            </div>
        )
    }
}

export default MainButtons