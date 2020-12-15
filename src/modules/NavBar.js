import React from "react";

import {SideNavClickable} from './SideNav';
import Button from "./Button";

function NavBar() {
    return(
        <header className={"app-navbar"} >
            <div>
                <SideNavClickable />
                <Button text={"HOME"} className={"navbar-button"} url={"/"} />
            </div>
            <div>
                <Button text={"Log\u00a0In"} className={"navbar-button"} url={"login"} />
                <Button text={"Sign\u00a0Up"} className={"navbar-button"} url={"signup"} />
            </div>

        </header>
    )
}

export default NavBar;