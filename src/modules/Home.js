import React, {Fragment, useEffect, useState} from "react";
import MainButtons from "./MainButtons";

function Home (props) {
    return (
        <div className="App-body" id="home-body">
            <div className="App-header">
                <h1>
                    <b>Roll Initiative!</b>
                </h1>

                <p>
                    Manage initiative without a virtual tabletop
                </p>
            </div>

            <MainButtons/>
        </div>
    )


}

export default Home;