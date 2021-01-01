import React from "react";

import {SideNavClickable} from './SideNav';
import InitButton from "./InitButton";

function NavBar() {
    return(
        <header className={"app-navbar"} >
            <div>
                <SideNavClickable />
                <InitButton text={"HOME"} className={"navbar-button"} url={"/"} />
            </div>
            <div>
                <InitButton text={"Log\u00a0In"} className={"navbar-button"} url={"login"} />
                <InitButton text={"Sign\u00a0Up"} className={"navbar-button"} url={"signup"} />
            </div>

        </header>
    )
}

export default NavBar;